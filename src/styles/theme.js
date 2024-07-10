import React, { createContext, useContext, useState } from 'react';
import themes from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('blue');

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, colors: themes[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);