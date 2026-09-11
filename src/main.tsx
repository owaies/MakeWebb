import React from 'react';
import { createRoot } from 'react-dom/client';
import ReferenceMatch from './ReferenceMatch';
import './index.css';
import './responsive-fixes.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><ReferenceMatch /></React.StrictMode>
);
