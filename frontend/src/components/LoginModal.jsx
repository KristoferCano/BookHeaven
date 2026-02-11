import React, { useState } from 'react'
import '../styles/auth-modal.css'

function LoginModal({ isOpen, onClose, onLoginSuccess, onOpenRegister, onError }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')

    // Validación de email
    const validateEmail = (emailValue) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailValue)) {
            return 'Por favor ingresa un correo electrónico válido'
        }
        return ''
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        
        // Validar email en tiempo real
        if (value) {
            setEmailError(validateEmail(value))
        } else {
            setEmailError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validación final del email
        const finalEmailError = validateEmail(email)
        if (finalEmailError) {
            setEmailError(finalEmailError)
            setError(finalEmailError)
            if (onError) onError(finalEmailError)
            return
        }

        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                const errorMsg = data.message || 'Error al iniciar sesión'
                setError(errorMsg)
                if (onError) onError(errorMsg)
                return
            }

            // Guardar el token y datos del usuario
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            setEmail('')
            setPassword('')
            setEmailError('')
            onLoginSuccess(data.user)
            onClose()
        } catch (err) {
            const errorMsg = 'Error de conexión: ' + err.message
            setError(errorMsg)
            if (onError) onError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>

                <div className="auth-modal-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Bienvenido a BookHeaven</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            disabled={loading}
                            className={emailError ? 'input-error-border' : ''}
                        />
                        {emailError && <small className="error-text">✗ {emailError}</small>}
                        {!emailError && email && <small className="success-text">✓ Correo válido</small>}
                        {!email && <small className="hint-text">Ingresa tu correo registrado</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button
                        type="submit"
                        className="auth-button-submit"
                        disabled={loading || !!emailError || !email}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="auth-divider">o</div>

                <div className="auth-footer">
                    <p>¿No tienes cuenta?</p>
                    <button 
                        className="auth-button-secondary"
                        onClick={() => {
                            onClose()
                            onOpenRegister()
                        }}
                    >
                        Regístrate aquí
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
