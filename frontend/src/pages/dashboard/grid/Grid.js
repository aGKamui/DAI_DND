import React from "react";
import PopupRight from "./popup-right.js";



const Grid = ({ count }) => {
    const numbers = [];
    let tokens = [ <PopupRight id ="1" /> , <PopupRight id ="2"/>, <PopupRight id ="3"/>, <PopupRight id ="4"/>, <PopupRight id ="5"/>, <PopupRight id ="6"/>];

   
    const removeToken = (id,tokens) => {
      console.log(id)
      //tokens = tokens.filter(item => item.id !== id);
      
    };
  


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
        {tokens}
        

      </div>
    );
  };
  
  export default Grid;