import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { registerApi } from '../api/auth.api';

import RegisterForm from '../components/RegisterForm';

export default function Register() {
         return <RegisterForm />;
}