import React from "react";




const Grid = ({ count }) => {
    const numbers = [];
  
    for (let i = 1; i <= count; i++) {
      numbers.push(<div className="grid-item"></div>);
    }
  
    return (
      <div 
        className="grid-container"
        style={{
          width: 1225,
          height: 715,
      }}>
        {numbers}
      </div>
    );
  };
  
  export default Grid;