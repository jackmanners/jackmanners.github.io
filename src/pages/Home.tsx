import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper core comp

// Import Swiper modules
import SwiperCore from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaArrowDown } from 'react-icons/fa'; // Add an icon for the arrow


// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Home: React.FC = () => {
    const [publications, setPublications] = useState<any[]>([]);
    const ORCID_ID = '0000-0003-4925-4725';

    const sectionRefs = useRef<(HTMLElement | null)[]>([]); // Store refs to each section

    const carouselImages = [
        { src: '/snpblk.png', link: 'https://yawnlabs.app/', alt: 'YawnLabs' },
        { src: '/asr.jpg', link: 'https://www.flinders.edu.au/sleep-revolution', alt: "Australia's Sleep Revolution" },
        { src: '/wsa.jpg', link: 'projects/undermattressvalidation', alt: 'Under-Mattress Sensor validation' },
        { src: '/bp.jpg', link: '/BP-Predict', alt: 'Blood pressure prediction' },
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

    // Function to scroll to the next section
    const scrollToNextSection = (index: number) => {
        if (sectionRefs.current[index + 1]) {
            sectionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ color: '#333', margin: '0', padding: '0', boxSizing: 'border-box' }}>
            {/* Navbar */}
            <header style={{ position: 'fixed', width: '100%', top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255)', padding: '2px 12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
                <nav className="navbar navbar-expand-md navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Jack Manners</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                {/* <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle" href="/"
                                        id="projectsDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"
                                    >Projects</a>
                                    <ul className="dropdown-menu" aria-labelledby="projectsDropdown">
                                        {carouselImages.map((image, index) => (
                                            <li key={index}>
                                                <Link className="dropdown-item" to={image.link}>{image.alt}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li> */}
                                <li className="nav-item">
                                    <a className="nav-link" href="mailto:jack.manners@flinders.edu.au">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Bio Section */}
            <section ref={(el) => (sectionRefs.current[0] = el)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 20px 40px', minHeight: '100vh' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div style={{ maxWidth: '50%', margin: 'auto', padding: '20px', borderRadius: '8px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>About Me</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            I am a research associate at the Adelaide Institute for Sleep Health / FHMRI: Sleep Health working on 
                            the management and improvement of sleep and sleep disorders. My specific research interests focus on the
                            use of novel and/or consumer technologies to simplify and improve the diagnosis and management of sleep
                            disorders and better understand markers of risk.
                        </p>

                        {/* Links with logos */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-evenly',
                            alignItems: 'center', marginTop: '20px', padding: '16px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px', boxShadow: 'inset 4px 4px 4px rgba(0,0,0,0.1)'
                        }}>
                            <h4>
                                Find me:
                            </h4>
                            <a href="https://researchnow.flinders.edu.au/en/persons/jack-manners" target="_blank" rel="noopener noreferrer">
                                <img src="/flinders.png" alt="ResearchNow" style={{ width: '136.47px', height: '40px', marginRight: '10px' }} />
                            </a>
                            <a href={`https://orcid.org/${ORCID_ID}`} target="_blank" rel="noopener noreferrer">
                                <img src="/Orcid.svg" alt="ORCID" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            </a>
                            <a href="https://github.com/jackmanners" target="_blank" rel="noopener noreferrer">
                                <img src="/Github.svg" alt="GitHub" style={{ width: '40px', height: '40px' }} />
                            </a>
                            <a href="https://x.com/mannersjack" target="_blank" rel="noopener noreferrer">
                                <img src="/Twitter.svg" alt="Twitter/X" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            </a>
                            <a href="https://www.linkedin.com/in/jack-manners-671062184/" target="_blank" rel="noopener noreferrer">
                                <img src="/Linkedin.svg" alt="LinkedIn" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            </a>
                        </div>
                    </div>

                    <div style={{ maxWidth: '40%' }}>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            loop={true}
                            navigation
                            autoplay={{ delay: 10000 }}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Navigation]}
                        >
                            {carouselImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <Link to={image.link} target='_blank'>
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
                </div>

                {/* Scroll to Next Section */}
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <FaArrowDown style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={() => scrollToNextSection(0)} />
                </div>
            </section>

            {/* Research Section */}
            <section ref={(el) => (sectionRefs.current[1] = el)} style={{ backgroundColor: '#f0f0f0', padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '30px'}}>Research and Publications</h2>
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
            
            <footer ref={(el) => (sectionRefs.current[2] = el)} style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', borderTop: '1px solid #ccc', height: '5vh' }}>
                <h6 style={{ color: '#333' }}>&copy; {new Date().getFullYear()} Jack Manners</h6>
            </footer>
        </div>
    );
};

export default Home;
