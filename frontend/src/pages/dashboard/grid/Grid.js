import React from "react";
import PopupRight from "./popup-right.js";
import { useState } from "react";



export const Grid = ({ count }) => {
   
  

  const numbers = [];
    
   
  


    for (let i = 1; i <= count; i++) {
      numbers.push(<div className="grid-item"></div>);
    };
    
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
        
        

      </div>
    );
  };
  
  export default Grid;