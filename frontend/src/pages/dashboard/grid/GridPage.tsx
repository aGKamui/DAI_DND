import React from "react";
import Draggable from "react-draggable";

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
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 150, y: 0 }}
      position={null}
      grid={[150, 150]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div>
        <div className="handle">Drag from here</div>
        <div>Drag me.</div>
      </div>
      

    </Draggable>
    

    
  );
}