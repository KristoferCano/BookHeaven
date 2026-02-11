import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

function Header({
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    user,
    onOpenLogin,
    onOpenRegister,
    onLogout
}) {
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
                {/* LEFT */}
                <div className="header__left">
                    <Link to="/" className="header__logo">
                        <h3>BookHeaven</h3>
                    </Link>

                    <nav className="header__nav">
                        <Link to="/">Inicio</Link>
                        <Link to="/biblioteca">Biblioteca</Link>
                        <Link to="/novedades">Novedades</Link>
                        <Link to="/mi-lista">Mi lista</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </nav>
                </div>

                {/* RIGHT */}
                <div className="header__right">
                    <Link to="/buscar" className="header__search">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </Link>

                    <button className="header__notifications">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>

                    {/* PROFILE */}
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
                                    Mi biblioteca
                                </Link>

                                <Link to="/perfil" className="profile-menu__item">
                                    Perfil
                                </Link>

                                <Link to="/configuracion" className="profile-menu__item">
                                    Configuración
                                </Link>

                                <div className="profile-menu__divider"></div>

                                <button
                                    className="profile-menu__logout"
                                    onClick={handleLogoutClick}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>

                    {/* MOBILE BUTTON */}
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

            {/* MOBILE NAV */}
            <div className={`header__mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <Link to="/">Inicio</Link>
                <Link to="/biblioteca">Biblioteca</Link>
                <Link to="/novedades">Novedades</Link>
                <Link to="/mi-lista">Mi lista</Link>
                <Link to="/buscar">Buscar</Link>
                <Link to="/dashboard">Dashboard</Link>

                {!user && (
                    <>
                        <div className="mobile-divider"></div>

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                onOpenLogin()
                            }}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                onOpenRegister()
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
