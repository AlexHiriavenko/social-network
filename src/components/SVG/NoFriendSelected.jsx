import React from "react";

function SVGNoFrienSelected({colorTheme}) {
  
  const svgColor = colorTheme === 'dark' ? '#bcc0c4' : '#a4a7ab';
  const svgColorsecond = colorTheme === 'dark' ? '#7a7d81' : "#64676b";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112">
        <defs>
          <clipPath id="a">
            <circle cx="72.58" cy="53.81" r="12.08" fill="none"/>
          </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <circle cx="72.58" cy="53.81" r="12.08" fill="#1876f2"/>
          <circle cx="62.18" cy="40.55" r="14.72" fill={svgColor}/>
          <circle cx="88.92" cy="39.27" r="14.72" fill={svgColor}/>
        </g>
        <path d="M27.37 17.56h11.3a3.84 3.84 0 013.84 3.84v15h-19v-15a3.84 3.84 0 013.86-3.84z"/>
        <rect width="19" height="24.75" x="23.52" y="26.9" fill="#90c3ff" rx="8.65"/>
        <path fill={svgColor} d="M18.87 55.28h28.3a7 7 0 017 7v37.36H11.92V62.23a7 7 0 016.95-6.95z"/>
        <path fill={svgColorsecond} d="M68.63 68.28h5.06A26.12 26.12 0 0199.8 94.4v5.25H42.51V94.4a26.12 26.12 0 0126.12-26.12z"/>
        <circle cx="66.32" cy="35.2" r="7.55" fill={svgColor}/>
      </svg>
  );
}

export default SVGNoFrienSelected;