import React, { useState } from 'react'
import '../styles/auth-modal.css'

function RegisterModal({ isOpen, onClose, onRegisterSuccess, onOpenLogin, onError }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: []
    })
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')

    // Validación de nombre
    const validateName = (name) => {
        if (name.trim().length < 3) {
            return 'El nombre debe tener al menos 3 caracteres'
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
            return 'El nombre solo puede contener letras y espacios'
        }
        return ''
    }

    // Validación de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return 'Por favor ingresa un correo electrónico válido'
        }
        return ''
    }

    // Cálculo de fortaleza de contraseña
    const calculatePasswordStrength = (password) => {
        const feedback = []
        let score = 0

        if (!password) {
            return { score: 0, feedback: [] }
        }

        // Longitud mínima (8 caracteres)
        if (password.length >= 8) {
            score += 20
        } else {
            feedback.push('Mínimo 8 caracteres')
        }

        // Longitud óptima (12+)
        if (password.length >= 12) {
            score += 10
        }

        // Mayúsculas
        if (/[A-Z]/.test(password)) {
            score += 20
        } else {
            feedback.push('Mayúsculas (A-Z)')
        }

        // Minúsculas
        if (/[a-z]/.test(password)) {
            score += 20
        } else {
            feedback.push('Minúsculas (a-z)')
        }

        // Números
        if (/\d/.test(password)) {
            score += 15
        } else {
            feedback.push('Números (0-9)')
        }

        // Caracteres especiales
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            score += 15
        } else {
            feedback.push('Caracteres especiales (!@#$%^&*)')
        }

        return {
            score: Math.min(score, 100),
            feedback: feedback
        }
    }

    // Obtener nivel de fortaleza con color
    const getPasswordStrengthLevel = (score) => {
        if (score === 0) return { level: '', color: '', text: '' }
        if (score < 30) return { level: 'muy-débil', color: '#ff4444', text: 'Muy débil' }
        if (score < 50) return { level: 'débil', color: '#ff8c00', text: 'Débil' }
        if (score < 70) return { level: 'medio', color: '#ffd700', text: 'Medio' }
        if (score < 85) return { level: 'fuerte', color: '#90ee90', text: 'Fuerte' }
        return { level: 'muy-fuerte', color: '#00aa00', text: 'Muy fuerte' }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Validar nombre en tiempo real
        if (name === 'name') {
            setNameError(validateName(value))
        }

        // Validar email en tiempo real
        if (name === 'email' && value) {
            setEmailError(validateEmail(value))
        }

        // Calcular fortaleza de contraseña en tiempo real
        if (name === 'password') {
            const strength = calculatePasswordStrength(value)
            setPasswordStrength(strength)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setNameError('')
        setEmailError('')

        // Validación final del nombre
        const finalNameError = validateName(formData.name)
        if (finalNameError) {
            setNameError(finalNameError)
            setError(finalNameError)
            if (onError) onError(finalNameError)
            return
        }

        // Validación final del email
        const finalEmailError = validateEmail(formData.email)
        if (finalEmailError) {
            setEmailError(finalEmailError)
            setError(finalEmailError)
            if (onError) onError(finalEmailError)
            return
        }

        // Validación de fortaleza de contraseña
        const strength = calculatePasswordStrength(formData.password)
        if (strength.score < 50) {
            const errorMsg = 'La contraseña es muy débil. Agrega: ' + strength.feedback.join(', ')
            setError(errorMsg)
            if (onError) onError(errorMsg)
            return
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.password_confirmation) {
            const errorMsg = 'Las contraseñas no coinciden'
            setError(errorMsg)
            if (onError) onError(errorMsg)
            return
        }

        setLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                })
            })

            const data = await response.json()

            if (!response.ok) {
                const errorMsg = data.message || data.error || 'Error al registrarse'
                setError(errorMsg)
                if (onError) onError(errorMsg)
                return
            }

            // Guardar el token y datos del usuario
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            // Limpiar formulario
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
            setPasswordStrength({ score: 0, feedback: [] })
            onRegisterSuccess(data.user)
            onClose()
        } catch (err) {
            const errorMsg = 'Error de conexión: ' + err.message
            setError(errorMsg)
            if (onError) onError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    const strengthLevel = getPasswordStrengthLevel(passwordStrength.score)

    if (!isOpen) return null

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>

                <div className="auth-modal-header">
                    <h2>Crear Cuenta</h2>
                    <p>Únete a BookHeaven hoy</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={nameError ? 'input-error-border' : ''}
                        />
                        {nameError && <small className="error-text">✗ {nameError}</small>}
                        {!nameError && formData.name && <small className="success-text">✓ Nombre válido</small>}
                        {!formData.name && <small className="hint-text"></small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tu@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={emailError ? 'input-error-border' : ''}
                        />
                        {emailError && <small className="error-text">✗ {emailError}</small>}
                        {!emailError && formData.email && <small className="success-text">✓ Correo válido</small>}
                        {!formData.email && <small className="hint-text">Usa un correo válido para tu cuenta</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        
                        {/* Barra de fortaleza de contraseña */}
                        {formData.password && (
                            <div className="password-strength-container">
                                <div className="password-strength-bar">
                                    <div 
                                        className="password-strength-fill"
                                        style={{
                                            width: `${passwordStrength.score}%`,
                                            backgroundColor: strengthLevel.color,
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></div>
                                </div>
                                <div className="password-strength-info">
                                    <span className="strength-level" style={{ color: strengthLevel.color }}>
                                        {strengthLevel.text}
                                    </span>
                                    <span className="strength-score">{passwordStrength.score}%</span>
                                </div>

                                {/* Requisitos pendientes */}
                                {passwordStrength.feedback.length > 0 && (
                                    <div className="password-requirements">
                                        <p className="requirements-title">Falta agregar:</p>
                                        <ul>
                                            {passwordStrength.feedback.map((item, index) => (
                                                <li key={index}>
                                                    <span className="requirement-icon">✗</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Contraseña completada */}
                                {passwordStrength.feedback.length === 0 && formData.password.length > 0 && (
                                    <div className="password-completed">
                                        <span className="requirement-icon">✓</span>
                                        ¡Contraseña segura!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="••••••••"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className={formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation ? 'input-error-border' : ''}
                        />
                        {formData.password && formData.password_confirmation && (
                            formData.password === formData.password_confirmation ? (
                                <small className="success-text">✓ Las contraseñas coinciden</small>
                            ) : (
                                <small className="error-text">✗ Las contraseñas no coinciden</small>
                            )
                        )}
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button
                        type="submit"
                        className="auth-button-submit"
                        disabled={loading || passwordStrength.score < 50 || !!nameError || !!emailError}
                    >
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="auth-divider">o</div>

                <div className="auth-footer">
                    <p>¿Ya tienes cuenta?</p>
                    <button 
                        className="auth-button-secondary"
                        onClick={() => {
                            onClose()
                            onOpenLogin()
                        }}
                    >
                        Inicia sesión aquí
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal
