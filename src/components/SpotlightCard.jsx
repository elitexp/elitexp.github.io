/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
/* eslint-enable no-unused-vars */
import './SpotlightCard.css';

function SpotlightCard({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  imgSrc = '',
  imgAlt = '',
  title = ''
}) {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {imgSrc && (
        <img 
          className="skill-logo" 
          src={imgSrc} 
          alt={imgAlt}
        />
      )}
      {title && (
        <div className="skill-title">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export default SpotlightCard;
