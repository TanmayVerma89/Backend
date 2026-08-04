import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import '../styles/authPage.scss'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (!loading && user) {
        return <Navigate to='/dashboard' />
    }
    const { handleLogin } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!email || !password) {
            setError('Enter your email address and password to continue.')
            return
        }

        setError('')
        setIsSubmitting(true)

        await handleLogin(email, password);


        setIsSubmitting(false);
        navigate('/dashboard')
    }

    return (
        <main className="auth-page">
            <section className="auth-showcase" aria-label="About Perplexity">
                <div className="auth-brand">
                    <span className="auth-brand-mark" aria-hidden="true">✦</span>
                    <span>Perplexity</span>
                </div>

                <div className="auth-showcase-copy">
                    <p className="auth-eyebrow">Think beyond the obvious</p>
                    <h1>Every great answer starts with a curious question.</h1>
                    <p>Search, explore, and keep your best ideas in one focused workspace.</p>
                </div>

                <div className="auth-quote">
                    <div className="auth-quote-stars" aria-hidden="true">✦ ✦ ✦</div>
                    <p>“A quieter place to follow your curiosity.”</p>
                    <span>Made for better thinking</span>
                </div>
            </section>

            <section className="auth-panel">
                <div className="auth-mobile-brand">
                    <span className="auth-brand-mark" aria-hidden="true">✦</span>
                    <span>Perplexity</span>
                </div>

                <div className="auth-form-wrap">
                    <div className="auth-heading">
                        <p className="auth-eyebrow">Welcome back</p>
                        <h2>Sign in to your account</h2>
                        <p>Pick up right where your curiosity left off.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {error && <p className="auth-form-error" role="alert">{error}</p>}

                        <div className="auth-field">
                            <label htmlFor="login-email">Email address</label>
                            <div className="auth-input-wrap">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" /></svg>
                                <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="auth-field">
                            <div className="auth-label-row">
                                <label htmlFor="login-password">Password</label>
                                <button className="auth-text-button" type="button">Forgot password?</button>
                            </div>
                            <div className="auth-input-wrap">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                                <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button className="auth-password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button className="auth-submit" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing in…' : 'Sign in'}
                            {!isSubmitting && <span aria-hidden="true">→</span>}
                        </button>
                    </form>

                    <p className="auth-switch">New to Perplexity? <Link to="/register">Create an account</Link></p>
                </div>

                <p className="auth-legal">By continuing, you agree to our <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy policy</a>.</p>
            </section>
        </main>
    )
}

export default Login
