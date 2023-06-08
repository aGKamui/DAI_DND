import React, { useState } from 'react';
import './Popup.css';
import './Grid.css';

const Popup = ({desc_Botao}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="roll" onClick={togglePopup}>{desc_Botao}</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;