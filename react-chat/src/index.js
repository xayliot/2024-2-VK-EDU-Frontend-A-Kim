import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './App'; 
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRouter />  
  </AuthProvider>
);

reportWebVitals();
