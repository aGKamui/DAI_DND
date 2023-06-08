import React from "react";
import Draggable from "react-draggable";



const Grid = ({ count }) => {
    const numbers = [];

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
  
    return (


      <div 
        className="grid-container"
        style={{
          width: 1224,
          height: 714,
      }}>
        
        {numbers}
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
        style={{
          width: 50,
          height: 50,
        }}/>  
      

      </Draggable>
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
        style={{
          width: 50,
          height: 50,
        }}/>  
      

      </Draggable>
      </div>
    );
  };
  
  export default Grid;