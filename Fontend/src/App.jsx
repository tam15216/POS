import {
    BrowserRouter , 
    Routes,
    Route,
} from 'react-router-dom';

import Login from "./modules/auth/pages/Login";
import Register from './modules/auth/pages/Register';

import Dashboard from './modules/dashboard/pages/Dashboard';
import Products from './modules/products/pages/Products';

import PrivateRoute from './routes/PrivateRoute';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MianLayout';



export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
                <Route path ="/dashboard" element={ <PrivateRoute> <MainLayout><Dashboard /></MainLayout> </PrivateRoute> } />
                <Route path ="/products" element={ <PrivateRoute> <MainLayout><Products /></MainLayout> </PrivateRoute> } />
            </Routes>

        </BrowserRouter>
    )

}