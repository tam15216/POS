export const validateIngredientStock = (transaction) => {
    if (!transaction.action_type) {
        return "กรุณาเลือกประเภทการปรับปรุงสต๊อก";
    }

    if (!transaction.quantity || Number(transaction.quantity) <= 0 || isNaN(Number(transaction.quantity))) {
        return "กรุณากรอกจำนวนวัตถุดิบให้ถูกต้องและมากกว่า 0";
    }

    return ""; 
};