import React from "react";
import Draggable from "react-draggable";
import $ from "jquery";

import "./Grid.css"


function createGrid(x) {
  for (var rows = 0; rows < x; rows++) {
      for (var columns = 0; columns < x; columns++) {
          $("#container").append("<div class='grid'></div>");
      };
  };
  $(".grid").width(960/x);
  $(".grid").height(960/x);
};

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

    
    <div className="grid-container">







  <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[(window.innerWidth/30)-0.5, 51]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div>
        <div className="handle"></div>  
        </div>
      

      </Draggable>
    </div>

    
    
  );
}