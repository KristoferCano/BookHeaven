import React, { useState, useEffect } from 'react'
import '../styles/miLista.css'

function MiLista({ user, setUser, books = [], mangas = [], comics = [] }) {
    const [tab, setTab] = useState('favoritos')
    const [favoritos, setFavoritos] = useState([])
    const [estadoLectura, setEstadoLectura] = useState({ pendiente: [], leyendo: [], completado: [] })
    const [historial, setHistorial] = useState([])

    const combined = [...books, ...mangas, ...comics]

    useEffect(() => {
        if (user) {
            setFavoritos(user.favoritos || [])
            setEstadoLectura(user.estadoLectura || { pendiente: [], leyendo: [], completado: [] })
            setHistorial(user.historial || [])
        }
    }, [user])

    const save = (newFavoritos, newEstadoLectura, newHistorial) => {
        const updated = { 
            ...(user || {}), 
            favoritos: newFavoritos, 
            estadoLectura: newEstadoLectura, 
            historial: newHistorial 
        }
        if (setUser) setUser(updated)
        localStorage.setItem('user', JSON.stringify(updated))
    }

    const toggleFavorito = (item) => {
        const idx = favoritos.findIndex(f => f.id === item.id && f.title === item.title)
        let next
        if (idx >= 0) {
            next = favoritos.filter((_, i) => i !== idx)
        } else {
            next = [...favoritos, { ...item, _type: item._type || 'Desconocido' }]
        }
        setFavoritos(next)
        save(next, estadoLectura, historial)
    }

    const isFavorito = (item) => favoritos.some(f => f.id === item.id && f.title === item.title)

    const cambiarEstadoLectura = (item, nuevoEstado) => {
        const key = nuevoEstado
        const otrosKeys = Object.keys(estadoLectura).filter(k => k !== key)
        
        const next = { ...estadoLectura, [key]: [...estadoLectura[key], { ...item, _type: item._type || 'Desconocido', fecha: new Date().toLocaleDateString() }] }
        
        otrosKeys.forEach(k => {
            next[k] = next[k].filter(it => !(it.id === item.id && it.title === item.title))
        })
        
        setEstadoLectura(next)
        save(favoritos, next, historial)
    }

    const getEstadoActual = (item) => {
        if (estadoLectura.pendiente.find(it => it.id === item.id && it.title === item.title)) return 'pendiente'
        if (estadoLectura.leyendo.find(it => it.id === item.id && it.title === item.title)) return 'leyendo'
        if (estadoLectura.completado.find(it => it.id === item.id && it.title === item.title)) return 'completado'
        return null
    }

    const registrarHistorial = (item) => {
        const entrada = { ...item, _type: item._type || 'Desconocido', visto: new Date().toLocaleString() }
        const filtrado = historial.filter(h => !(h.id === item.id && h.title === item.title))
        const next = [entrada, ...filtrado].slice(0, 20)
        setHistorial(next)
        save(favoritos, estadoLectura, next)
    }

    return (
        <div className="miolista-wrapper">
            <div className="miolista-container">
                <h2>Mi Lista</h2>
                <div className="miolista-tabs">
                    <button className={tab === 'favoritos' ? 'active' : ''} onClick={() => setTab('favoritos')}>Favoritos ({favoritos.length})</button>
                    <button className={tab === 'lectura' ? 'active' : ''} onClick={() => setTab('lectura')}>Estado de lectura</button>
                    <button className={tab === 'historial' ? 'active' : ''} onClick={() => setTab('historial')}>Historial ({historial.length})</button>
                </div>

                <div className="miolista-body">
                    {tab === 'favoritos' && (
                        <div className="miolista-panel">
                            {favoritos.length === 0 ? (
                                <p className="empty">No tienes favoritos aún. Explora y agrega tus favoritos.</p>
                            ) : (
                                <div className="miolista-items">
                                    {favoritos.map((item, idx) => (
                                        <div key={`${item.id || idx}`} className="miolista-item">
                                            <img src={item.poster} alt={item.title} />
                                            <div className="info">
                                                <h4>{item.title}</h4>
                                                <p>{item._type}</p>
                                            </div>
                                            <button className="btn btn--danger" onClick={() => toggleFavorito(item)}>Quitar</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 'lectura' && (
                        <div className="miolista-panel">
                            <div className="miolista-estado">
                                <div className="estado-column">
                                    <h3>Pendiente ({estadoLectura.pendiente.length})</h3>
                                    <div className="items-list">
                                        {estadoLectura.pendiente.map(item => (
                                            <div key={`${item.id}`} className="estado-item">
                                                <img src={item.poster} alt={item.title} />
                                                <div className="data">
                                                    <p>{item.title}</p>
                                                    <small>{item.fecha}</small>
                                                </div>
                                                <select value="pendiente" onChange={e => cambiarEstadoLectura(item, e.target.value)}>
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="leyendo">Leyendo</option>
                                                    <option value="completado">Completado</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="estado-column">
                                    <h3>Leyendo ({estadoLectura.leyendo.length})</h3>
                                    <div className="items-list">
                                        {estadoLectura.leyendo.map(item => (
                                            <div key={`${item.id}`} className="estado-item">
                                                <img src={item.poster} alt={item.title} />
                                                <div className="data">
                                                    <p>{item.title}</p>
                                                    <small>{item.fecha}</small>
                                                </div>
                                                <select value="leyendo" onChange={e => cambiarEstadoLectura(item, e.target.value)}>
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="leyendo">Leyendo</option>
                                                    <option value="completado">Completado</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="estado-column">
                                    <h3>Completado ({estadoLectura.completado.length})</h3>
                                    <div className="items-list">
                                        {estadoLectura.completado.map(item => (
                                            <div key={`${item.id}`} className="estado-item">
                                                <img src={item.poster} alt={item.title} />
                                                <div className="data">
                                                    <p>{item.title}</p>
                                                    <small>{item.fecha}</small>
                                                </div>
                                                <select value="completado" onChange={e => cambiarEstadoLectura(item, e.target.value)}>
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="leyendo">Leyendo</option>
                                                    <option value="completado">Completado</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 'historial' && (
                        <div className="miolista-panel">
                            {historial.length === 0 ? (
                                <p className="empty">Tu historial está vacío.</p>
                            ) : (
                                <div className="miolista-items">
                                    {historial.map((item, idx) => (
                                        <div key={`${item.id || idx}`} className="miolista-item">
                                            <img src={item.poster} alt={item.title} />
                                            <div className="info">
                                                <h4>{item.title}</h4>
                                                <p>{item._type}</p>
                                                <small>{item.visto}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MiLista
