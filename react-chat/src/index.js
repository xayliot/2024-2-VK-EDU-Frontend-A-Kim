import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './App'; 
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import { Provider } from 'react-redux'; 
import store from './store/store';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> 
    <AuthProvider>
      <AppRouter />  
    </AuthProvider>
  </Provider>
);

reportWebVitals();