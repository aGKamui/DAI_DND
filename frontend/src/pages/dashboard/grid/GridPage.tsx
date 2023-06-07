import React from "react";
import Draggable from "react-draggable";
import $ from "jquery";
import Grid from "./Grid";
import "./Grid.css"
import ToolBar from "./ToolBar";




export default function App() {
  
  

  
  return (

    
    <div >

      <ToolBar></ToolBar>

      <div 
        className="grid" 
        style={{
            width: 1200,
            height: 715,
      }}>


      <Grid count= {336}>
      </Grid>
      </div>

    <div className="tool-box"></div>
      

  
    </div>
   
    
    
  );
}