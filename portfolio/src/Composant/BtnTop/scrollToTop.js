import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    if (scrollPosition > 1.3 * window.innerHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton && (
        <i
          id='Scroll_icon'
          className="fa-solid fa-arrow-up"
          onClick={scrollToTop}
        ></i>
      )}
    </>
   
  );
};

export default ScrollButton;
