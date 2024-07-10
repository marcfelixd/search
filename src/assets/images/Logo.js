import React from 'react';

const Logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" className="w-full max-w-lg">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
        `}
      </style>
      <text 
        x="50%" 
        y="50%" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="60" 
        fontWeight="bold" 
        textAnchor="middle" 
        dominantBaseline="central" 
        letterSpacing="2"
      >
        <tspan fill="#CF2C29">S</tspan>
        <tspan fill="#E04B48">F</tspan>
        <tspan fill="#B01E1B">R</tspan>
        <tspan fill="#F17573">s</tspan>
        <tspan fill="#8F1210">e</tspan>
        <tspan fill="#D33D3A">a</tspan>
        <tspan fill="#A72320">r</tspan>
        <tspan fill="#E55F5D">c</tspan>
        <tspan fill="#991715">h</tspan>
      </text>
    </svg>
);

export default Logo;
