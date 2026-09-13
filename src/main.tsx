import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './responsive-fixes.css';
import './makewebb-reference.css';
import './makewebb-exact.css';
import './makewebb-cinematic.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
