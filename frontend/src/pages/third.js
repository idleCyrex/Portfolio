import React, { useEffect, useRef, useState } from 'react';
import lm from './../img/laptopmobile.png';
import { useInView } from 'react-intersection-observer';

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};

const SpinnerSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="16"
    height="16"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle
      strokeDasharray="164.93361431346415 56.97787143782138"
      r="35"
      strokeWidth="20"
      stroke="#ffffff"
      fill="none"
      cy="50"
      cx="50"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const CheckSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 22.903 19.395">
    <path
      d="M22.903 2.828 20.075 0 6.641 13.435 3.102 9.09 0 11.616l6.338 7.779L22.903 2.828z"
      fill="#ffffff"
    />
  </svg>
);

const Third = () => {
  const birthday = '2006-08-15';
  const age = calculateAge(birthday);
  const lineRef = useRef(null);

  // useInView hook for About section
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // useInView hook for Contact section
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Form state for loading and success
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      comment: formData.get('comment'),
    };

    try {
      const response = await fetch('https://backend.idlee.xyz/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        event.target.reset();
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2500);
    }
  };

  return (
    <div>
      <div className='lmwrapper' id='about2'>
        <img src={lm} alt="Laptop and Mobile" />
      </div>

      <div className="thirdwrapper" id='about'>
        <div className='tarjnaurhau'>
          <div className="thirdtitle">
            <span ref={aboutRef} className={`about ${aboutInView ? 'visible animate__animated animate__fadeIn' : ''}`}>About</span>
            <div className='line' ref={lineRef}></div>
          </div>
          <div className='cardaboutwarp'>
            <div className={`thirdabout ${aboutInView ? 'visible animate__animated animate__fadeIn' : ''}`}>
              <span>Hey there, I'm Alex, a {age} yo coding enthusiast from Romania but currently based in Belgium! I've been diving into the world of programming for three years now, specializing in backend development and frontend development.</span>
            </div>
          </div>
        </div>
        <div className='contactwrapper2'>
          <div className='contactwrapper'>
            <div className='cardaboutwarp'>
              <div className="container-card">
                <div className="thirdtitle2">
                  <span ref={contactRef} className={`contact ${contactInView ? 'visible animate__animated animate__fadeIn' : ''}`}>Contact</span>
                  <div className='smalltextthird'>
                    <span>Discuss Your Website Vision with Us!</span>
                  </div>
                </div>
                <form
                  className={`form-container ${contactInView ? 'visible animate__animated animate__fadeIn' : ''}`}
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="input-group">
                    <input placeholder=" " type="text" id="name" name="name" required disabled={loading || success} />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-group">
                    <input placeholder=" " type="email" id="email" name="email" required disabled={loading || success} />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-group">
                    <textarea placeholder=" " id="comment" name="comment" rows="5" required disabled={loading || success}></textarea>
                    <label htmlFor="comment">Comment</label>
                  </div>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <SpinnerSVG />
                    ) : success ? (
                      <CheckSVG />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Third;