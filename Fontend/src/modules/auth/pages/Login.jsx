import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { loginApi } from '../api/auth.api';

import { useAuth } from '../hooks/useAuth';

import LoginForm from '../components/LoginForm';

export default function Login() {
    return(
        <div>
            <LoginForm />
        </div>
    )
}