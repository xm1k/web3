// src/pages/WeatherPage.tsx
import React, { useEffect, useState } from 'react';

interface City {
  id: string;
  name: string;
  lat: number | null;
  lon: number | null;
}

interface Weather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

const cities: City[] = [
  { id: 'nn', name: 'Нижний Новгород', lat: 56.2965, lon: 43.9361 },
  { id: 'spb', name: 'Санкт-Петербург', lat: 59.9386, lon: 30.3141 },
  { id: 'msk', name: 'Москва', lat: 55.7558, lon: 37.6176 },
  { id: 'mars', name: 'Марс 🪐', lat: null, lon: null },
];

const getWeatherEmoji = (code: number) => {
  if ([0].includes(code)) return '☀️';
  if ([1, 2].includes(code)) return '🌤';
  if ([3].includes(code)) return '☁️';
  if ([45, 48].includes(code)) return '🌫';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧';
  if ([71, 73, 75].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈';
  return '🌡';
};

const WeatherPage: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [weatherData, setWeatherData] = useState<Record<string, string>>({});

  const loadWeather = async () => {
    const newData: Record<string, string> = {};

    for (const city of cities) {
      if (city.name.includes('Марс')) {
        newData[city.id] = `
          <div class="weather-temp">🪐 −63°C</div>
          <p>💨 Ветер: 30 м/с</p>
          <p>🌫 Пыльная буря</p>
        `;
        continue;
      }

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        );
        if (!res.ok) throw new Error('Ошибка загрузки');

        const data: { current_weather: Weather } = await res.json();
        const w = data.current_weather;

        newData[city.id] = `
          <div class="weather-temp">${getWeatherEmoji(w.weathercode)} ${w.temperature}°C</div>
          <p>💨 Ветер: ${w.windspeed} км/ч</p>
          <p>🕒 ${new Date(w.time).toLocaleString('ru-RU')}</p>
        `;
      } catch (err: any) {
        newData[city.id] = `⚠️ ${err.message}`;
      }
    }

    setWeatherData(newData);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <div className="weather-page">
      <h1 className="title">🌦 Погода</h1>
      <div className="card-grid">
        {cities.map((city) => (
          <div key={city.id} className="card">
            <h2>{city.name}</h2>
            <div
              className="weather-info"
              dangerouslySetInnerHTML={{ __html: weatherData[city.id] || '⏳ Загрузка...' }}
            />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={loadWeather}>🔄 Обновить всё</button>
        <button onClick={onNavigate}>🏠 На главную</button>
      </div>
    </div>
  );
};

export default WeatherPage;

