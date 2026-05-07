import { useContext } from "react";

import { AuthContext } from "../context/Authcontext";

export const useAuth = () => {
    return useContext(AuthContext);
};