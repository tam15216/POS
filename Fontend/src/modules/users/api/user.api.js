import api from "../../../shared/api/axios";

export const getUsersApi = () => {
  return api.get("/users");
};

export const createUserApi = (data) => {
  return api.post("/users", data);
};

export const toggleUserApi = (id) => {
  return api.patch(`/users/${id}/toggle`);
};
