import { createContext , useState , useEffect } from "react";
import { getMeApi } from "../api/auth.api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user , setuser] = useState(null);
    const [loading , setLoading] = useState(true);

    const login = (userData , token ) => {
        localStorage.setItem('token' , token);
        setuser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setuser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        getMeApi()
            .then((res) => {
            setuser(res.data);
            })
            .catch(() => {
            localStorage.removeItem("token");
            setuser(null);
            })
            .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);


    return (
        <AuthContext.Provider
            value = {{
                user,
                login,
                loading,
                logout
            }}>  
            {children}
            </AuthContext.Provider>
    );
};