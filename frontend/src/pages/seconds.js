import React, { useState, useEffect, useRef } from 'react';
import shaorma from './../img/shaorma.png';
import cheire from './../img/cheire.png';
import doctor from './../img/doctor.png';
import portfolio from './../img/portfolio.png';
import 'animate.css';

const PROJECTS = [
    {
        key: 'shaorma',
        title: 'ShaormaClicker',
        description: 'A game made in pure JavaScript as a challenge.',
        type: 'GAMES',
        img: shaorma,
        alt: 'ShaormaClicker',
        onClick: () => window.location.href = 'https://drive.google.com/uc?id=10lkeb0gB3oVRQ2J_SupDDtob_VzT-cj6&export=download'
    },
    {
        key: 'cherie',
        title: 'CherieFamily',
        description: 'A site made using React.js.',
        type: 'SITES',
        img: cheire,
        alt: 'CherieFamily',
        onClick: () => window.location.href = 'https://www.cheriefamily.com/'
    },
    {
        key: 'dentist',
        title: 'Dentist',
        description: 'A site built with React.js and Express.js.',
        type: 'SITES',
        img: doctor,
        alt: 'Dentist',
        onClick: () => window.location.href = 'https://dentist.idlee.xyz/'
    },
    {
        key: 'portfolio',
        title: 'Portfolio',
        description: 'A site built with React.js and Express.js.',
        type: 'SITES',
        img: portfolio,
        alt: 'Portfolio',
        onClick: () => window.location.href = 'https://idlee.xyz/'
    }
];

function Second() {
    const [filter, setFilter] = useState('ALL');
    const [animatedFilter, setAnimatedFilter] = useState(null);
    const lineRef = useRef(null);
    const spanRef = useRef(null);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setAnimatedFilter(newFilter);
    };

    useEffect(() => {
        if (animatedFilter) {
            const timer = setTimeout(() => {
                setAnimatedFilter(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [animatedFilter]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible', 'animate__animated', 'animate__fadeIn');
                } else {
                    entry.target.classList.remove('visible', 'animate__animated', 'animate__fadeIn');
                }
            },
            { threshold: 0.1 }
        );

        if (lineRef.current) {
            observer.observe(lineRef.current);
        }

        if (spanRef.current) {
            observer.observe(spanRef.current);
        }

        return () => {
            if (lineRef.current) {
                observer.unobserve(lineRef.current);
            }

            if (spanRef.current) {
                observer.unobserve(spanRef.current);
            }
        };
    }, []);

    const filters = ['ALL', 'GAMES', 'SITES'];

    const filteredProjects = filter === 'ALL'
        ? PROJECTS
        : PROJECTS.filter(project => project.type === filter);

    return (
        <div className="second" id="projects">
            <div className="custom-shape-divider-top-1718364798">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className='secondwrapper'>
                <div className='sectitlewrap'>
                    <div className='sectitle'>
                        <span ref={spanRef}>Projects</span>
                        <div className='line' ref={lineRef}></div>
                    </div>
                    <div className='secfilter'>
                        {filters.map(f => (
                            <React.Fragment key={f}>
                                <a
                                    className={`${filter === f ? 'active' : ''} ${animatedFilter === f ? 'animate__animated animate__rubberBand' : ''}`}
                                    onClick={() => handleFilterChange(f)}
                                >
                                    {f}
                                </a>
                                {f !== filters[filters.length - 1] && <span>|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className='cardswrapper12'>
                    <div className="cards">
                        {filteredProjects.map(project => (
                            <div className="cardss red" key={project.key} onClick={project.onClick}>
                                <div className='cardsimgwrap'>
                                    <img src={project.img} alt={project.alt} />
                                </div>
                                <div className='cardstxtwrap'>
                                    <p className="tip">{project.title}<br />
                                        <span className="second-text">{project.description}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1718364649">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
}

export default Second;
