import React from 'react'
import '../styles/modal.css'

function DeleteConfirmModal({ isOpen, onClose, onConfirm, movieTitle }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal modal--delete">
                <div className="modal__header">
                    <h2 className="modal__title">Confirmar Eliminación</h2>
                    <button className="modal__close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
                
                <div className="modal__content">
                    <div className="modal__icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#e50914" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    
                    <p className="modal__message">
                        ¿Estás seguro de que deseas eliminar <strong>"{movieTitle}"</strong>?
                    </p>
                    <p className="modal__submessage">
                        Esta acción no se puede deshacer.
                    </p>
                </div>
                
                <div className="modal__actions">
                    <button className="modal__btn modal__btn--secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="modal__btn modal__btn--danger" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal