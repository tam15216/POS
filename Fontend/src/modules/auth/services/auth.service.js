import { loginApi } from "../api/auth.api";


export const loginService = async (data) => {

    const res = await loginApi(data);

    const token = res.data.token;
    const user = res.data.user;

    return { user, token };
}

