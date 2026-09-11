import React from 'react';
import { createRoot } from 'react-dom/client';
import ReferenceExperience from './components/ReferenceExperience';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReferenceExperience />
  </React.StrictMode>
);
