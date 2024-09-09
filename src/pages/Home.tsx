import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper core comp

// Import Swiper modules
import SwiperCore from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Home: React.FC = () => {
    const [publications, setPublications] = useState<any[]>([]);
    const ORCID_ID = '0000-0003-4925-4725';

    const carouselImages = [
        { src: '/c1.jpg', link: 'projects/undermattressvalidation', alt: 'Under-Mattress Sensor Validation' },
        { src: '/c2.jpg', link: '/BP-Predict', alt: 'Blood pressure predictor' },
    ];

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                const works = data.group.map((work: any) => {
                    return {
                        type: work['work-summary'][0]?.type || '',
                        title: work['work-summary'][0]?.title?.title?.value || '',
                        journal: work['work-summary'][0]?.['journal-title']?.value || '',
                        link: work['work-summary'][0]?.url?.value || '',
                        year: work['work-summary'][0]?.['publication-date']?.year?.value || '',
                        date: new Date(work['work-summary'][0]?.['publication-date']?.year?.value || '')
                    };
                });
                // Filter for journal-article
                const journalArticles = works.filter((work: { type: string; }) => work.type === 'journal-article');
                setPublications(journalArticles);
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };

        fetchPublications();
    }, []);

    return (
        <div style={{ color: '#333', margin: '0', padding: '0', boxSizing: 'border-box' }}>
            {/* Navbar */}
            <header style={{ position: 'fixed', width: '100%', top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255)', padding: '10px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <nav className="navbar navbar-expand-md navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Jack Manners</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle" href="/"
                                        id="projectsDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"
                                    >Projects</a>
                                    <ul className="dropdown-menu" aria-labelledby="projectsDropdown">
                                        <li><Link className="dropdown-item" to="projects/undermattressvalidation ">Under-Mattress Sensor Validation (TBC)</Link></li>
                                        <li><Link className="dropdown-item" to="/project2">Project 2</Link></li>
                                        <li><Link className="dropdown-item" to="/project3">Project 3</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="mailto:jack.manners@flinders.edu.au">Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Bio Section */}
            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '100px 20px 40px', minHeight: '60vh' }}>
                <div style={{ maxWidth: '50%' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>About Me</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        I am a research associate at the Adelaide Institute for Sleep Health / FHMRI: Sleep Health working on 
                        the management and improvement of sleep and sleep disorders. My specific research interests focus on the
                        use of novel and/or consumer technologies to simplify and improve the diagnosis and management of sleep
                        disorders and better understand markers of risk.
                        <br/>
                    </p>
                    <p>
                        <a href={`https://orcid.org/${ORCID_ID}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', marginRight: '10px' }}>ORCID</a>
                        <br/>
                        <a href="https://researchnow.flinders.edu.au/en/persons/jack-manners" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', marginRight: '10px' }}>ResearchNow</a>
                        <br/>
                        <a href="https://www.linkedin.com/in/jack-manners-671062184/" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', marginRight: '10px' }}>LinkedIn</a>
                        <br/>
                        <a href="https://github.com/jackmanners" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', marginRight: '10px' }}>GitHub</a>
                        <br/>
                    </p>
                </div>
                <div style={{ maxWidth: '40%' }}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 10000 }}
                        pagination={{ clickable: true }}
                    >
                        {carouselImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Link to={image.link}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        style={{
                                            width: '100%',      // Full width within the div
                                            height: '300px',    // Fixed height
                                            objectFit: 'cover', // Ensures aspect ratio is maintained
                                            display: 'block',   // Ensures the image is a block element
                                            margin: '0 auto',   // Centers the image
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Research Section */}
            <section style={{ backgroundColor: '#f0f0f0', padding: '40px 20px', minHeight: '40vh' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '30px' }}>Research and Publications</h2>
                <div style={{ maxWidth: '80%', margin: '0 auto', height: '300px', overflowY: 'auto', padding: '10px', backgroundColor: '#e6e6e6', borderRadius: '10px', position: 'relative' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {publications.length > 0 ? (
                            publications.map((pub, index) => (
                                <li key={index} style={{ marginBottom: '15px' }}>
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none', fontSize: '1.1rem' }}>
                                        <strong>{pub.journal}</strong> ({pub.year}): {pub.title}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>Loading publications...</li>
                        )}
                    </ul>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', borderTop: '1px solid #ccc' }}>
                <p style={{ color: '#333' }}>&copy; {new Date().getFullYear()} Jack Manners</p>
            </footer>
        </div>
    );
};

export default Home;
