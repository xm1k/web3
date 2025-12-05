// src/pages/HomePage.tsx
import React from 'react';

interface Props {
  onNavigate: (page: 'weather' | 'movies' | 'currency') => void;
}

const HomePage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="container">
      <h1 className="title">WEB LAB 2.0</h1>
      <nav className="nav-links">
        <button className="nav-btn" onClick={() => onNavigate('weather')}>
          Погода
        </button>
        <button className="nav-btn" onClick={() => onNavigate('movies')}>
          Фильмы
        </button>
        <button className="nav-btn" onClick={() => onNavigate('currency')}>
          Курс валют
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
