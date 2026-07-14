import { login, register, logout, getMe } from '../services/auth.api';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth.context';

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleLogin({ username, email, password }) {
        setLoading(true);
        const data = await login({ username, email, password });

        if (!data?.user) {
            throw new Error('Login failed')
        }

        setUser(data.user)
        setLoading(false)

    }

    async function handleRegister({ username, email, password }) {
        setLoading(true);
        const data = await register({ username, email, password })

        if (!data?.user) {
            throw new Error('Login failed')
        }

        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe();

            setUser(data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    }

    useEffect(() => {
        handleGetMe()
    }, [])


    return ({
        user, loading, handleLogin, handleRegister, handleLogout, handleGetMe
    })  

}


