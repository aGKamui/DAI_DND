import React, { useState } from 'react';
import './Popup.css';
import './Grid.css';
import Draggable from "react-draggable";

import Grid from "./Grid.js"


const PopupRight = ({imagem}) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle = {
    backgroundImage: `url(${imagem})`,
    width: 50,
    height: 50,
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleStart = (e, data) => {
    console.log(e, data);
  };
  const handleDrag = (e, data) => {
    console.log(e, data);
  };
  const handleStop = (e, data) => {
    console.log(e, data);
  };
  
/* {isOpen && (
        <div className="popup-overlay-right">
         
          <div className="popup-content-right">
            <h2>Eliminar Token ?</h2>
            <button  >Sim</button>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div> */

  return (
    
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[51, 51]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
          <div
          className="handle" 
          onContextMenu={togglePopup}       
          style={
            containerStyle
          }/>  
      </Draggable>
        

      
  );
};

export default PopupRight;