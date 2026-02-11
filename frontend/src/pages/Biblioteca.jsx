import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/biblioteca.css'

function Biblioteca({ user, setUser, books = [], mangas = [], comics = [] }) {
    const [library, setLibrary] = useState([])
    const [tab, setTab] = useState('mi') // 'mi' | 'libros' | 'mangas' | 'comics'

    useEffect(() => {
        const stored = user?.library || []
        setLibrary(stored)
    }, [user])

    const saveLibrary = (next) => {
        setLibrary(next)
        try {
            const updatedUser = { ...(user || {}), library: next }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            if (setUser) setUser(updatedUser)
        } catch (err) {
            console.error('Error saving library:', err)
        }
    }

    const addItem = (item, type) => {
        const toAdd = { ...item, _type: type }
        const next = [...library, toAdd]
        saveLibrary(next)
    }

    const removeItem = (index) => {
        const next = library.filter((_, i) => i !== index)
        saveLibrary(next)
    }

    const available = () => {
        if (tab === 'libros') return books
        if (tab === 'mangas') return mangas
        if (tab === 'comics') return comics
        return []
    }

    return (
        <div className="biblioteca-wrapper">
            <div className="biblioteca-container">
                <header className="biblioteca-header">
                    <h2>Mi Biblioteca</h2>
                    <p>Gestiona tus libros, mangas y cómics guardados localmente.</p>
                </header>

                <div className="biblioteca-grid">
                    <div className="biblioteca-left">
                        <div className="biblioteca-tabs">
                            <button className={tab==='mi' ? 'active' : ''} onClick={() => setTab('mi')}>Mi biblioteca</button>
                            <button className={tab==='libros' ? 'active' : ''} onClick={() => setTab('libros')}>Libros</button>
                            <button className={tab==='mangas' ? 'active' : ''} onClick={() => setTab('mangas')}>Mangas</button>
                            <button className={tab==='comics' ? 'active' : ''} onClick={() => setTab('comics')}>Cómics</button>
                        </div>

                        {tab === 'mi' ? (
                            <div className="biblioteca-list">
                                {library.length === 0 ? (
                                    <p className="empty">Tu biblioteca está vacía. Agrega elementos desde las pestañas de la derecha.</p>
                                ) : (
                                    library.map((it, idx) => (
                                        <div key={`${it._type}-${it.id || idx}`} className="biblioteca-item">
                                            <img src={it.poster} alt={it.title} />
                                            <div className="biblioteca-item__meta">
                                                <h4>{it.title}</h4>
                                                <p className="tipo">{it._type}</p>
                                            </div>
                                            <div className="biblioteca-item__actions">
                                                <button onClick={() => removeItem(idx)} className="btn btn--danger">Eliminar</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="biblioteca-available">
                                {available().length === 0 ? (
                                    <p className="empty">No hay elementos disponibles en esta categoría.</p>
                                ) : (
                                    available().map((it) => (
                                        <div key={`${it.id || it.title}`} className="biblioteca-available-item">
                                            <img src={it.poster} alt={it.title} />
                                            <div className="meta">
                                                <h4>{it.title}</h4>
                                                <p className="desc">{(it.description || '').slice(0, 120)}</p>
                                            </div>
                                            <div>
                                                <button className="btn btn--primary" onClick={() => addItem(it, tab === 'libros' ? 'Libro' : tab === 'mangas' ? 'Manga' : 'Cómic')}>Agregar</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <aside className="biblioteca-right">
                        <div className="card">
                            <h3>Información</h3>
                            <p>Los cambios se guardan localmente en tu navegador. Para sincronizar con el servidor se requiere autenticación y un endpoint específico.</p>
                            <Link to="/perfil" className="btn-link">Editar perfil</Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Biblioteca
