import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/perfil.css'

function Perfil({ user, onLogout }) {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        avatar: user?.avatar || ''
    })

    if (!user) {
        return (
            <div className="perfil-wrapper">
                <div className="perfil-redirect">
                    <h2 style={{ color: '#d4af37' }}>Debes iniciar sesión para acceder al perfil</h2>
                    <Link to="/" className="perfil-btn perfil-btn--primary">Volver a inicio</Link>
                </div>
            </div>
        )
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files && e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setFormData(prev => ({ ...prev, avatar: reader.result }))
        }
        reader.readAsDataURL(file)
    }

    const handleSaveChanges = () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setErrorMsg('Las nuevas contraseñas no coinciden')
            return
        }

        // En un caso real aquí verificaríamos currentPassword

        const updatedUser = {
            ...user,
            name: formData.name,
            email: formData.email,
            avatar: formData.avatar,
            password: formData.newPassword || user.password
        }

        localStorage.setItem('user', JSON.stringify(updatedUser))
        setErrorMsg('')
        setIsEditing(false)
        // Reset passwords
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }))
    }

    const handleLogout = () => {
        onLogout()
        navigate('/')
    }

    return (
        <div className="perfil-wrapper">
            {/* Header */}
            <header className="perfil-header">
                <div className="perfil-header__container">
                    <button onClick={() => navigate(-1)} className="perfil-back-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </button>
                    <Link to="/" className="perfil-logo">BookHeaven</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="perfil-container">
                <div className="perfil-card">
                    <div className="perfil-header-section">
                        <div className="perfil-avatar-wrapper">
                            <img src={formData.avatar || "https://picsum.photos/seed/profile/120/120"} alt="Avatar" className="perfil-avatar" />
                        </div>
                        <div className="perfil-header-info">
                            <h1>{formData.name}</h1>
                            <p className="perfil-email">{formData.email}</p>
                        </div>
                    </div>

                    <div className="perfil-content">
                        {!isEditing ? (
                            <>
                                {/* Información del perfil en modo lectura */}
                                <section className="perfil-section">
                                    <h2>Información personal</h2>
                                    <div className="perfil-info-grid">
                                        <div className="field-card">
                                            <label>Nombre completo</label>
                                            <p>{formData.name}</p>
                                        </div>
                                        <div className="field-card">
                                            <label>Correo electrónico</label>
                                            <p>{formData.email}</p>
                                        </div>
                                        <div className="field-card">
                                            <label>Contraseña</label>
                                            <p>••••••••••••</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Botones de acción */}
                                <div className="perfil-actions">
                                    <button className="perfil-btn perfil-btn--primary" onClick={() => setIsEditing(true)}>
                                        Editar perfil
                                    </button>
                                    <button className="perfil-btn perfil-btn--danger" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Formulario de edición */}
                                <section className="perfil-section">
                                    <h2>Editar información</h2>
                                    {errorMsg && (
                                        <div className="perfil-error-msg" style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontWeight: 'bold' }}>
                                            {errorMsg}
                                        </div>
                                    )}
                                    <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>
                                        <div className="avatar-edit-container">
                                            <div className="file-input-wrapper">
                                                <div className="file-input-btn">Cambiar foto de perfil</div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="avatar"
                                                    onChange={handleAvatarChange}
                                                />
                                            </div>
                                            {formData.avatar && (
                                                <img src={formData.avatar} alt="preview" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #D4A76A' }} />
                                            )}
                                        </div>

                                        <div className="field-card">
                                            <label>Nombre completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Tu nombre"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="field-card">
                                            <label>Correo electrónico</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="tu@email.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="field-card">
                                            <label>Contraseña actual</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                placeholder="••••••••"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="field-card">
                                            <label>Nueva contraseña</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                placeholder="Mínimo 8 caracteres"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="field-card">
                                            <label>Confirmar nueva contraseña</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Repite la contraseña"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </form>
                                </section>

                                {/* Botones de guardado */}
                                <div className="perfil-actions">
                                    <button className="perfil-btn perfil-btn--primary" onClick={handleSaveChanges}>
                                        Guardar cambios
                                    </button>
                                    <button className="perfil-btn perfil-btn--secondary" onClick={() => {
                                        setFormData({
                                            name: user?.name || '',
                                            email: user?.email || '',
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                            avatar: user?.avatar || ''
                                        })
                                        setIsEditing(false)
                                        setErrorMsg('')
                                    }}>
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <footer className="perfil-footer">
                <p>&copy; 2026 BookHeaven. Todos los derechos reservados.</p>
            </footer>
        </div>
    )

}

export default Perfil
