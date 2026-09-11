import React from 'react';
import { createRoot } from 'react-dom/client';
import ReferenceRebuild from './ReferenceRebuild';
import './index.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><ReferenceRebuild /></React.StrictMode>);
