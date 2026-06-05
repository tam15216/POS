import {
    BrowserRouter , 
    Routes,
    Route,
} from 'react-router-dom';

import Login from "./modules/auth/pages/Login";
import Register from './modules/users/pages/Users';

import Dashboard from './modules/dashboard/pages/Dashboard';
import Products from './modules/products/pages/Products';

import PrivateRoute from './routes/PrivateRoute';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MianLayout';

import Categories from './modules/categories/pages/Categories';
import Stock from './modules/stock/pages/Stock';
import Users from './modules/users/pages/Users'
import POS from './modules/orders/pages/POS';
import Orders from './modules/orders/pages/Orders';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/users" element={<PrivateRoute><MainLayout><Users /></MainLayout></PrivateRoute>} />
                <Route path ="/dashboard" element={ <PrivateRoute> <MainLayout><Dashboard /></MainLayout> </PrivateRoute> } />
                <Route path ="/products" element={ <PrivateRoute> <MainLayout><Products /></MainLayout> </PrivateRoute> } />
                <Route path ="/categories" element={ <PrivateRoute> <MainLayout><Categories /></MainLayout> </PrivateRoute> } />
                <Route path ="/stock" element={ <PrivateRoute> <MainLayout><Stock /></MainLayout> </PrivateRoute> } />
                <Route path="/pos" element={<PrivateRoute><MainLayout><POS /></MainLayout></PrivateRoute>}/>
                <Route path="/orders" element={<PrivateRoute><MainLayout><Orders /></MainLayout></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}