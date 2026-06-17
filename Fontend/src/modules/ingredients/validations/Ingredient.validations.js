export const validateIngredientStock = (transaction) => {
    if (!transaction.action_type) {
        return "กรุณาเลือกประเภทการปรับปรุงสต๊อก";
    }

    if (!transaction.quantity || Number(transaction.quantity) <= 0 || isNaN(Number(transaction.quantity))) {
        return "กรุณากรอกจำนวนวัตถุดิบให้ถูกต้องและมากกว่า 0";
    }

    return ""; 
};


export const validateIngredientRestock = (formData) => {
    const errors = {
        quantity_received: "",
        buy_price: "",
    };
    let isValid = true;

    // ตรวจสอบช่อง: จำนวนที่ซื้อมาเพิ่ม
    const qty = Number(formData.quantity_received);
    if (formData.quantity_received === "" || isNaN(qty) || qty <= 0) {
        errors.quantity_received = "กรุณากรอกจำนวนวัตถุดิบที่มากกว่า 0";
        isValid = false;
    }

    // ตรวจสอบช่อง: ราคารวมที่ซื้อมาครั้งนี้
    const price = Number(formData.buy_price);
    if (formData.buy_price === "" || isNaN(price) || price < 0) {
        errors.buy_price = "กรุณากรอกราคารวมที่ซื้อมา (ขั้นต่ำ 0 บาท)";
        isValid = false;
    }

    return {
        isValid,
        errors
    };
};