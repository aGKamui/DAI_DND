import React from "react";
import Draggable from "react-draggable";
import Popup from "./popup-right.js";



const Grid = ({ count }) => {
    const numbers = [];
    let tokens = [ <Popup/>, <Popup/>, <Popup/>, <Popup/>, <Popup/>, <Popup/>];

    const handleStart = (e, data) => {
      console.log(e, data);
    };
    const handleDrag = (e, data) => {
      console.log(e, data);
    };
    const handleStop = (e, data) => {
      console.log(e, data);
    };
  
  
    for (let i = 1; i <= count; i++) {
      numbers.push(<div className="grid-item"></div>);
    }
    
    //Função para ir buscar à base de dados tokens
    //Varredura aqui
    //Mete tudo para o array tokens
    //Baam já tá

    return (


      <div 
        className="grid-container"
        style={{
          width: 1224,
          height: 714,
      }}>
        
        {numbers}
        {tokens}
        

      </div>
    );
  };
  
  export default Grid;