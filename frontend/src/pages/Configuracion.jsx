import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/configuracion.css'

function Configuracion({ user, setUser }) {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('cuenta')
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState('')

    // Form states
    const [accountForm, setAccountForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || ''
    })

    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [preferences, setPreferences] = useState({
        darkMode: true,
        notifications: true,
        genres: ['Misterio', 'Fantasía'],
        contentType: 'Libros'
    })

    const availableGenres = ['Misterio', 'Fantasía', 'Terror', 'Romance', 'Ciencia Ficción', 'Acción', 'Drama', 'Aventura', 'Histórico']

    useEffect(() => {
        if (user) {
            setAccountForm({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || ''
            })
        }
    }, [user])

    const handleAvatarChange = (e) => {
        const file = e.target.files && e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setAccountForm(prev => ({ ...prev, avatar: reader.result }))
        }
        reader.readAsDataURL(file)
    }

    const toggleGenre = (genre) => {
        setPreferences(prev => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter(g => g !== genre)
                : [...prev.genres, genre]
        }))
    }

    const saveChanges = (section) => {
        setMsg(`¡Cambios en ${section} guardados correctamente!`)
        setTimeout(() => setMsg(''), 4000)

        if (section === 'Cuenta') {
            const updated = { ...user, name: accountForm.name, email: accountForm.email, avatar: accountForm.avatar }
            if (setUser) setUser(updated)
            localStorage.setItem('user', JSON.stringify(updated))
        }

        if (section === 'Seguridad') {
            setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        }
    }

    return (
        <div className="config-wrapper">
            {/* Header */}
            <header className="config-header">
                <div className="config-header__container">
                    <button onClick={() => navigate(-1)} className="config-back-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </button>
                    <div className="config-logo">BOOKHEAVEN</div>
                </div>
            </header>

            <div className="config-layout">
                {/* Sidebar */}
                <aside className="config-sidebar">
                    <h2>Ajustes</h2>
                    <nav className="config-nav">
                        <button
                            className={`config-nav-item ${activeTab === 'cuenta' ? 'active' : ''}`}
                            onClick={() => setActiveTab('cuenta')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            Cuenta
                        </button>
                        <button
                            className={`config-nav-item ${activeTab === 'seguridad' ? 'active' : ''}`}
                            onClick={() => setActiveTab('seguridad')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Seguridad
                        </button>
                        <button
                            className={`config-nav-item ${activeTab === 'preferencias' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preferencias')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                            Preferencias
                        </button>
                        <button
                            className={`config-nav-item ${activeTab === 'suscripcion' ? 'active' : ''}`}
                            onClick={() => setActiveTab('suscripcion')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                            Suscripción
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="config-content">
                    {msg && <div className="config-msg" style={{ background: 'rgba(212,167,106,0.15)', border: '1px solid var(--config-accent)', color: 'var(--config-accent)', padding: '1.2rem', borderRadius: '15px', marginBottom: '2rem', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 0 20px rgba(212,167,106,0.2)' }}>{msg}</div>}

                    {activeTab === 'cuenta' && (
                        <div className="config-section-card">
                            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> Ajustes de Cuenta</h3>

                            <div className="config-avatar-section">
                                <img src={accountForm.avatar || "https://picsum.photos/seed/setup/120/120"} alt="Profile" className="config-avatar-preview" />
                                <div className="config-avatar-actions">
                                    <label className="config-btn-upload">
                                        Subir nueva foto
                                        <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                                    </label>
                                    <button className="config-btn-delete" onClick={() => setAccountForm(prev => ({ ...prev, avatar: '' }))}>Eliminar foto actual</button>
                                </div>
                            </div>

                            <div className="config-form-group">
                                <label>Nombre Completo</label>
                                <input
                                    className="config-input"
                                    placeholder="Ingresa tu nombre"
                                    value={accountForm.name}
                                    onChange={e => setAccountForm(f => ({ ...f, name: e.target.value }))}
                                />
                            </div>

                            <div className="config-form-group">
                                <label>Correo Electrónico</label>
                                <input
                                    className="config-input"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={accountForm.email}
                                    onChange={e => setAccountForm(f => ({ ...f, email: e.target.value }))}
                                />
                            </div>

                            <button className="config-save-btn" onClick={() => saveChanges('Cuenta')}>Guardar Perfil</button>
                        </div>
                    )}

                    {activeTab === 'seguridad' && (
                        <div className="config-section-card">
                            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> Seguridad de la Cuenta</h3>

                            <div className="config-form-group">
                                <label>Contraseña Actual</label>
                                <div className="config-input-wrapper">
                                    <input
                                        className="config-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={securityForm.currentPassword}
                                        onChange={e => setSecurityForm(f => ({ ...f, currentPassword: e.target.value }))}
                                    />
                                    <button className="config-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? "OCULTAR" : "MOSTRAR"}
                                    </button>
                                </div>
                            </div>

                            <div className="config-form-group">
                                <label>Nueva Contraseña</label>
                                <input
                                    className="config-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 8 caracteres"
                                    value={securityForm.newPassword}
                                    onChange={e => setSecurityForm(f => ({ ...f, newPassword: e.target.value }))}
                                />
                            </div>

                            <div className="config-form-group">
                                <label>Confirmar Nueva Contraseña</label>
                                <input
                                    className="config-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Repite tu nueva contraseña"
                                    value={securityForm.confirmPassword}
                                    onChange={e => setSecurityForm(f => ({ ...f, confirmPassword: e.target.value }))}
                                />
                            </div>

                            <button className="config-save-btn" onClick={() => saveChanges('Seguridad')}>Actualizar Contraseña</button>
                        </div>
                    )}

                    {activeTab === 'preferencias' && (
                        <div className="config-section-card">
                            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24 }}><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> Experiencia y Preferencias</h3>

                            <div className="config-toggle-item">
                                <div className="config-toggle-info">
                                    <p>Modo Oscuro</p>
                                    <p>Cambia el tema visual de la plataforma</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={preferences.darkMode} onChange={e => setPreferences(p => ({ ...p, darkMode: e.target.checked }))} />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="config-toggle-item">
                                <div className="config-toggle-info">
                                    <p>Notificaciones</p>
                                    <p>Recibe alertas sobre nuevos estrenos y ofertas</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={preferences.notifications} onChange={e => setPreferences(p => ({ ...p, notifications: e.target.checked }))} />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="config-form-group" style={{ marginTop: '2.5rem' }}>
                                <label>Tus Géneros Favoritos</label>
                                <div className="genre-tags">
                                    {availableGenres.map(genre => (
                                        <span
                                            key={genre}
                                            className={`genre-tag ${preferences.genres.includes(genre) ? 'selected' : ''}`}
                                            onClick={() => toggleGenre(genre)}
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--config-text-muted)', marginTop: '0.8rem' }}>Puedes seleccionar múltiples géneros para personalizar tus recomendaciones.</p>
                            </div>

                            <div className="config-form-group">
                                <label>Tipo de Contenido Preferido</label>
                                <select
                                    className="config-input"
                                    value={preferences.contentType}
                                    onChange={e => setPreferences(p => ({ ...p, contentType: e.target.value }))}
                                >
                                    <option value="Libros">Libros</option>
                                    <option value="Mangas">Mangas</option>
                                    <option value="Cómics">Cómics</option>
                                </select>
                            </div>

                            <button className="config-save-btn" onClick={() => saveChanges('Preferencias')}>Guardar Preferencias</button>
                        </div>
                    )}

                    {activeTab === 'suscripcion' && (
                        <div className="config-section-card">
                            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24 }}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> Gestión de Suscripción</h3>

                            <div className="plan-card">
                                <div className="plan-info">
                                    <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2.5px', opacity: 0.8, color: '#fff', marginBottom: '8px' }}>Estado de la cuenta</p>
                                    <h4>Premium Gold</h4>
                                    <p className="plan-date">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        Próxima renovación: 15 de Marzo, 2026
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <button className="config-save-btn">Cambiar mi Plan Actual</button>
                                <button className="config-danger-btn">Cancelar Suscripción</button>
                            </div>

                            <div style={{ marginTop: '2rem', padding: '1.2rem', background: 'rgba(231, 76, 60, 0.05)', borderRadius: '14px', border: '1px solid rgba(231, 76, 60, 0.1)' }}>
                                <p style={{ fontSize: '0.85rem', color: '#e74c3c', textAlign: 'center', lineHeight: '1.5' }}>
                                    <strong>Nota importante:</strong> Al cancelar perderás el acceso ilimitado a nuestra biblioteca premium y beneficios exclusivos al final de tu periodo de facturación actual.
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Configuracion
