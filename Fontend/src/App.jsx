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

import Categories from './modules/categories/pages/Categories';
import Stock from './modules/stock/pages/Stock';



export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
                <Route path ="/dashboard" element={ <PrivateRoute> <MainLayout><Dashboard /></MainLayout> </PrivateRoute> } />
                <Route path ="/products" element={ <PrivateRoute> <MainLayout><Products /></MainLayout> </PrivateRoute> } />
                <Route path ="/categories" element={ <PrivateRoute> <MainLayout><Categories /></MainLayout> </PrivateRoute> } />
                <Route path ="/stock" element={ <PrivateRoute> <MainLayout><Stock /></MainLayout> </PrivateRoute> } />
            </Routes>
        </BrowserRouter>
    )
}