import React, { useState } from 'react';
import './Popup.css';
import './Grid.css';


const PopupBackground = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {changeBackground}  = props.changeBackground 

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="roll" onClick={togglePopup}>{props.desc_Botao}</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Alterar o background</h2>
            <p>Insira aqui o URL do mapa pretendido</p>
            <div><input id="background" name='background'></input></div>

            <div>
            <button onClick={changeBackground}>Confirmar</button>
            <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupBackground;