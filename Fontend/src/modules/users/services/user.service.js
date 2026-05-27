import { getUsersApi, createUserApi, toggleUserApi } from "../api/user.api";

export const getUsers = async () => {
  const res = await getUsersApi();

  return res.data;
};

export const createUser = async (data) => {
  const res = await createUserApi(data);

  return res.data;
};

export const toggleUser = async (id) => {
  const res = await toggleUserApi(id);

  return res.data;
};
