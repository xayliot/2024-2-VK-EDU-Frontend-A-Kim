import React, { useEffect, useState } from 'react';
import './index.scss';

const PageHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('translationHistory');
    setHistory(savedHistory ? JSON.parse(savedHistory) : []);
  }, []);

  return (
    <div className="history-container">
      <h1>История переводов</h1>
      {history.length === 0 ? (
        <p>История переводов пуста</p>
      ) : (
        <ul className="history-list">
          {history.map((entry, index) => (
            <li key={index} className="history-item">
              <strong>{entry.sourceLanguage} → {entry.targetLanguage}</strong>: <em>{entry.originalText}</em> → <strong>{entry.translatedText}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PageHistory;