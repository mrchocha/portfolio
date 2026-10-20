import React from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import './index.css';
import App from './App';
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Turns off motion for visitors who ask their system for less of it */}
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <App />
    </MotionConfig>
  </React.StrictMode>
);
