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
        password: user?.password || '',
        avatar: user?.avatar || ''
    })

    if (!user) {
        return (
            <div className="perfil-wrapper">
                <div className="perfil-redirect">
                    <h2>Debes iniciar sesión para acceder al perfil</h2>
                    <Link to="/" className="perfil-redirect__btn">Volver a inicio</Link>
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
        // Guardar cambios en localStorage (sin solicitar la contraseña anterior)
        const updatedUser = { ...user, ...formData }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setErrorMsg('')
        setIsEditing(false)
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
                    <Link to="/" className="perfil-logo">BookHeaven</Link>
                    <nav className="perfil-nav">
                        <Link to="/">← Volver a Inicio</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="perfil-container">
                <div className="perfil-card">
                        <div className="perfil-header-section">
                        <img src={formData.avatar || "https://picsum.photos/seed/profile/120/120"} alt="Avatar" className="perfil-avatar" />
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
                                        <div className="perfil-info-item">
                                            <label>Nombre completo</label>
                                            <p>{formData.name}</p>
                                        </div>
                                        <div className="perfil-info-item">
                                            <label>Correo electrónico</label>
                                            <p>{formData.email}</p>
                                        </div>
                                        <div className="perfil-info-item">
                                            <label>Contraseña</label>
                                            <p>{'*'.repeat(formData.password?.length || 8)}</p>
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
                                        <div className="perfil-error-msg">
                                            {errorMsg}
                                        </div>
                                    )}
                                    <form className="perfil-form">
                                        <div className="form-group">
                                            <label>Foto de perfil</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="avatar"
                                                onChange={handleAvatarChange}
                                            />
                                            {formData.avatar && (
                                                <img src={formData.avatar} alt="preview" style={{width:80, height:80, borderRadius: '50%', marginTop:12, border: '2px solid #D4A76A'}} />
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>Nombre completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nueva contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {/* Eliminado: confirmación de contraseña anterior (no requerida) */}
                                    </form>
                                </section>

                                {/* Botones de guardado */}
                                <div className="perfil-actions">
                                    <button className="perfil-btn perfil-btn--primary" onClick={handleSaveChanges}>
                                        Guardar cambios
                                    </button>
                                    <button className="perfil-btn perfil-btn--secondary" onClick={() => {
                                        // Revertir cambios no guardados
                                        setFormData({
                                            name: user?.name || '',
                                            email: user?.email || '',
                                            password: user?.password || '',
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

            {/* Footer */}
            <footer className="perfil-footer">
                <p>&copy; 2026 BookHeaven. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default Perfil
