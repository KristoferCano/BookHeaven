import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

function Header({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, user, onOpenLogin, onOpenRegister, onLogout }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const profileMenuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleProfileClick = () => {
        if (user) {
            setShowProfileMenu(!showProfileMenu)
        } else {
            onOpenLogin()
        }
    }

    const handleLogoutClick = () => {
        onLogout()
        setShowProfileMenu(false)
    }

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header__content">
                <div className="header__left">
                    <Link to="/" className="header__logo">
                       <h3>BookHeaven</h3>
                    </Link>
                    
                    <nav className="header__nav">
                        <Link to="/">Inicio</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/biblioteca">Libros</Link>
                        <Link to="/novedades">Novedades populares</Link>
                        <Link to="/mi-lista">Mi lista</Link>
                    </nav>
                </div>

                <div className="header__right">
                    <button className="header__search">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    <button className="header__notifications">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    <div className="header__profile" ref={profileMenuRef}>
                        <button 
                            className="header__profile-button"
                            onClick={handleProfileClick}
                        >
                            <img src="https://picsum.photos/seed/profile/32/32" alt="Perfil" />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>

                        {showProfileMenu && user && (
                            <div className="header__profile-menu">
                                <div className="profile-menu__header">
                                    <p className="profile-menu__name">{user.name}</p>
                                    <p className="profile-menu__email">{user.email}</p>
                                </div>
                                <div className="profile-menu__divider"></div>
                                <Link to="/biblioteca" className="profile-menu__item">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M21 3V13H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Mi biblioteca
                                </Link>
                                <Link to="/perfil" className="profile-menu__item">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 13C15.3137 13 18 10.3137 18 7C18 3.68629 15.3137 1 12 1C8.68629 1 6 3.68629 6 7C6 10.3137 8.68629 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Perfil
                                </Link>
                                <Link to="/configuracion" className="profile-menu__item">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M10 6H7C5.89543 6 5 6.89543 5 8V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M19 3V13H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Configuración
                                </Link>
                                <div className="profile-menu__divider"></div>
                                <button 
                                    className="profile-menu__logout"
                                    onClick={handleLogoutClick}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.1046 12.1046 19 11 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H11C12.1046 5 13 5.89543 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        className="header__mobile-menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <div className={`header__mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <Link to="/">Inicio</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/biblioteca">Libros</Link>
                <Link to="/novedades">Novedades populares</Link>
                <Link to="/mi-lista">Mi lista</Link>
                <Link to="/buscar">Explorar por idiomas</Link>
                {!user && (
                    <>
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', margin: '10px 0' }}></div>
                        <button 
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                onOpenLogin()
                            }}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'white', 
                                cursor: 'pointer',
                                padding: '10px 0',
                                textAlign: 'left'
                            }}
                        >
                            Iniciar sesión
                        </button>
                        <button 
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                onOpenRegister()
                            }}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'white', 
                                cursor: 'pointer',
                                padding: '10px 0',
                                textAlign: 'left'
                            }}
                        >
                            Crear cuenta
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header