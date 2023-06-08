import React from "react";
import "./Grid.css"
import Popup from "./popup.js";
const ToolBar = () => {

    return(

        <div className="tool-bar" >

            Tool Bar 


            <Popup desc_Botao={"Roll"}></Popup>
            <Popup desc_Botao={"Add"}></Popup>
            <Popup desc_Botao={"Remove"}></Popup>
            <Popup desc_Botao={"Background"}></Popup>
            
            
            
            

            


        </div>
    )


}
export default ToolBar;