import api from "../../../shared/api/axios";

export const getIngredientsApi = () => api.get("/ingredients");
export const createIngredientApi = (data) => api.post("/ingredients", data);
export const getStockHistoryApi = () => api.get('/ingredients/history');
export const updateIngredientApi = (id, data) => api.put(`/ingredients/${id}`, data);
export const toggleIngredientStatusApi = (id, data) => api.patch(`/ingredients/${id}/toggle`, data);
export const updateStockQuantityApi = (id, data) => api.patch(`/ingredients/${id}/stock`, data);
export const restockIngredientApi = (id, data) => api.put(`/ingredients/${id}/restock`, data);