import React from "react";

function SVGNext({color}) {
  
  const svgColor = color ? color : '#212121';

    return (
            <svg 
                fill="none" 
                height="30" 
                viewBox="0 0 20 20" 
                width="30" 
                xmlns="http://www.w3.org/2000/svg"
                >
                   <path d="M12.2197 6.03033C11.9268 5.73744 11.9268 5.26256 12.2197 4.96967C12.5126 4.67678 12.9874 4.67678 13.2803 4.96967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.2803 15.0303C12.9874 15.3232 12.5126 15.3232 12.2197 15.0303C11.9268 14.7374 11.9268 14.2626 12.2197 13.9697L16.1893 10L12.2197 6.03033Z" fill={svgColor}/>
                </svg> 
  );
}

export default SVGNext;