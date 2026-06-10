import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login , register} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, loading, setUser, setLoading } = context

    async function handleLogin(username, password) {
        setLoading(true)
        try {
            const res = await login(username, password)
            setUser(res.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function handleRegister(username, email, password) {
        setLoading(true)
        try {
            const res = await register(username, email, password)
            setUser(res.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleLogin, handleRegister }
}