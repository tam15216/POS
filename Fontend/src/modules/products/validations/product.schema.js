export const validateProduct = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (!data.price) {
    errors.price = "Price is required";
  }

  if (Number(data.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }
  
  if (!data.category_id) {
    errors.category_id = "Category is required";
  }

  return errors;
};
