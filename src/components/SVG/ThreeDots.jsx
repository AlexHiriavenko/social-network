import React from "react";

function SVGThreeDots({color}) {

  const fillColor = color ? color : "#212121";
  
  return (
    <svg 
        fill={color}
        height="20" 
        viewBox="0 0 122.88 29.96"
        width="20" 
        xmlns="http://www.w3.org/2000/svg"
        >
            <path  d="M0,15A15,15,0,1,1,15,30,15,15,0,0,1,0,15Zm92.93,0a15,15,0,1,1,15,15,15,15,0,0,1-15-15ZM46.46,15a15,15,0,1,1,15,15,15,15,0,0,1-15-15Z"/>
        </svg> 
    );
}

export default SVGThreeDots;

