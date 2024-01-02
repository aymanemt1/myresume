import React, { useState, useEffect } from 'react';

const ScrollProgressBar = ({onScrollWidthChange}) => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
    onScrollWidthChange(scrolled);

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [onScrollWidthChange]);

  const progressBarStyle = {
    width: `${scrollWidth}%`,
    height: '17px', 
    boxShadow: "0 20px 50px 5px #d7abff6e",
    backgroundColor: '#6856E0', 
  };

 
  return (
  <div
  style={{
    position: 'fixed',
    top: 0,
    left: 6,
    width: '100%',
    zIndex: '999',
    transformOrigin: 'top left',
    transform: 'rotate(90deg)'
  }}
>
  <div id="myBar" style={progressBarStyle}></div>
</div>

  );
};

export default ScrollProgressBar;
