import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth.context';
import { getMe, login, logout, register } from '../services/auth.api';

const useAuth = () => {

    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    async function handleLogin({ username, email, password }) {
        setLoading(true);
        const data = await login({ username, email, password });

        if (!data?.user) {
            throw new Error("Login Failed");
        }

        setUser(data.user)
        setLoading(false)
    }

    async function handleRegister({ username, email, password }) {
        setLoading(true);
        const data = await register({ username, email, password });

        if (!data?.user) {
            throw new Error("Login Failed");
        }
        console.log(data.user)
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

        await logout();
        setUser(null);

        setLoading(false)
    }

    useEffect(() => {
        handleGetMe()
    }, [])


    return ({
        user, loading, handleGetMe, handleLogin, handleRegister, handleLogout
    })
}

export default useAuth