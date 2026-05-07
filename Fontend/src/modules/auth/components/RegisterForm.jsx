import { useState } from 'react';
import { useNavigate} from 'react-router-dom';



import { registerSchema } from '../validations/auth.schema';

import { registerService } from '../services/auth.service';


export default function RegisterForm() {
                const [form, setForm] = useState({
                    username: '',
                    full_name: '',
                    password: ''
                });
                const [loading, setLoading] = useState(false);
                const [error, setError] = useState({});
                const navigate = useNavigate();

                const handleChange = (e) => {

                    setForm({
                    ...form,
                    [e.target.name]: e.target.value
                    });
                };

                const handleSubmit = async (e) => {

                    e.preventDefault();
                    setError({});
                    const result = registerSchema.safeParse(form);
                    if (!result.success) {
                            setError(
                                result.error.flatten().fieldErrors
                            );

                            return;
                        }

                    try {
                        setLoading(true);
                        setError({});
                        await registerService(result.data);

                         navigate('/login');

                    } catch (err) {

                    console.error(err);
                    const message = err?.response?.data?.message || "Register failed";
                    setError({general: [message]});
                }finally {
                    setLoading(false);
                }
            };

                return (

                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-4">
                        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-purple-100">

                            <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
                            Register
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Username */}
                            <div>
                                <input
                                type="text"
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

                                {error.username && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error.username[0]}
                                </p>
                                )}
                            </div>

                            {/* Full Name */}
                            <div>
                                <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={form.full_name}
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

                                {error.full_name && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error.full_name[0]}
                                </p>
                                )}
                            </div>

                            {/* Password */}
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

                                {error.password && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error.password[0]}
                                </p>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                w-full
                                py-3
                                rounded-xl
                                bg-purple-500
                                hover:bg-purple-600
                                disabled:bg-purple-300
                                text-white
                                font-medium
                                transition
                                shadow-md
                                "
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>

                            </form>
                        </div>
                        </div>
                );
        }