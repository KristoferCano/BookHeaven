import React, { useState, useEffect } from 'react'
import '../styles/configuracion.css'

function Configuracion({ user, setUser }) {
    const [tab, setTab] = useState('cuenta')
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [settings, setSettings] = useState({ theme: 'dark', language: 'es', palette: 'dorado', notifications: { email: true, push: false }, apiBase: 'http://localhost:8000/api' })
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if (user) {
            setForm({ name: user.name || '', email: user.email || '', password: '', confirmPassword: '' })
            setSettings(prev => ({ ...prev, ...(user.settings || {}) }))
        } else {
            // cargar ajustes globales si existen
            try {
                const global = JSON.parse(localStorage.getItem('appSettings') || '{}')
                setSettings(prev => ({ ...prev, ...global }))
            } catch (err) { }
        }
    }, [user])

    const saveAccount = () => {
        if (form.password && form.password !== form.confirmPassword) {
            setMsg('Las contraseñas no coinciden')
            return
        }

        const updated = { ...(user || {}), name: form.name, email: form.email }
        if (form.password) updated.password = form.password
        if (setUser) setUser(updated)
        localStorage.setItem('user', JSON.stringify(updated))
        setMsg('Cuenta actualizada')
    }

    const savePreferences = () => {
        const next = { ...(user?.settings || {}), theme: settings.theme, language: settings.language, palette: settings.palette }
        setSettings(prev => ({ ...prev }))
        if (user) {
            const updated = { ...user, settings: next }
            if (setUser) setUser(updated)
            localStorage.setItem('user', JSON.stringify(updated))
        } else {
            localStorage.setItem('appSettings', JSON.stringify(next))
        }
        setMsg('Preferencias guardadas')
    }

    const saveNotifications = () => {
        const next = { ...(user?.settings || {}), notifications: settings.notifications }
        if (user) {
            const updated = { ...user, settings: next }
            if (setUser) setUser(updated)
            localStorage.setItem('user', JSON.stringify(updated))
        } else {
            const g = JSON.parse(localStorage.getItem('appSettings') || '{}')
            g.notifications = settings.notifications
            localStorage.setItem('appSettings', JSON.stringify(g))
        }
        setMsg('Notificaciones actualizadas')
    }

    // Advanced settings removed: API Base editing eliminated per request

    return (
        <div className="config-wrapper">
            <div className="config-container">
                <h2>Configuración</h2>
                <div className="config-tabs">
                    <button className={tab === 'cuenta' ? 'active' : ''} onClick={() => setTab('cuenta')}>Cuenta</button>
                    <button className={tab === 'preferencias' ? 'active' : ''} onClick={() => setTab('preferencias')}>Preferencias</button>
                    <button className={tab === 'notificaciones' ? 'active' : ''} onClick={() => setTab('notificaciones')}>Notificaciones</button>
                </div>

                {msg && <div className="config-msg">{msg}</div>}

                <div className="config-body">
                    {tab === 'cuenta' && (
                        <div className="config-panel">
                            <label>Nombre</label>
                            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            <label>Correo</label>
                            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                            <label>Nueva contraseña</label>
                            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                            <label>Confirmar contraseña</label>
                            <input type="password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} />
                            <div className="config-actions">
                                <button className="btn btn--primary" onClick={saveAccount}>Guardar cuenta</button>
                            </div>
                        </div>
                    )}

                    {tab === 'preferencias' && (
                        <div className="config-panel">
                            <label>Tema</label>
                            <select value={settings.theme} onChange={e => setSettings(s => ({ ...s, theme: e.target.value }))}>
                                <option value="dark">Oscuro</option>
                                <option value="light">Claro</option>
                            </select>

                            <label>Idioma</label>
                            <select value={settings.language} onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}>
                                <option value="es">Español</option>
                                <option value="en">English</option>
                            </select>

                            <label>Paleta</label>
                            <select value={settings.palette} onChange={e => setSettings(s => ({ ...s, palette: e.target.value }))}>
                                <option value="dorado">Dorado</option>
                                <option value="azul">Azul</option>
                                <option value="verde">Verde</option>
                            </select>

                            <div className="config-actions">
                                <button className="btn btn--primary" onClick={savePreferences}>Guardar preferencias</button>
                            </div>
                        </div>
                    )}

                    {tab === 'notificaciones' && (
                        <div className="config-panel">
                            <label>
                                <input type="checkbox" checked={settings.notifications.email} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, email: e.target.checked } }))} />
                                Recibir notificaciones por email
                            </label>
                            <label>
                                <input type="checkbox" checked={settings.notifications.push} onChange={e => setSettings(s => ({ ...s, notifications: { ...s.notifications, push: e.target.checked } }))} />
                                Notificaciones push (navegador)
                            </label>

                            <div className="config-actions">
                                <button className="btn btn--primary" onClick={saveNotifications}>Guardar notificaciones</button>
                            </div>
                        </div>
                    )}

                    {/* Avanzado removido */}
                </div>
            </div>
        </div>
    )
}

export default Configuracion
