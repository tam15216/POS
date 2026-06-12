// order.service.js
const db = require("../../config/database");
const orderRepo = require("./order.repo");

const createOrder = async (data) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { items, payment_method, user_id } = data;
    let total = 0;

    // 1. ตรวจสอบสต๊อกสินค้าและวัตถุดิบ (พร้อมล็อกแถวข้อมูลเพื่อป้องกัน Race Condition)
    for (const item of items) {
      // เช็กสูตรการผลิตก่อนเพื่อจำแนกประเภทสินค้า
      const recipe = await orderRepo.getProductRecipe(conn, item.product_id);

      if (recipe.length > 0) {
        // ---> กรณีสินค้ากลุ่มน้ำชา: วนลูปตรวจสอบสต๊อกวัตถุดิบดิบย่อยในคลัง
        for (const ing of recipe) {
          const totalRequired = ing.Quantity_used * item.qty;

          const ingRows = await orderRepo.checkIngredientStockForUpdate(
            conn,
            ing.Ingredient_id,
          );

          if (ingRows.length === 0) {
            throw new Error(`Ingredient ${ing.Ingredient_id} not found`);
          }

          if (ingRows[0].Stock_qty < totalRequired) {
            throw new Error(
              `Ingredient stock not enough for product ${item.product_id}`,
            );
          }
        }
      } else {
        // ---> กรณีสินค้าสำเร็จรูปปกติ: ตรวจสอบสต๊อกสินค้าสำเร็จรูปตรงๆ
        const rows = await orderRepo.checkStockForUpdate(conn, item.product_id);

        if (rows.length === 0) {
          throw new Error(`Product ${item.product_id} has no stock`);
        }

        if (rows[0].Qty < item.qty) {
          throw new Error(`Stock not enough for product ${item.product_id}`);
        }
      }
    }

    // 2. สร้างโครงสร้างข้อมูลการขาย (Sale)
    const billNo = `BILL-${Date.now()}`;
    const saleId = await orderRepo.insertSale(conn, billNo, user_id);

    // 3. วนลูปบันทึกรายการสินค้าและทำหักยอดคลังสินค้าจริง
    for (const item of items) {
      const price = await orderRepo.getProductPrice(conn, item.product_id);
      const totalPrice = price * item.qty;
      total += totalPrice;

      // บันทึกข้อมูลลงตารางรายการสินค้าขาย (sale_item)
      await orderRepo.insertSaleItem(conn, saleId, item, price, totalPrice);

      // เช็กสูตรการผลิตซ้ำอีกครั้งเพื่อทำเรื่องหักสต๊อกให้ถูกตาราง
      const recipe = await orderRepo.getProductRecipe(conn, item.product_id);

      if (recipe.length > 0) {
        // กรณีสินค้าประเภทน้ำชา -> หักลดสต๊อกตารางวัตถุดิบย่อย (ingredient)
        for (const ing of recipe) {
          const totalIngredientUsed = ing.Quantity_used * item.qty;
          await orderRepo.updateIngredientDecrease(
            conn,
            ing.Ingredient_id,
            totalIngredientUsed,
          );

          // บันทึก Log ของฝั่งวัตถุดิบ (ตัวแปรจำนวนเป็นค่าติดลบเนื่องจากเป็นการขายออก)
          await orderRepo.insertIngredientStockLog(
            conn,
            ing.Ingredient_id,
            "sale",
            saleId,
            -totalIngredientUsed,
          );
        }
      } else {
        // กรณีสินค้าสำเร็จรูปปกติ -> หักลดสต๊อกตารางสต๊อกสินค้าสำเร็จรูป (stock)
        const isUpdated = await orderRepo.updateStockDecrease(
          conn,
          item.product_id,
          item.qty,
        );
        if (!isUpdated) {
          throw new Error(
            `Failed to update stock for product ${item.product_id}`,
          );
        }

        // บันทึก Log ของฝั่งสินค้าปกติ
        await orderRepo.insertStockLog(
          conn,
          item.product_id,
          "sale",
          saleId,
          -item.qty,
        );
      }
    }

    // 4. บันทึกยอดเงินรวมสุทธิเข้าบิลขาย
    await orderRepo.updateSaleTotal(conn, saleId, total);

    // 5. บันทึกข้อมูลประวัติการรับชำระเงิน (Payment)
    await orderRepo.insertPayment(conn, saleId, payment_method, total);

    await conn.commit();
    return { message: "Order success", saleId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const cancelOrder = async (saleId) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const saleRows = await orderRepo.checkSaleStatusForUpdate(conn, saleId);
    if (saleRows.length === 0) throw new Error("Order not found");
    if (saleRows[0].Status === "cancelled")
      throw new Error("Order already cancelled");

    const items = await orderRepo.getSaleItems(conn, saleId);

    for (const item of items) {
      // ตรวจสอบสูตรการผลิตจากตารางเชื่อมโยง
      const recipe = await orderRepo.getProductRecipe(conn, item.Product_id);

      if (recipe.length > 0) {
        // คืนสต๊อกวัตถุดิบตามสูตร
        for (const ing of recipe) {
          const totalIngredientReturned = ing.Quantity_used * item.Qty;
          await orderRepo.updateIngredientIncrease(
            conn,
            ing.Ingredient_id,
            totalIngredientReturned,
          );
          await orderRepo.insertIngredientStockLog(
            conn,
            ing.Ingredient_id,
            "cancel",
            saleId,
            totalIngredientReturned,
          );
        }
      } else {
        // คืนสต๊อกสินค้าต่อชิ้นสำเร็จรูปปกติ
        await orderRepo.updateStockIncrease(conn, item.Product_id, item.Qty);
        await orderRepo.insertStockLog(
          conn,
          item.Product_id,
          "cancel",
          saleId,
          item.Qty,
        );
      }
    }

    await orderRepo.updateSaleStatus(conn, saleId, "cancelled");

    await conn.commit();
    return { message: "Order cancelled" };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getOrders = async () => {
  return await orderRepo.getOrders();
};

const getOrderById = async (saleId) => {
  return await orderRepo.getOrderById(saleId);
};

const getOrderDetail = async (saleId) => {
  return await orderRepo.getOrderDetail(saleId);
};

module.exports = {
  createOrder,
  cancelOrder,
  getOrders,
  getOrderById,
  getOrderDetail,
};
