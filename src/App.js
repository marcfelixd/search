import React from 'react';
import SearchEngine from './components/SearchEngine';
import { ThemeProvider } from './styles/theme';

function App() {
  return (
    <ThemeProvider>
      <SearchEngine />
    </ThemeProvider>
  );
}

export default App;
