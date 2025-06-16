import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App.jsx';
import reportWebVitals from './reportWebVitals.js';
import './styles/global.scss';
import './i18n.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();