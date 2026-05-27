export const validateCategoryForm = (form) => {

    if (!form.category_name) {
        return "กรุณากรอกชื่อหมวดหมู่";
    }

    return "";
};
