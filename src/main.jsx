import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { DataProvider } from './context/DataContext.jsx';
import { ViewModeProvider } from './context/ViewModeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ViewModeProvider>
          <App />
        </ViewModeProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
