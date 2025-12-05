// src/App.tsx
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import MoviesPage from './pages/MoviesPage';
import CurrencyPage from './pages/CurrencyPage';

type Page = 'home' | 'weather' | 'movies' | 'currency';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  const goHome = () => setPage('home');

  return (
    <div>
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'weather' && <WeatherPage onNavigate={goHome} />}
      {page === 'movies' && <MoviesPage onNavigate={goHome} />}
      {page === 'currency' && <CurrencyPage onNavigate={goHome} />}
    </div>
  );
};

export default App;

