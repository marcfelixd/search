import React from 'react';
import { Sun, Moon } from 'lucide-react';
import themes from '../styles/colors';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="flex space-x-2 items-center">
      {Object.keys(themes).filter(theme => theme !== 'dark').map((themeName) => (
        <button
          key={themeName}
          onClick={() => onThemeChange(themeName)}
          className={`w-6 h-6 rounded-full ${currentTheme === themeName ? 'ring-2 ring-offset-2' : ''}`}
          style={{ backgroundColor: themes[themeName].primary }}
          aria-label={`Thème ${themeName}`}
        />
      ))}
      <button
        onClick={() => onThemeChange(currentTheme === 'dark' ? 'red' : 'dark')}
        className="w-6 h-6 flex items-center justify-center"
        aria-label="Basculer le mode sombre"
      >
        {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default ThemeSelector;