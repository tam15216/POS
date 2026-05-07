import {
    BrowserRouter , 
    Routes,
    Route,
} from 'react-router-dom';

import Login from "./modules/auth/pages/Login";
import Register from './modules/auth/pages/Register';

import PrivateRoute from './routes/PrivateRoute';

function DashBoard() {
    return <h1> DashBoard </h1>
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path ="/dashboard" element={ <PrivateRoute> <DashBoard /> </PrivateRoute> } />
            </Routes>

        </BrowserRouter>
    )

}