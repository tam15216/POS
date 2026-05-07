import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { loginService } from '../services/auth.service';

import { useAuth } from '../hooks/useAuth';

import { loginSchema } from '../validations/auth.schema';

export default function LoginForm(){
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const [ form , setForm ] = useState({
        username: '',
        password: ''
     });

     const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
     }



     const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError({});

            const result = loginSchema.safeParse(form);
            if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;
                setError(fieldErrors);
                return;
            }

            const data = await loginService(result.data);

            login(data.user, data.token);

            navigate('/dashboard');

        } catch (err){
            console.log(err);
            setError({ general: ["Login failed"] });
        } finally{
            setLoading(false);
        }
     };

     return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
                
                    <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                    
                        <div>
                            <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-purple-200
                                bg-purple-50
                                text-gray-700
                                placeholder-gray-400
                                outline-none
                                focus:ring-2
                                focus:ring-purple-300
                                focus:border-purple-300
                                transition
                            "
                            />
                             {
                                error.username &&
                                <p className="text-red-500 text-sm mt-1">
                                    {error.username[0]}
                                </p>
                            }
                        </div>

                        <div>
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-purple-200
                                bg-purple-50
                                text-gray-700
                                placeholder-gray-400
                                outline-none
                                focus:ring-2
                                focus:ring-purple-300
                                focus:border-purple-300
                                transition
                            "
                            />
                            {
                                error.password &&
                                <p className="text-red-500 text-sm mt-1">
                                    {error.password[0]}
                                </p>
                            }
                        </div>
                              {
                                    error.general &&
                                    <p className="text-red-500 text-sm text-center">
                                        {error.general[0]}
                                    </p>
                                }
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            w-full
                            py-3
                            rounded-xl
                            bg-purple-500
                            hover:bg-purple-600
                            text-white
                            font-medium
                            transition
                            shadow-md
                            "
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </button>
                    </form>
            </div>
        </div>
     );
}