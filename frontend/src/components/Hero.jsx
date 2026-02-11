import React from 'react'
import '../styles/hero.css'

function Hero() {
    return (
        <section className="hero">
            <div className="hero__background">
                <img src="https://picsum.photos/seed/hero/1920/1080" alt="Hero" />
                <div className="hero__gradient"></div>
            </div>
            
            <div className="hero__content">
                <div className="hero__info">
                    <h1 className="hero__title">Don Quijote de la Mancha</h1>
                    <div className="hero__meta">
                        <span className="hero__match">98% Coincidencia</span>
                        <span className="hero__year">1605</span>
                        <span className="hero__age">16+</span>
                        <span className="hero__seasons">800 - 1500 paginas</span>
                        <span className="hero__quality">HD</span>
                    </div>
                    <p className="hero__description">
                       Alonso Quijano es un hombre tranquilo que busca en los libros de caballerías un mundo que admira. Pero de tanto leer historias de guerreros, batallas, princesas, gigantes, dragones y encantadores, cae en la locura de creer que son ciertas.
                    </p>
                    <div className="hero__buttons">
                        <button className="hero__button hero__button--play">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19 1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H5V3h14v14zm-7-2h6v-2h-6v2zm0-4h6V9h-6v2zm0-4h6V5h-6v2z" fill="black"/>
                            </svg>
                            Leer ahora
                        </button>
                        <button className="hero__button hero__button--info">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                                <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Más información
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero