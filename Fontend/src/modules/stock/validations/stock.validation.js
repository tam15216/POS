export const validateStockForm = (form) => {

    if (!form.product_id) {
        return "กรุณาเลือกสินค้า";
    }

    if (!form.qty || Number(form.qty) <= 0) {
        return "กรุณากรอกจำนวนให้ถูกต้อง";
    }

    return "";
};