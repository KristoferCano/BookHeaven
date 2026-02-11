import React, { useState, useEffect } from 'react'
import '../styles/modal.css'

function EditComicModal({ isOpen, onClose, onEdit, comicItem }) {
    const [formData, setFormData] = useState({
        title: '',
        match: 85,
        age: '16+',
        duration: '120 min',
        genres: ['Drama'],
        description: '',
        poster: '',
        backdrop: ''
    })

    const [genreInput, setGenreInput] = useState('')

    useEffect(() => {
        if (comicItem) {
            setFormData({
                title: comicItem.title || '',
                match: comicItem.match || 85,
                age: comicItem.age || '16+',
                duration: comicItem.duration || '120 min',
                genres: comicItem.genres || ['Drama'],
                description: comicItem.description || '',
                poster: comicItem.poster || '',
                backdrop: comicItem.backdrop || ''
            })
        }
    }, [comicItem])

    if (!isOpen || !comicItem) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const data = new FormData()
        data.append('nombre', formData.title)
        data.append('descripcion', formData.description)
        data.append('genres', JSON.stringify(formData.genres))
        data.append('match', formData.match)
        data.append('age', formData.age)
        data.append('duration', formData.duration)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comics/${comicItem.id}`, {
                method: 'PUT',
                body: data
            })

            if (!response.ok) {
                throw new Error('Error al actualizar cómico')
            }

            const updatedComic = {
                ...comicItem,
                ...formData
            }
            onEdit(updatedComic)
            
            // Notificar al dashboard para actualizar
            localStorage.setItem('dashboardUpdate', Date.now().toString())
            
            onClose()
        } catch (error) {
            console.error(error)
            alert('Error al actualizar el cómico')
        }
    }

    const handleGenreAdd = () => {
        if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
            setFormData(prev => ({
                ...prev,
                genres: [...prev.genres, genreInput.trim()]
            }))
            setGenreInput('')
        }
    }

    const handleGenreRemove = (genreToRemove) => {
        setFormData(prev => ({
            ...prev,
            genres: prev.genres.filter(genre => genre !== genreToRemove)
        }))
    }

    return (
        <div className="modal-overlay">
            <div className="modal modal--edit">
                <div className="modal__header">
                    <h2 className="modal__title">Editar Cómico</h2>
                    <button className="modal__close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal__form">
                    <div className="modal__form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                        />
                    </div>
                    
                    <div className="modal__form-row">
                        <div className="modal__form-group">
                            <label htmlFor="match">Coincidencia (%)</label>
                            <input
                                type="number"
                                id="match"
                                min="0"
                                max="100"
                                value={formData.match}
                                onChange={(e) => setFormData(prev => ({ ...prev, match: parseInt(e.target.value) }))}
                            />
                        </div>
                        
                        <div className="modal__form-group">
                            <label htmlFor="age">Clasificación</label>
                            <select
                                id="age"
                                value={formData.age}
                                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                            >
                                <option value="7+">7+</option>
                                <option value="13+">13+</option>
                                <option value="16+">16+</option>
                                <option value="18+">18+</option>
                            </select>
                        </div>
                        
                        <div className="modal__form-group">
                            <label htmlFor="duration">Duración</label>
                            <input
                                type="text"
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                            />
                        </div>
                    </div>
                    
                    <div className="modal__form-group">
                        <label>Géneros</label>
                        <div className="modal__genre-input">
                            <input
                                type="text"
                                value={genreInput}
                                onChange={(e) => setGenreInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleGenreAdd()
                                    }
                                }}
                                placeholder="Agregar género..."
                            />
                            <button type="button" onClick={handleGenreAdd} className="modal__genre-add">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal__genres">
                            {formData.genres.map((genre, index) => (
                                <span key={index} className="modal__genre-tag">
                                    {genre}
                                    <button type="button" onClick={() => handleGenreRemove(genre)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="modal__form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows="5"
                        />
                    </div>
                    
                    <div className="modal__form-row">
                        <div className="modal__form-group">
                            <label htmlFor="poster">URL Poster</label>
                            <input
                                type="url"
                                id="poster"
                                value={formData.poster}
                                onChange={(e) => setFormData(prev => ({ ...prev, poster: e.target.value }))}
                            />
                        </div>
                        
                        <div className="modal__form-group">
                            <label htmlFor="backdrop">URL Backdrop</label>
                            <input
                                type="url"
                                id="backdrop"
                                value={formData.backdrop}
                                onChange={(e) => setFormData(prev => ({ ...prev, backdrop: e.target.value }))}
                            />
                        </div>
                    </div>
                    
                    <div className="modal__actions">
                        <button type="button" className="modal__btn modal__btn--secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="modal__btn modal__btn--primary">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditComicModal
