import React from "react";




const Grid = ({ count }) => {
    const numbers = [];
  
    for (let i = 1; i <= count; i++) {
      numbers.push(<div className="grid-item"></div>);
    }
  
    return (
      <div className="grid-container">
        {numbers}
      </div>
    );
  };
  
  export default Grid;