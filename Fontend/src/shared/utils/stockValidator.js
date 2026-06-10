export const checkInsufficientStock = (cartItems, latestStocks) => {
  if (!Array.isArray(cartItems) || !Array.isArray(latestStocks)) {
    return null;
  }

  for (const item of cartItems) {
    if (item.Product_type === 'made_to_order') {
      continue;
    }

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