import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../styles/buscar.css'

function Buscar({ books = [], mangas = [], comics = [] }) {
    const [query, setQuery] = useState('')

    const combined = useMemo(() => {
        const adapt = (item, type) => ({ ...item, _type: type })
        return [
            ...books.map(b => adapt(b, 'Libro')),
            ...mangas.map(m => adapt(m, 'Manga')),
            ...comics.map(c => adapt(c, 'Cómic'))
        ]
    }, [books, mangas, comics])

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return combined
        return combined.filter(item => (
            (item.title || '').toLowerCase().includes(q) ||
            (item.genres && item.genres.join(' ').toLowerCase().includes(q)) ||
            (item.description || '').toLowerCase().includes(q)
        ))
    }, [query, combined])

    return (
        <div className="buscar-wrapper">
            <div className="buscar-container">
                <h2>Buscar</h2>
                <div className="buscar-input">
                    <input
                        type="search"
                        placeholder="Buscar libros, cómics, mangas..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="buscar-results">
                    {results.length === 0 ? (
                        <p className="buscar-empty">No se encontraron resultados.</p>
                    ) : (
                        results.map(item => (
                            <div key={`${item._type}-${item.id || item.title}`} className="buscar-card">
                                <img src={item.poster} alt={item.title} />
                                <div className="buscar-card__body">
                                    <h3>{item.title}</h3>
                                    <p className="buscar-type">{item._type}</p>
                                    <p className="buscar-desc">{item.description}</p>
                                </div>
                                <div className="buscar-actions">
                                    {/* Link de ejemplo: abrir detalle según tipo */}
                                    <Link to="#" className="buscar-btn">Ver</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Buscar
