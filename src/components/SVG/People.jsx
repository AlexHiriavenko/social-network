import React from "react";

function SVGPeople({color}) {

  const svgColor = color ? color : '#212121';

    return (
            <svg 
                fill="none" 
                height="20" 
                viewBox="0 0 20 20" 
                width="20" 
                xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 10C12.1046 10 13 10.8954 13 12V13.5C13 15.5544 10.912 17 7.5 17C4.08805 17 2 15.5544 2 13.5V12C2 10.8954 2.89543 10 4 10H11ZM16 10C17.1046 10 18 10.8954 18 12V12.5C18 14.5886 16.4317 16 13.5 16C13.3587 16 13.2206 15.9967 13.0856 15.9902C13.625 15.3625 13.9439 14.6041 13.9932 13.7387L14 13.5V12C14 11.3081 13.7658 10.6709 13.3723 10.1634L13.2353 9.99912L16 10ZM7.5 2C9.433 2 11 3.567 11 5.5C11 7.433 9.433 9 7.5 9C5.567 9 4 7.433 4 5.5C4 3.567 5.567 2 7.5 2ZM14.5 4C15.8807 4 17 5.11929 17 6.5C17 7.88071 15.8807 9 14.5 9C13.1193 9 12 7.88071 12 6.5C12 5.11929 13.1193 4 14.5 4Z" fill={svgColor}/>
                </svg> 
  );
}

export default SVGPeople;