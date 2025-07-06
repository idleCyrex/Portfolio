import React, { useEffect, useState } from 'react';
import logo from './../img/idlelogo.png';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile nav after clicking on a link
    setMobileNavOpen(false);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div className={`navbarwrapper navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbarleft">
        <img src={logo} alt="Logo" />
        <a onClick={() => scrollToSection('home')}>Home</a>
        <a onClick={() => scrollToSection('about')}>About</a>
        <a onClick={() => scrollToSection('projects')}>Projects</a>
      </div>
      <div className="navbarright">
        <a onClick={() => scrollToSection('about')}>
          <button className="button">Get Started</button>
        </a>
      </div>
      <div className='hamburger'>
        <input type="checkbox" id="checkbox" checked={mobileNavOpen} onChange={toggleMobileNav} />
        <label htmlFor="checkbox" className="toggle">
          <div className="bars" id="bar1"></div>
          <div className="bars" id="bar2"></div>
          <div className="bars" id="bar3"></div>
        </label>
      </div>
      <div className={`mobile-nav ${mobileNavOpen ? 'visible' : ''}`}>
        <div className="nav-links">
          <a onClick={() => { scrollToSection('home'); toggleMobileNav(); }}>Home</a>
          <a onClick={() => { scrollToSection('about2'); toggleMobileNav(); }}>About</a>
          <a onClick={() => { scrollToSection('projects'); toggleMobileNav(); }}>Projects</a>
          <a onClick={() => scrollToSection('about')}>
            <button className="button">Get Started</button>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
