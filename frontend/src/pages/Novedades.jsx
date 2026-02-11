import React, { useState, useMemo } from 'react'
import '../styles/novedades.css'

function Novedades({ user, books = [], mangas = [], comics = [] }) {
    const [tab, setTab] = useState('recientes')

    const combined = useMemo(() => {
        const adapt = (items, type) => items.map((item, idx) => ({ 
            ...item, 
            _type: type,
            _timestamp: Date.now() - (idx * 86400000), // cada item 1 día más viejo
            _trending: Math.floor(Math.random() * 100) + 60 // puntuación aleatoria 60-160
        }))
        return [
            ...adapt(books, 'Libro'),
            ...adapt(mangas, 'Manga'),
            ...adapt(comics, 'Cómic')
        ]
    }, [books, mangas, comics])

    const recientes = useMemo(() => {
        return [...combined].sort((a, b) => b._timestamp - a._timestamp).slice(0, 12)
    }, [combined])

    const trending = useMemo(() => {
        return [...combined].sort((a, b) => b._trending - a._trending).slice(0, 12)
    }, [combined])

    const recomendaciones = useMemo(() => {
        if (!user?.favoritos || user.favoritos.length === 0) return combined.slice(0, 12)
        
        const favTypes = {}
        user.favoritos.forEach(fav => {
            const type = fav._type || 'Desconocido'
            favTypes[type] = (favTypes[type] || 0) + 1
        })

        const rec = combined.filter(item => {
            const type = item._type
            return favTypes[type] && !user.favoritos.find(fav => fav.id === item.id && fav.title === item.title)
        })
        
        return rec.length > 0 ? rec.slice(0, 12) : combined.slice(0, 12)
    }, [combined, user])

    const ItemCard = ({ item }) => (
        <div className="novedades-card">
            <img src={item.poster} alt={item.title} />
            <div className="card-info">
                <h4>{item.title}</h4>
                <p className="tipo">{item._type}</p>
                <div className="card-meta">
                    <span className="match">↥ {item._trending} pts</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="novedades-wrapper">
            <div className="novedades-container">
                <h2>Novedades Populares</h2>
                <p className="subtitle">Descubre lo más reciente, trending y recomendado para ti</p>
                
                <div className="novedades-tabs">
                    <button className={tab === 'recientes' ? 'active' : ''} onClick={() => setTab('recientes')}>Más recientes</button>
                    <button className={tab === 'trending' ? 'active' : ''} onClick={() => setTab('trending')}>Trending</button>
                    <button className={tab === 'recomendaciones' ? 'active' : ''} onClick={() => setTab('recomendaciones')}>Para ti</button>
                </div>

                <div className="novedades-content">
                    {tab === 'recientes' && (
                        <div className="novedades-grid">
                            {recientes.map(item => (
                                <ItemCard key={`${item.id || item.title}`} item={item} />
                            ))}
                        </div>
                    )}

                    {tab === 'trending' && (
                        <div className="novedades-grid">
                            {trending.map(item => (
                                <ItemCard key={`${item.id || item.title}`} item={item} />
                            ))}
                        </div>
                    )}

                    {tab === 'recomendaciones' && (
                        <div className="novedades-grid">
                            {recomendaciones.length === 0 ? (
                                <p className="empty">No hay recomendaciones disponibles. Agrega favoritos para recibir recomendaciones personalizadas.</p>
                            ) : (
                                recomendaciones.map(item => (
                                    <ItemCard key={`${item.id || item.title}`} item={item} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Novedades
