import React from "react";
import Draggable from "react-draggable";
import $ from "jquery";
import Grid from "./Grid";
import "./Grid.css"




export default function App() {
  const handleStart = (e, data) => {
    console.log(e, data);
  };
  const handleDrag = (e, data) => {
    console.log(e, data);
  };
  const handleStop = (e, data) => {
    console.log(e, data);
  };

  

  
  return (

    
    <div >
      <div 
        className="grid" 
        style={{
            width: 1200,
            height: 675,
      }}>
      <Grid count= {336}>

      </Grid>
      </div>




  <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[(window.innerWidth/30), 50]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div 
        className="handle"         
        style={{
          width: 50,
          height: 50,
        }}/>  
      

      </Draggable>
    </div>

    
    
  );
}