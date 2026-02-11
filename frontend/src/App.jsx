import React, { useState, useEffect } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import BookRow from './components/BookRow'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import NuestraHistoria from './pages/NuestraHistoria'
import Perfil from './pages/Perfil'
import Buscar from './pages/Buscar'
import Biblioteca from './pages/Biblioteca'
import CreateBookModal from './components/CreateBookModal'
import EditBookModal from './components/EditBookModal'
import CreateMangaModal from './components/CreateMangaModal'
import EditMangaModal from './components/EditMangaModal'
import CreateComicModal from './components/CreateComicModal'
import EditComicModal from './components/EditComicModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import Toast from './components/Toast'
import Configuracion from './pages/Configuracion'
import MiLista from './pages/MiLista'
import Novedades from './pages/Novedades'

function App() {
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [books, setBooks] = useState({ popular: [] })
    const [mangas, setMangas] = useState({ popular: [] })
    const [comics, setComics] = useState({ popular: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showCreateMangaModal, setShowCreateMangaModal] = useState(false)
    const [showCreateComicModal, setShowCreateComicModal] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)
    const [showEditMangaModal, setShowEditMangaModal] = useState(false)
    const [showEditComicModal, setShowEditComicModal] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [selectedBook, setSelectedBook] = useState(null)
    const [selectedManga, setSelectedManga] = useState(null)
    const [selectedComic, setSelectedComic] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    // Auth state
    const [user, setUser] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)

    // Toast state
    const [toasts, setToasts] = useState([])

    /* ===============================
       EFECTO SCROLL HEADER
    =============================== */
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* ===============================
       VERIFICAR USUARIO AL CARGAR
    =============================== */
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (err) {
                console.error('Error al leer usuario almacenado:', err)
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }
        }
    }, [])

    /* ===============================
       FETCH LIBROS (try / catch)
    =============================== */
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/libros')

            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de libros')
            }

            const data = await response.json()

            const adaptedBooks = data.map(libro => ({
                id: libro.id,
                title: libro.nombre,
                poster: `http://localhost:8000/storage/${libro.imagen}`,
                backdrop: `http://localhost:8000/storage/${libro.imagen}`,
                description: libro.descripcion,
                genres: [libro.autor],
                match: 100,
                age: 'PDF',
                duration: 'Libro digital',
                pdf: libro.pdf
            }))

            setBooks({ popular: adaptedBooks })
        } catch (err) {
            console.error('Error al consumir la API:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    /* ===============================
       FETCH MANGAS
    =============================== */
    const fetchMangas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/mangas')

            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de mangas')
            }

            const data = await response.json()

            const adaptedMangas = data.map(manga => ({
                id: manga.id,
                title: manga.nombre,
                poster: `http://localhost:8000/storage/${manga.imagen}`,
                backdrop: `http://localhost:8000/storage/${manga.imagen}`,
                description: manga.descripcion,
                genres: [manga.autor],
                match: 100,
                age: 'Manga',
                duration: 'PDF',
                pdf: manga.pdf
            }))

            setMangas({ popular: adaptedMangas })
        } catch (err) {
            console.error('Error al obtener mangas:', err)
        }
    }

    useEffect(() => {
        fetchMangas()
    }, [])

    /* ===============================
       FETCH CÓMICS
    =============================== */
    const fetchComics = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/comics')

            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de cómics')
            }

            const data = await response.json()

            const adaptedComics = data.map(comic => ({
                id: comic.id,
                title: comic.nombre,
                poster: `http://localhost:8000/storage/${comic.imagen}`,
                backdrop: `http://localhost:8000/storage/${comic.imagen}`,
                description: comic.descripcion,
                genres: [comic.autor],
                match: 100,
                age: 'Cómico',
                duration: 'PDF',
                pdf: comic.pdf
            }))

            setComics({ popular: adaptedComics })
        } catch (err) {
            console.error('Error al obtener cómics:', err)
        }
    }

    useEffect(() => {
        fetchComics()
    }, [])

    const handleCreateBook = (category) => {
        setSelectedCategory(category)
        setShowCreateModal(true)
    }

    const handleCreateManga = (category) => {
        setSelectedCategory(category)
        setShowCreateMangaModal(true)
    }

    const handleCreateComic = (category) => {
        setSelectedCategory(category)
        setShowCreateComicModal(true)
    }

    const handleEditBook = (book) => {
        setSelectedBook(book)
        setShowEditModal(true)
    }

    const handleEditManga = (manga) => {
        setSelectedManga(manga)
        setShowEditMangaModal(true)
    }

    const handleEditComic = (comic) => {
        setSelectedComic(comic)
        setShowEditComicModal(true)
    }

    const handleDeleteBook = (book) => {
        setSelectedBook(book)
        setShowDeleteModal(true)
    }

    const handleDeleteManga = (manga) => {
        setSelectedManga(manga)
        setShowDeleteModal(true)
    }

    const handleDeleteComic = (comic) => {
        setSelectedComic(comic)
        setShowDeleteModal(true)
    }

    const handleCreate = (newBook) => {
        // Refrescar la lista de libros del servidor
        fetchBooks()
    }

    const handleCreateMangaSuccess = (newManga) => {
        // Refrescar la lista de mangas del servidor
        fetchMangas()
    }

    const handleCreateComicSuccess = (newComic) => {
        // Refrescar la lista de cómics del servidor
        fetchComics()
    }

    const handleEdit = (updatedBook) => {
        // Refrescar la lista de libros del servidor
        fetchBooks()
    }

    const handleEditMangaSuccess = (updatedManga) => {
        // Refrescar la lista de mangas del servidor
        fetchMangas()
    }

    const handleEditComicSuccess = (updatedComic) => {
        // Refrescar la lista de cómics del servidor
        fetchComics()
    }

    const handleDelete = async () => {
        let deleteUrl = ''

        if (selectedBook) {
            deleteUrl = `http://localhost:8000/api/libros/${selectedBook.id}`
        } else if (selectedManga) {
            deleteUrl = `http://localhost:8000/api/mangas/${selectedManga.id}`
        } else if (selectedComic) {
            deleteUrl = `http://localhost:8000/api/comics/${selectedComic.id}`
        }

        if (!deleteUrl) {
            setShowDeleteModal(false)
            return
        }

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!response.ok) {
                throw new Error('Error al eliminar')
            }

            // Refrescar los datos después de eliminar
            if (selectedBook) {
                fetchBooks()
            } else if (selectedManga) {
                fetchMangas()
            } else if (selectedComic) {
                fetchComics()
            }
        } catch (error) {
            console.error('Error al eliminar:', error)
            alert('Error al eliminar el elemento')
        } finally {
            setShowDeleteModal(false)
        }
    }

    /* ===============================
       HANDLERS AUTH
    =============================== */
    const addToast = (message, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    const handleLoginSuccess = (userData) => {
        setUser(userData)
        setShowLoginModal(false)
        addToast(`¡Bienvenido ${userData.name}! Sesión iniciada correctamente`, 'success')
    }

    const handleRegisterSuccess = (userData) => {
        setUser(userData)
        setShowRegisterModal(false)
        addToast(`¡Cuenta creada exitosamente! Bienvenido ${userData.name}`, 'success')
    }

    const handleLogout = () => {
        const userName = user?.name
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        addToast(`${userName}, has cerrado sesión correctamente`, 'info')
    }

    /* ===============================
       RENDER
    =============================== */
    if (loading) {
        return (
            <div style={{ color: '#654321', padding: '40px', textAlign: 'center' }}>
                Cargando libros...
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ color: '#8B4513', padding: '40px', textAlign: 'center' }}>
                Error: {error}
            </div>
        )
    }

    return (
        <div className="app">
            {location.pathname !== '/nuestra-historia' && location.pathname !== '/perfil' && location.pathname !== '/configuracion' && (
                <Header
                    isScrolled={isScrolled}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    user={user}
                    onOpenLogin={() => setShowLoginModal(true)}
                    onOpenRegister={() => setShowRegisterModal(true)}
                    onLogout={handleLogout}
                />
            )}

            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/nuestra-historia" element={<NuestraHistoria />} />
                <Route path="/perfil" element={<Perfil user={user} onLogout={handleLogout} />} />
                <Route path="/buscar" element={<Buscar books={books.popular} mangas={mangas.popular} comics={comics.popular} />} />
                <Route path="/configuracion" element={<Configuracion user={user} setUser={setUser} />} />
                <Route path="/biblioteca" element={<Biblioteca user={user} setUser={setUser} books={books.popular} mangas={mangas.popular} comics={comics.popular} />} />
                <Route path="/mi-lista" element={<MiLista user={user} setUser={setUser} books={books.popular} mangas={mangas.popular} comics={comics.popular} />} />
                <Route path="/novedades" element={<Novedades user={user} books={books.popular} mangas={mangas.popular} comics={comics.popular} />} />
                <Route path="/*" element={(
                    <>
                        <Hero />

                        <div className="content">
                            <BookRow
                                title="Libros populares"
                                Books={books.popular}
                                autoPlay
                                autoPlayInterval={4000}
                                infiniteScroll
                                onCreateBook={() => handleCreateBook('popular')}
                                onEditBook={handleEditBook}
                                onDeleteBook={handleDeleteBook}
                            />

                            <BookRow
                                title="Mangas populares"
                                Books={mangas.popular}
                                autoPlay
                                autoPlayInterval={4000}
                                infiniteScroll
                                onCreateBook={() => handleCreateManga('popular')}
                                onEditBook={handleEditManga}
                                onDeleteBook={handleDeleteManga}
                            />

                            <BookRow
                                title="Comics populares"
                                Books={comics.popular}
                                autoPlay
                                autoPlayInterval={4000}
                                infiniteScroll
                                onCreateBook={() => handleCreateComic('popular')}
                                onEditBook={handleEditComic}
                                onDeleteBook={handleDeleteComic}
                            />
                        </div>

                        <Footer />
                    </>
                )} />
            </Routes>

            {/* MODALES LIBROS */}
            <CreateBookModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreate}
            />

            <EditBookModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onEdit={handleEdit}
                Books={selectedBook}
            />

            {/* MODALES MANGAS */}
            <CreateMangaModal
                isOpen={showCreateMangaModal}
                onClose={() => setShowCreateMangaModal(false)}
                onCreate={handleCreateMangaSuccess}
            />

            <EditMangaModal
                isOpen={showEditMangaModal}
                onClose={() => setShowEditMangaModal(false)}
                onEdit={handleEditMangaSuccess}
                mangaItem={selectedManga}
            />

            {/* MODALES CÓMICOS */}
            <CreateComicModal
                isOpen={showCreateComicModal}
                onClose={() => setShowCreateComicModal(false)}
                onCreate={handleCreateComicSuccess}
            />

            <EditComicModal
                isOpen={showEditComicModal}
                onClose={() => setShowEditComicModal(false)}
                onEdit={handleEditComicSuccess}
                comicItem={selectedComic}
            />

            {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                movieTitle={selectedBook?.title || selectedManga?.title || selectedComic?.title}
            />

            {/* MODALES AUTH */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
                onError={(msg) => addToast(msg, 'error')}
                onOpenRegister={() => {
                    setShowLoginModal(false)
                    setShowRegisterModal(true)
                }}
            />

            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegisterSuccess={handleRegisterSuccess}
                onError={(msg) => addToast(msg, 'error')}
                onOpenLogin={() => {
                    setShowRegisterModal(false)
                    setShowLoginModal(true)
                }}
            />

            {/* TOASTS NOTIFICATIONS */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default App