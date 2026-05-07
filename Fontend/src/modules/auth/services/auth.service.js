import { loginApi } from "../api/auth.api";
import { registerApi } from "../api/auth.api";

export const loginService = async (data) => {

    const res = await loginApi(data);

    const token = res.data.token;
    const user = res.data.user;

    return { user, token };
}

export const registerService = async (data) => {

    const res = await registerApi(data);

    return res.data;
};