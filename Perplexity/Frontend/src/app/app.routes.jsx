import { createBrowserRouter, Navigate } from 'react-router'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Dashboard from '../features/chat/pages/Dashboard'
import Protected from '../features/auth/components/Protected'
import VerifyEmail from '../features/auth/components/VerifyEmail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/dashboard',
        element: <Protected><Dashboard /></Protected>
    },{
        path:'/verifyEmail',
        element:<VerifyEmail/>
    }
])
