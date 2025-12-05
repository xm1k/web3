// src/pages/CurrencyPage.tsx
import React, { useEffect, useState } from 'react';

interface Rates {
  USD: number;
  GBP: number;
  RUB: number;
  JPY: number;
}

const CurrencyPage: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      if (!res.ok) throw new Error('Ошибка при загрузке курса валют');

      const data = await res.json();
      if (data.result !== 'success') throw new Error('Неверный ответ от API');

      setRates({
        USD: data.rates.USD,
        GBP: data.rates.GBP,
        RUB: data.rates.RUB,
        JPY: data.rates.JPY,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrency();
  }, []);

  return (
    <div>
      <h1 className="title">💱 Курс валют</h1>

      <div className="card-grid">
        {loading && <p>⏳ Загрузка...</p>}
        {error && <p>⚠️ {error}</p>}
        {!loading && !error && rates &&
          Object.entries(rates).map(([cur, rate]) => (
            <div key={cur} className="card">
              <h2>{cur}</h2>
              <p>1 EUR = {rate.toFixed(2)} {cur}</p>
            </div>
          ))
        }
      </div>

      <div className="buttons">
        <button onClick={loadCurrency}>🔄 Обновить</button>
        <button onClick={onNavigate}>🏠 На главную</button>
      </div>
    </div>
  );
};

export default CurrencyPage;

