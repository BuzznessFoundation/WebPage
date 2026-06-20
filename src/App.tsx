import './App.css'

function App() {
    return (
        <>
            <header>
                <nav className="container navbar">
                    <h1>Cristián Alvarado</h1>

                    <ul>
                        <li><a href="#services">Servicios</a></li>
                        <li><a href="#projects">Proyectos</a></li>
                        <li><a href="#about">Sobre mí</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </nav>
            </header>

            <main className="container">
                {/* Hero */}
                <section>
                    <h2>Automatizaciones, IA y desarrollo de software</h2>
                    <p>
                        Creo soluciones con IA, n8n, Python y desarrollo web
                        para transformar procesos manuales en sistemas escalables.
                    </p>
                </section>

                {/* Secciones futuras */}
                <section id="services"></section>

                <section id="projects"></section>

                <section id="about"></section>

                <section id="contact"></section>
            </main>
        </>
    )
}

export default App