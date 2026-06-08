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

            navigate('/pos');

        } catch (err){
            console.log(err);
            setError({ general: ["Login failed"] });
        } finally{
            setLoading(false);
        }
     };

     return (

            <div className="w-full max-w-sm p-8 bg-white border border-purple-100 shadow-lg rounded-2xl">
                
                    <h1 className="mb-8 text-3xl font-bold text-center text-purple-700">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                    
                        <div>
                            <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                            />
                             {
                                error.username &&
                                <p className="mt-1 text-sm text-red-500">
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
                            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                            />
                            {
                                error.password &&
                                <p className="mt-1 text-sm text-red-500">
                                    {error.password[0]}
                                </p>
                            }
                        </div>
                              {
                                    error.general &&
                                    <p className="text-sm text-center text-red-500">
                                        {error.general[0]}
                                    </p>
                                }
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600"
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </button>
                    </form>
            </div>
     );
}