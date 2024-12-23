import { createStore } from 'redux';

const initialState = {
  sourceLanguage: 'de',
  targetLanguage: 'en',
  text: '',
  translation: 'Translation',
  history: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOURCE_LANGUAGE':
      return { ...state, sourceLanguage: action.payload };
    case 'SET_TARGET_LANGUAGE':
      return { ...state, targetLanguage: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_TRANSLATION':
      return { ...state, translation: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;