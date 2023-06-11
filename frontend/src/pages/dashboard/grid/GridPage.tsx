import React from "react";
import Draggable from "react-draggable";
import $ from "jquery";
import Grid from "./Grid";
import "./Grid.css"

import { useState, useEffect } from 'react';
import PopupRight from "./popup-right.js";
import Popup from "./popup";
import PopupBackground from "./popup-background";

export default function App() {
  const [tokens, setTokens] = useState([<PopupRight imagem={"https://cdn.discordapp.com/attachments/1072285447537037333/1115304718399459328/token_1_1.png"}  />]);

  const [background, setBackground] = useState("https://cdn.discordapp.com/attachments/912106609235357756/1115607247440060457/TC_Bandit_Hideout_01_Caverns_Free_34x22.jpg");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  

  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };


  

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  const changeBackground = (url) => {
    setBackground(url)
    togglePopup()
  };

  const removeToken = (index) => {
    setTokens((tokens)=> {
      const newList = [...tokens];
      newList[index] = "   ";
      return newList;})
    
    };
  
  
  const addToken = (url) => {
    setTokens((tokens) => [...tokens, <PopupRight imagem={url}  />])
  };

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent the default context menu from opening
    };

    // Add event listener to the window
    window.addEventListener('contextmenu', handleContextMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);


  
  return (
     <div >

<div className="tool-bar" >

Tool Bar 


<div ><Popup desc_Botao={"Roll"}></Popup></div>


<div>
      <button className="roll" onClick={togglePopup2}>Add</button>
      {isOpen2 && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Criar Token</h2>
            <p>Insira aqui o URL para criar o token</p>
           
            
            <div><input type="text" value={inputValue2} onChange={handleInputChange2} /></div>

            <div>

            
            <button type="submit" onClick={()=>addToken(inputValue2)}>Confirmar</button>
            <button onClick={togglePopup2}>Close</button>
            </div>
            
          </div>
        </div>
      )}
    </div>

<div>
      <button className="roll" onClick={togglePopup}>Background</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Alterar o background</h2>
            <p>Insira aqui o URL do mapa pretendido</p>
           
            
            <div><input type="text" value={inputValue} onChange={handleInputChange} /></div>

            <div>

            
            <button type="submit" onClick={()=>changeBackground(inputValue)}>Confirmar</button>
            <button onClick={togglePopup}>Close</button>
            </div>
            
          </div>
        </div>
      )}
    </div>







</div>

      <div 
        className="grid" 
        style={{
            width: 1200,
            height: 715,
      }}>


      <Grid count= {336}
      backgroundURL= {background}>
      </Grid>

      
      
      
    <div style={{
            display:"inline-flex",
      }} >{tokens.map((token, index) => (
        <div style={{
          width: 50,
          height: 50

    }}
      
    key={index}>          
     
          <span onContextMenuCapture  ={()=>removeToken(index)}>{token}</span>
          </div>
      ))}
      </div>
      


      </div>

    <div className="tool-box"></div>
      

  
    </div>
   
    
    
  );
}