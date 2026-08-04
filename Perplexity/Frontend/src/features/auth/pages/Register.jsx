import { useState } from 'react'
import { Link, useAsyncValue, useNavigate } from 'react-router'
import '../styles/authPage.scss'
import useAuth from '../hooks/useAuth'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { handleRegister } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setError('Complete all fields to create your account.')
      return
    }

    if (password.length < 6) {
      setError('Use a password with at least 6 characters.')
      return
    }

    setError('')
    setIsSubmitting(true)

    await handleRegister(username, email, password)

    setIsSubmitting(false)

  }

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-showcase" aria-label="About Perplexity">
        <div className="auth-brand">
          <span className="auth-brand-mark" aria-hidden="true">✦</span>
          <span>Perplexity</span>
        </div>

        <div className="auth-showcase-copy">
          <p className="auth-eyebrow">Your ideas, amplified</p>
          <h1>A more thoughtful way to explore the web.</h1>
          <p>Turn every spark of interest into clear, reliable understanding.</p>
        </div>

        <div className="auth-orbit" aria-hidden="true">
          <span className="auth-orbit-dot auth-orbit-dot-one" />
          <span className="auth-orbit-dot auth-orbit-dot-two" />
          <span className="auth-orbit-dot auth-orbit-dot-three" />
          <span className="auth-orbit-core">✦</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-mobile-brand">
          <span className="auth-brand-mark" aria-hidden="true">✦</span>
          <span>Perplexity</span>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-heading">
            <p className="auth-eyebrow">Start exploring</p>
            <h2>Create your account</h2>
            <p>Join a calmer, more intelligent way to search.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && <p className="auth-form-error" role="alert">{error}</p>}

            <div className="auth-field">
              <label htmlFor="register-username">Username</label>
              <div className="auth-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.25" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
                <input id="register-username" name="username" type="text" autoComplete="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <div className="auth-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" /></svg>
                <input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="register-password">Password</label>
                <span className="auth-password-hint">At least 6 characters</span>
              </div>
              <div className="auth-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                <input id="register-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>

        <p className="auth-legal">By creating an account, you agree to our <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy policy</a>.</p>
      </section>
    </main>
  )
}

export default Register
