import React from 'react';
import Navbar from '../components/navbar';

function First() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="home">
            <Navbar />

            <div className="firstwrapper">
                <div className="firstleft">
                    <span className="title">idle</span>
                    <span className="subtitle">We bring your dream website to life.</span>
                </div>
                <div className="cardswrapper">
                    <div className="card">
                        <div className="cardtitle">
                            <div className="globewrapper">
                                <i className="fas fa-database"></i>
                            </div>
                            <span>Backend</span>
                        </div>
                        <div className="cardtext">
                            <span>The backend of a website handles server-side logic and database management.</span>
                        </div>
                        <div className="learn-more" onClick={scrollToAbout}>Learn more</div>
                    </div>
                    <div className="card">
                        <div className="cardtitle">
                            <div className="globewrapper">
                                <i className="fas fa-code"></i>
                            </div>
                            <span>Frontend</span>
                        </div>
                        <div className="cardtext">
                            <span>The frontend of a website manages user interface and client-side interactions.</span>
                        </div>
                        <div className="learn-more" onClick={scrollToAbout}>Learn more</div>
                    </div>
                    <div className="card">
                        <div className="cardtitle">
                            <div className="globewrapper">
                                <i className="fas fa-palette"></i>
                            </div>
                            <span>UI/UX</span>
                        </div>
                        <div className="cardtext">
                            <span>UI/UX design focuses on user interface aesthetics and user experience optimization.</span>
                        </div>
                        <div className="learn-more" onClick={scrollToAbout}>Learn more</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default First;
