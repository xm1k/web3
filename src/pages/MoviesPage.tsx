// src/pages/MoviesPage.tsx
import React, { useEffect, useState } from 'react';

interface Movie {
  id: string;
  title: string;
  release_date: string;
  description: string;
}

const MoviesPage: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://ghibliapi.vercel.app/films');
      if (!res.ok) throw new Error('Ошибка загрузки фильмов');
      const data: Movie[] = await res.json();
      setMovies(data.slice(0, 6));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <h1 className="title">🎬 Популярные фильмы</h1>

      <div className="card-grid">
        {loading && <p>⏳ Загрузка...</p>}
        {error && <p>⚠️ {error}</p>}
        {!loading && !error &&
          movies.map(movie => (
            <div key={movie.id} className="card">
              <h2>{movie.title}</h2>
              <p>Год: {movie.release_date}</p>
              <p style={{ fontSize: '0.9rem' }}>
                {movie.description.slice(0, 100)}...
              </p>
            </div>
          ))
        }
      </div>

      <div className="buttons">
        <button onClick={loadMovies}>🔄 Обновить</button>
        <button onClick={onNavigate}>🏠 На главную</button>
      </div>
    </div>
  );
};

export default MoviesPage;

