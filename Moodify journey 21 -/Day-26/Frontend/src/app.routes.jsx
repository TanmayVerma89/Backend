import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/login';
import Register from './features/auth/pages/Register';
import FaceTest from './features/expressions/pages/FaceTest';
import Protected from './features/auth/components/Protected';
import Home from './features/Home/pages/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><Home /></Protected>,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])