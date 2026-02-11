import React, { useEffect, useState } from 'react'
import '../styles/dashboard.css'

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [lastUpdate, setLastUpdate] = useState(new Date())

    // Función para obtener datos del dashboard
    const fetchDashboardData = async (showLoadingState = true) => {
        if (showLoadingState) setLoading(true)
        setIsRefreshing(true)
        
        try {
            const response = await fetch('http://localhost:8000/api/dashboard/stats')
            
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos del dashboard')
            }

            const data = await response.json()
            setDashboardData(data)
            setLastUpdate(new Date())
        } catch (err) {
            console.error('Error al obtener datos del dashboard:', err)
            // Usar datos de ejemplo si falla la API
            setDashboardData({
                libros: 2,
                comics: 5,
                mangas: 1,
                usuarios: 2,
                total_contenido: 8,
                distribucion: {
                    libros: 2,
                    comics: 5,
                    mangas: 1
                },
                ultimos: {
                    libros: [
                        {
                            id: 2,
                            nombre: "yo",
                            descripcion: "adidjaidj",
                            autor: "yo",
                            imagen: "portadas/ATReptPYLMa7QEmNdNoB13Pbu4xpX4yYqmG1H9bN.png",
                            pdf: "pdfs/RX9fUa8Dm5lFI414fRyg10tkE9FF0kt7c1cYL572.pdf",
                            created_at: "2026-02-06T20:02:52.000000Z",
                            updated_at: "2026-02-06T20:02:52.000000Z"
                        },
                        {
                            id: 1,
                            nombre: "Blue lock",
                            descripcion: "hhhh",
                            autor: "ego",
                            imagen: "portadas/uGolqsLxZz3TT3aIgm5SsRGfdPjxRv4Hs2su653C.png",
                            pdf: "pdfs/5XlhDNl8fQps2Vb5jcFvavFQreMv4zsG77wcTUxk.pdf",
                            created_at: "2026-02-04T18:01:29.000000Z",
                            updated_at: "2026-02-04T18:01:29.000000Z"
                        }
                    ],
                    comics: [
                        {
                            id: 1,
                            nombre: "Comic\r\n",
                            descripcion: "Comic\r\n",
                            autor: "Yo",
                            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXDi46B4P-9MxJAb2uHgOg-HmOfffBaS38nype5ozHVKboFF1jldeEw1TLeE0L6znklY&usqp=CAU",
                            pdf: "pdf/1gMHArMKa4Vr5ORCsP9pF5OecoKtoTZIepSTtntX.pdf",
                            created_at: null,
                            updated_at: null
                        },
                        {
                            id: 2,
                            nombre: "Comic2",
                            descripcion: "Comic2",
                            autor: "yo",
                            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf0VZvan4PVuOYkG5A6v8llyFW-Nkvduf8Wei6WXDYQHH-8yP5XBI3jWpWiTB62IK0cL8&usqp=CAU",
                            pdf: "pdf/1gMHArMKa4Vr5ORCsP9pF5OecoKtoTZIepSTtntX.pdf",
                            created_at: null,
                            updated_at: null
                        }
                    ],
                    mangas: [
                        {
                            id: 1,
                            nombre: "Yo",
                            descripcion: "wue3heuwe",
                            autor: "yo",
                            imagen: "portadas/K1pm0Gcv2qEOvwiAAXq1k4fNMsLPaiqGfX0a4ndO.png",
                            pdf: "pdfs/swK0ai2ra03woUHrGo24pRUeogBYwcUVKjuolkCp.pdf",
                            created_at: "2026-02-06T20:44:14.000000Z",
                            updated_at: "2026-02-06T20:44:14.000000Z"
                        }
                    ]
                }
            })
            setLastUpdate(new Date())
        } finally {
            setLoading(false)
            setIsRefreshing(false)
        }
    }

    // Carga inicial y polling periódico
    useEffect(() => {
        // Cargar datos inicialmente
        fetchDashboardData(true)

        // Configurar polling cada 15 segundos
        const pollInterval = setInterval(() => {
            fetchDashboardData(false)
        }, 15000)

        // Limpiar interval al desmontar
        return () => clearInterval(pollInterval)
    }, [])

    // Escuchar eventos de actualización desde localStorage
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'dashboardUpdate') {
                fetchDashboardData(false)
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Cargando dashboard...</p>
            </div>
        )
    }

    if (!dashboardData) {
        return <div className="dashboard-error">No hay datos disponibles</div>
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible'
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                {/* Encabezado */}
                <div className="dashboard__header">
                    <div className="dashboard__header-top">
                        <h1 className="dashboard__title">Dashboard</h1>
                        <div className="dashboard__header-controls">
                            <p className="dashboard__last-update">
                                Actualizado: {lastUpdate.toLocaleTimeString('es-ES')}
                            </p>
                            <button 
                                className={`dashboard__refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                                onClick={() => fetchDashboardData(false)}
                                disabled={isRefreshing}
                                title="Actualizar datos"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Actualizar
                            </button>
                        </div>
                    </div>
                    <p className="dashboard__subtitle">Resumen de contenido y estadísticas</p>
                </div>

                {/* Tarjetas de estadísticas principales */}
                <div className="dashboard__stats">
                    <div className="stat-card stat-card--libros">
                        <div className="stat-card__icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 17m0 0C6.933 17 7.357 16.917 7.75 16.763M20 8V7c0-1.1-.9-2-2-2h-2.75c-.413 0-.806.057-1.184.165M20 8H3.75m0 0V5.25C3.75 4.006 4.756 3 6 3h11.25c1.243 0 2.25 1.006 2.25 2.25V8M3.75 17c-.413 0-.806-.057-1.184-.165" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="stat-card__content">
                            <p className="stat-card__label">Libros</p>
                            <h3 className="stat-card__value">{dashboardData.libros}</h3>
                        </div>
                    </div>

                    <div className="stat-card stat-card--comics">
                        <div className="stat-card__icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M6 6H18M6 12H18M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="stat-card__content">
                            <p className="stat-card__label">Cómics</p>
                            <h3 className="stat-card__value">{dashboardData.comics}</h3>
                        </div>
                    </div>

                    <div className="stat-card stat-card--mangas">
                        <div className="stat-card__icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                            </svg>
                        </div>
                        <div className="stat-card__content">
                            <p className="stat-card__label">Mangas</p>
                            <h3 className="stat-card__value">{dashboardData.mangas}</h3>
                        </div>
                    </div>

                    <div className="stat-card stat-card--usuarios">
                        <div className="stat-card__icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="stat-card__content">
                            <p className="stat-card__label">Usuarios</p>
                            <h3 className="stat-card__value">{dashboardData.usuarios}</h3>
                        </div>
                    </div>

                    <div className="stat-card stat-card--total">
                        <div className="stat-card__icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                            </svg>
                        </div>
                        <div className="stat-card__content">
                            <p className="stat-card__label">Total Contenido</p>
                            <h3 className="stat-card__value">{dashboardData.total_contenido}</h3>
                        </div>
                    </div>
                </div>

                {/* Sección de distribución */}
                <div className="dashboard__section">
                    <h2 className="dashboard__section-title">Distribución de Contenido</h2>
                    <div className="distribution-chart">
                        <div className="chart-item">
                            <div className="chart-bar">
                                <div 
                                    className="chart-bar__fill chart-bar__fill--libros"
                                    style={{ height: `${(dashboardData.distribucion.libros / dashboardData.total_contenido) * 100}%` }}
                                ></div>
                            </div>
                            <p className="chart-label">Libros</p>
                            <p className="chart-value">{dashboardData.distribucion.libros}</p>
                        </div>
                        <div className="chart-item">
                            <div className="chart-bar">
                                <div 
                                    className="chart-bar__fill chart-bar__fill--comics"
                                    style={{ height: `${(dashboardData.distribucion.comics / dashboardData.total_contenido) * 100}%` }}
                                ></div>
                            </div>
                            <p className="chart-label">Cómics</p>
                            <p className="chart-value">{dashboardData.distribucion.comics}</p>
                        </div>
                        <div className="chart-item">
                            <div className="chart-bar">
                                <div 
                                    className="chart-bar__fill chart-bar__fill--mangas"
                                    style={{ height: `${(dashboardData.distribucion.mangas / dashboardData.total_contenido) * 100}%` }}
                                ></div>
                            </div>
                            <p className="chart-label">Mangas</p>
                            <p className="chart-value">{dashboardData.distribucion.mangas}</p>
                        </div>
                    </div>
                </div>

                {/* Sección de últimos contenidos */}
                <div className="dashboard__section">
                    <h2 className="dashboard__section-title">Últimas Adiciones</h2>
                    
                    {/* Últimos Libros */}
                    {dashboardData.ultimos.libros.length > 0 && (
                        <div className="content-category">
                            <h3 className="content-category__title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 17m0 0C6.933 17 7.357 16.917 7.75 16.763M20 8V7c0-1.1-.9-2-2-2h-2.75c-.413 0-.806.057-1.184.165M20 8H3.75m0 0V5.25C3.75 4.006 4.756 3 6 3h11.25c1.243 0 2.25 1.006 2.25 2.25V8M3.75 17c-.413 0-.806-.057-1.184-.165" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Libros
                            </h3>
                            <div className="content-grid">
                                {dashboardData.ultimos.libros.map(libro => (
                                    <div key={libro.id} className="content-card">
                                        <div className="content-card__image">
                                            <img src={`http://localhost:8000/storage/${libro.imagen}`} alt={libro.nombre} />
                                            <div className="content-card__overlay">
                                                <button className="content-card__btn">Ver Detalles</button>
                                            </div>
                                        </div>
                                        <div className="content-card__info">
                                            <h4 className="content-card__title">{libro.nombre}</h4>
                                            <p className="content-card__author">{libro.autor}</p>
                                            <p className="content-card__date">{formatDate(libro.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Últimos Cómics */}
                    {dashboardData.ultimos.comics.length > 0 && (
                        <div className="content-category">
                            <h3 className="content-category__title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M6 6H18M6 12H18M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Cómics
                            </h3>
                            <div className="content-grid">
                                {dashboardData.ultimos.comics.map(comic => (
                                    <div key={comic.id} className="content-card">
                                        <div className="content-card__image">
                                            <img src={comic.imagen} alt={comic.nombre} />
                                            <div className="content-card__overlay">
                                                <button className="content-card__btn">Ver Detalles</button>
                                            </div>
                                        </div>
                                        <div className="content-card__info">
                                            <h4 className="content-card__title">{comic.nombre.trim()}</h4>
                                            <p className="content-card__author">{comic.autor}</p>
                                            <p className="content-card__date">{formatDate(comic.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Últimos Mangas */}
                    {dashboardData.ultimos.mangas.length > 0 && (
                        <div className="content-category">
                            <h3 className="content-category__title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                                </svg>
                                Mangas
                            </h3>
                            <div className="content-grid">
                                {dashboardData.ultimos.mangas.map(manga => (
                                    <div key={manga.id} className="content-card">
                                        <div className="content-card__image">
                                            <img src={`http://localhost:8000/storage/${manga.imagen}`} alt={manga.nombre} />
                                            <div className="content-card__overlay">
                                                <button className="content-card__btn">Ver Detalles</button>
                                            </div>
                                        </div>
                                        <div className="content-card__info">
                                            <h4 className="content-card__title">{manga.nombre}</h4>
                                            <p className="content-card__author">{manga.autor}</p>
                                            <p className="content-card__date">{formatDate(manga.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
