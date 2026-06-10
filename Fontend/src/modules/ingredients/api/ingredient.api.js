import api from "../../../shared/api/axios";

export const getIngredientsApi = () => api.get("/ingredients");
export const createIngredientApi = (data) => api.post("/ingredients", data);
export const updateIngredientApi = (id, data) => api.put(`/ingredients/${id}`, data);
export const deleteIngredientApi = (id) => api.delete(`/ingredients/${id}`);
