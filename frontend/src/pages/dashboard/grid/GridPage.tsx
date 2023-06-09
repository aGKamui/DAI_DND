import React from "react";
import Draggable from "react-draggable";
import $ from "jquery";
import Grid from "./Grid";
import "./Grid.css"
import ToolBar from "./ToolBar";
import { useState, useEffect } from 'react';
import PopupRight from "./popup-right.js";
import Popup from "./popup";

export default function App() {
  const [tokens, setTokens] = useState([<PopupRight id ="1" /> , <PopupRight id ="2"/>, <PopupRight id ="3"/>]);

  const removeToken = (index) => {
    setTokens((tokens)=> {
      const newList = [...tokens];
      newList[index] = "   ";
      return newList;})
    
    };
  
  
  const addToken = () => {
    setTokens((tokens) => [...tokens, <PopupRight id ="1" />])
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
<div onClick={addToken}><Popup desc_Botao={"Add"}></Popup></div>
<div><Popup desc_Botao={"Remove"}></Popup></div>
<div><Popup desc_Botao={"Background"}></Popup></div>








</div>

      <div 
        className="grid" 
        style={{
            width: 1200,
            height: 715,
      }}>


      <Grid count= {336}>
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