/**
 * ฟังก์ชันสำหรับตรวจสอบว่าสินค้าในตะกร้ามีจำนวนเกินกว่าสต็อกล่าสุดที่มีอยู่หรือไม่
 * @param {Array} cartItems - รายการสินค้าในตะกร้า
 * @param {Array} latestStocks - ข้อมูลสต็อกล่าสุดจากเซิร์ฟเวอร์
 * @returns {Object|null} - คืนค่าออบเจกต์ข้อมูลสินค้าที่ไม่พอ หรือคืนค่า null หากสต็อกเพียงพอทั้งหมด
 */
export const checkInsufficientStock = (cartItems, latestStocks) => {
  if (!Array.isArray(cartItems) || !Array.isArray(latestStocks)) {
    return null;
  }

  for (const item of cartItems) {
    const stockInfo = latestStocks.find((s) => s.Product_id === item.Product_id);
    const availableQty = stockInfo?.Qty || 0;

    if (availableQty < item.qty) {
      return {
        ...item,
        availableQty,
      };
    }
  }

  return null;
};