// order.service.js
const db = require("../../config/database");
const optionRepo = require("../productoption/option.repo");
const orderRepo = require("./order.repo");

const getOptionsList = async () => {
  const conn = await db.getConnection();
  try {
    return await optionRepo.getAllOptions(conn);
  } finally {
    conn.release();
  }
};

const createOrder = async (data) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { items, payment_method, user_id } = data;
    let total = 0;
    const cachedRecipes = {};

    for (const item of items) {
      if (item.options && item.options.length > 0) {
        for (const opt of item.options) {
          const optIngredients = await orderRepo.getOptionIngredients(conn, opt.option_id);

          for (const optIng of optIngredients) {
            const totalOptRequired = optIng.Quantity_used * item.qty;
            const optIngRows = await orderRepo.checkIngredientStockForUpdate(conn, optIng.Ingredient_id);

            if (optIngRows.length === 0) {
              throw new Error(`Topping Ingredient ${optIng.Ingredient_id} not found`);
            }
            if (optIngRows[0].Stock_qty < totalOptRequired) {
              throw new Error(`Topping ingredient stock not enough for option ${opt.option_id}`);
            }
          }
        }
      }
      const recipe = await orderRepo.getProductRecipe(conn, item.product_id);
      cachedRecipes[item.product_id] = recipe; 

      if (recipe.length > 0) {
        for (const ing of recipe) {
          const totalRequired = ing.Quantity_used * item.qty;
          const ingRows = await orderRepo.checkIngredientStockForUpdate(conn, ing.Ingredient_id);

          if (ingRows.length === 0) {
            throw new Error(`Ingredient ${ing.Ingredient_id} not found`);
          }
          if (ingRows[0].Stock_qty < totalRequired) {
            throw new Error(`Ingredient stock not enough for product ${item.product_id}`);
          }
        }
      } else {
        const rows = await orderRepo.checkStockForUpdate(conn, item.product_id);

        if (rows.length === 0) {
          throw new Error(`Product ${item.product_id} has no stock`);
        }
        if (rows[0].Qty < item.qty) {
          throw new Error(`Stock not enough for product ${item.product_id}`);
        }
      }
    }

    const billNo = `BILL-${Date.now()}`;
    const saleId = await orderRepo.insertSale(conn, billNo, user_id);

    for (const item of items) {
      const price = await orderRepo.getProductPrice(conn, item.product_id);
      const totalPrice = price * item.qty;
      total += totalPrice;

      let productPieceCost = 0;
      const recipe = cachedRecipes[item.product_id] || [];

      if (recipe.length === 0) {
        const [productDetail] = await conn.query("SELECT cost_price FROM product WHERE product_id = ?", [item.product_id]);
        if (productDetail && productDetail.length > 0) {
          productPieceCost = productDetail[0].cost_price !== undefined ? productDetail[0].cost_price : (productDetail[0].Cost_price || 0);
        }
      }

      const saleItemId = await orderRepo.insertSaleItem(conn, saleId, item, price, totalPrice, productPieceCost);

      if (item.options && item.options.length > 0) {
        for (const opt of item.options) {
          await orderRepo.insertSaleItemOption(conn, saleItemId, opt);

          total += opt.price * item.qty;

          const optIngredients = await orderRepo.getOptionIngredients(conn, opt.option_id);

          for (const optIng of optIngredients) {
            const totalOptUsed = optIng.Quantity_used * item.qty;

            const optIngRows = await orderRepo.checkIngredientStockForUpdate(conn, optIng.Ingredient_id);
            const currentCostAtSale = optIngRows.length > 0 ? (optIngRows[0].Cost_per_unit || optIngRows[0].cost_per_unit || 0) : 0;

            await orderRepo.updateIngredientDecrease(conn, optIng.Ingredient_id, totalOptUsed);

            await orderRepo.insertIngredientStockLog(conn, optIng.Ingredient_id, "sale", saleId, -totalOptUsed, currentCostAtSale);
          }
        }
      }
      if (recipe.length > 0) {
        for (const ing of recipe) {
          const totalIngredientUsed = ing.Quantity_used * item.qty;

          const ingRows = await orderRepo.checkIngredientStockForUpdate(conn, ing.Ingredient_id);
          const currentCostAtSale = ingRows.length > 0 ? (ingRows[0].Cost_per_unit || ingRows[0].cost_per_unit || 0) : 0;

          await orderRepo.updateIngredientDecrease(conn, ing.Ingredient_id, totalIngredientUsed);

          await orderRepo.insertIngredientStockLog(conn, ing.Ingredient_id, "sale", saleId, -totalIngredientUsed, currentCostAtSale);
        }
      } else {
        const isUpdated = await orderRepo.updateStockDecrease(conn, item.product_id, item.qty);
        if (!isUpdated) {
          throw new Error(`Failed to update stock for product ${item.product_id}`);
        }
        await orderRepo.insertStockLog(conn, item.product_id, "sale", saleId, -item.qty);
      }
    }

    await orderRepo.updateSaleTotal(conn, saleId, total);
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
    if (saleRows[0].Status === "cancelled") throw new Error("Order already cancelled");

    const items = await orderRepo.getSaleItems(conn, saleId);

    for (const item of items) {

      const selectedOptions = await orderRepo.getSaleItemOptions(conn, item.Sale_item_id);

      if (selectedOptions && selectedOptions.length > 0) {
        for (const opt of selectedOptions) {

          const optIngredients = await orderRepo.getOptionIngredients(conn, opt.Option_id);

          for (const optIng of optIngredients) {
            const totalOptReturned = optIng.Quantity_used * item.Qty;
            await orderRepo.updateIngredientIncrease(conn, optIng.Ingredient_id, totalOptReturned);
            await orderRepo.insertIngredientStockLog(conn, optIng.Ingredient_id, "cancel", saleId, totalOptReturned);
          }
        }
      }

      const recipe = await orderRepo.getProductRecipe(conn, item.Product_id);

      if (recipe.length > 0) {
        for (const ing of recipe) {
          const totalIngredientReturned = ing.Quantity_used * item.Qty;
          await orderRepo.updateIngredientIncrease(conn, ing.Ingredient_id, totalIngredientReturned);
          await orderRepo.insertIngredientStockLog(conn, ing.Ingredient_id, "cancel", saleId, totalIngredientReturned);
        }
      } else {
        await orderRepo.updateStockIncrease(conn, item.Product_id, item.Qty);
        await orderRepo.insertStockLog(conn, item.Product_id, "cancel", saleId, item.Qty);
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
  const id = typeof saleId === "object" ? saleId.Sale_id || saleId.sale_id : saleId;

  if (!id) {
    throw new Error("Sale ID is required for getting order details");
  }

  const result = await orderRepo.getOrderDetail(id);
  if (!result) return null;

  const rawItems = result.items || [];
  
  const calculatedItems = rawItems.map((item) => {
    const optionsTotalCost = item.options && Array.isArray(item.options)
      ? item.options.reduce((sum, opt) => sum + Number(opt.Price || opt.price || 0), 0)
      : 0;

    const qty = Number(item.Qty || item.qty || 1);
    const baseUnitPrice = Number(item.Unit_price || item.unit_price || 0);

    const newUnitPrice = baseUnitPrice + optionsTotalCost;
    const newTotalPrice = newUnitPrice * qty;

    return {
      ...item,
      Unit_price: newUnitPrice,
      unit_price: newUnitPrice,
      Total_price: newTotalPrice,
      total_price: newTotalPrice
    };
  });

  return {
    sale: result.sale,
    items: calculatedItems,
    payment: result.payment
  };
};

module.exports = {
  createOrder,
  cancelOrder,
  getOrders,
  getOrderById,
  getOrderDetail,
  getOptionsList
};