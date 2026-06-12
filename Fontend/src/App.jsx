import {
    BrowserRouter , 
    Routes,
    Route,
} from 'react-router-dom';

import Login from "./modules/auth/pages/Login";

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
import SalesReport from './modules/reports/pages/SalesReport';
import TopProductsReport from './modules/reports/pages/TopProductsReport';
import StockMovementReport from './modules/reports/pages/StockMovementReport';
import Recipes from './modules/recipes/pages/Recipes';
import Ingredients from './modules/ingredients/pages/Ingredients';
import OptionManagement from './modules/optionproducts/pages/OptionManagement';
import OptionList from './modules/optionproducts/pages/OptionList';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/users" element={<PrivateRoute><MainLayout><Users /></MainLayout></PrivateRoute>} />
                <Route path ="/dashboard" element={ <PrivateRoute> <MainLayout><Dashboard /></MainLayout> </PrivateRoute> } />
                <Route path ="/products" element={ <PrivateRoute> <MainLayout><Products /></MainLayout> </PrivateRoute> } />
                <Route path ="/categories" element={ <PrivateRoute> <MainLayout><Categories /></MainLayout> </PrivateRoute> } />
                <Route path ="/stock" element={ <PrivateRoute> <MainLayout><Stock /></MainLayout> </PrivateRoute> } />
                <Route path="/pos" element={<PrivateRoute><MainLayout><POS /></MainLayout></PrivateRoute>}/>
                <Route path="/orders" element={<PrivateRoute><MainLayout><Orders /></MainLayout></PrivateRoute>}/>
                <Route path="/reports/SalesReport" element={<PrivateRoute><MainLayout><SalesReport /></MainLayout></PrivateRoute>}/>
                <Route path="/reports/top-products" element={<PrivateRoute><MainLayout><TopProductsReport /></MainLayout></PrivateRoute>}/>
                <Route path="/reports/stock-log" element={<PrivateRoute><MainLayout><StockMovementReport /></MainLayout></PrivateRoute>}/>
                <Route path="/recipes" element={<PrivateRoute><MainLayout><Recipes /></MainLayout></PrivateRoute>}/>
                <Route path="/ingredients" element={<PrivateRoute><MainLayout><Ingredients /></MainLayout></PrivateRoute>}/>
                <Route path="/option" element={<PrivateRoute><MainLayout><OptionManagement /></MainLayout></PrivateRoute>}/>
                <Route path="/optionlist" element={<PrivateRoute><MainLayout><OptionList /></MainLayout></PrivateRoute>}/>

            </Routes>
        </BrowserRouter>
    )
}