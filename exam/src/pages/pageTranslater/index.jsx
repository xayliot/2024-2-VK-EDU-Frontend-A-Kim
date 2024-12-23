import React, { useState, useEffect } from 'react';
import './index.scss';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import languages from './../../languages.json';
import Translator from './../../translate.ts';
import { useNavigate } from 'react-router-dom';

const PageTranslater = () => {
  const [sourceLanguage, setSourceLanguage] = useState('de');
  const [targetLanguage, setTargetLanguage] = useState('ru');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('Translation');
  const translator = new Translator('****'); 
  const navigate = useNavigate();

  useEffect(() => {
    const translateText = async () => {
      if (text) {
        try {
          const response = await translator.translate(text, targetLanguage, sourceLanguage);
          setTranslation(response.translatedText);
        } catch (error) {
          console.error('Error fetching translation:', error);
          setTranslation('Translation error');
        }
      } else {
        setTranslation('Translation');
      }
    };

    translateText();
  }, [text, sourceLanguage, targetLanguage]);

  const handleSaveTranslation = () => {
    if (text && translation !== 'Translation') {
      const newEntry = {
        sourceLanguage,
        targetLanguage,
        originalText: text,
        translatedText: translation,
      };


      const currentHistory = JSON.parse(localStorage.getItem('translationHistory')) || [];
      const updatedHistory = [...currentHistory, newEntry];
      
 
      localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
      setText(''); 
    }
  };

  const handlePageEdit = () => {
    navigate('/history'); 
  };

  return (
    <div className="container">
      <h1>VK Translate</h1>
      <div className="language-selector">
        <div>
          <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={() => {
            setSourceLanguage(targetLanguage);
            setTargetLanguage(sourceLanguage);
          }}>
            <SwapHorizIcon />
          </button>
        </div>
        <div>
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='workPlace'>
        <div className='leftArea'>
          <textarea
            rows="5"
            placeholder="Enter text to translate..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='rightArea'>
          {translation}
        </div>
      </div>

      <button onClick={handleSaveTranslation} className="save-button">
        Сохранить перевод
      </button>
      <button onClick={handlePageEdit} className="navigate-button">
        Просмотреть историю
      </button>
    </div>
  );
};

export default PageTranslater;