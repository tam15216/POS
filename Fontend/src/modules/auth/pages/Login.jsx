import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { loginApi } from '../api/auth.api';

import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const res = await loginApi(form);

            console.log(res.data);

            const token = res.data.token;
            const user = res.data.user;

            login(user , token);    
            navigate('/dashboard');
        } catch (err){
            console.log(err);
            alert('Login failed');
        }
     };

     return (
        // <div>
        //     <h1>Login</h1>

        //     <form onSubmit={handleSubmit}>
        //         <input
        //             name="username"
        //             placeholder="Username"
        //             value={form.username}
        //             onChange={handleChange}
        //         />
        //         <br />
        //         <input
        //             type="password"
        //             name="password"
        //             placeholder="Password"
        //             value={form.password}
        //             onChange={handleChange}
        //         />
        //          <br />
        //         <button type="submit">Login</button>
        //     </form>
        // </div>

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
                        </div>

                        <button
                            type="submit"
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
                            Sign In
                        </button>
                    </form>
            </div>
        </div>
     );
}