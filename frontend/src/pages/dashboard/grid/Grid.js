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
          width: 1200,
          height: 675,
      }}>
        {numbers}
      </div>
    );
  };
  
  export default Grid;