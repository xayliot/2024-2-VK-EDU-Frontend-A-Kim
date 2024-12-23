import React, { useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import languages from './../../languages.json';
import Translator from './../../translate.ts';
import { useNavigate } from 'react-router-dom';

const MAX_CHAR_COUNT = 5000;

const PageTranslater = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sourceLanguage, targetLanguage, text, translation } = useSelector(state => state);
  const translatorRef = useRef(new Translator('****'));
 

  useEffect(() => {
    const translateText = async () => {
      if (text) {
        try {
          const response = await translatorRef.current.translate(text, targetLanguage, sourceLanguage);
          dispatch({ type: 'SET_TRANSLATION', payload: response.translatedText });
        } catch (error) {
          console.error('Error fetching translation:', error);
          dispatch({ type: 'SET_TRANSLATION', payload: 'Translation error' });
        }
      } else {
        dispatch({ type: 'SET_TRANSLATION', payload: 'Translation' });
      }
    };

    translateText();
  }, [text, sourceLanguage, targetLanguage, dispatch]);

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = JSON.parse(localStorage.getItem('translationHistory')) || [];
      savedHistory.forEach(entry => {
        dispatch({ type: 'ADD_TO_HISTORY', payload: entry });
      });
    };

    loadHistory();
  }, [dispatch]);

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

      dispatch({ type: 'ADD_TO_HISTORY', payload: newEntry });
      dispatch({ type: 'SET_TEXT', payload: '' });
    }
  };

  const handlePageEdit = () => {
    navigate('/history');
  };

  const handleLanguageSelect = (lang, isSource) => {
    if (isSource) {
      dispatch({ type: 'SET_SOURCE_LANGUAGE', payload: lang });
    } else {
      dispatch({ type: 'SET_TARGET_LANGUAGE', payload: lang });
    }
  };

  const handleSwapLanguages = () => {
    dispatch({ type: 'SET_SOURCE_LANGUAGE', payload: targetLanguage });
    dispatch({ type: 'SET_TARGET_LANGUAGE', payload: sourceLanguage });
  };

  return (
    <div className="container">
      <h1>VK Translate</h1>

      <div className="language-selector">
        <div className="source-language">
          <button className={`language-button ${sourceLanguage === 'auto' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('auto', true)}>Auto Detect</button>
          <button className={`language-button ${sourceLanguage === 'de' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('de', true)}>German</button>
          <button className={`language-button ${sourceLanguage === 'en' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('en', true)}>English</button>
          <button className={`language-button ${sourceLanguage === 'es' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('es', true)}>Spanish</button>
          <select value={sourceLanguage} onChange={(e) => handleLanguageSelect(e.target.value, true)}>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="swap-button">
          <button onClick={handleSwapLanguages}>
            <SwapHorizIcon />
          </button>
        </div>

        <div className="target-language">
          <button className={`language-button ${targetLanguage === 'de' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('de', false)}>German</button>
          <button className={`language-button ${targetLanguage === 'en' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('en', false)}>English</button>
          <button className={`language-button ${targetLanguage === 'es' ? 'selected' : ''}`} onClick={() => handleLanguageSelect('es', false)}>Spanish</button>
          <select value={targetLanguage} onChange={(e) => handleLanguageSelect(e.target.value, false)}>
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
            onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
          />
          <div className="char-count">
            {text.length} / {MAX_CHAR_COUNT}
          </div>
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