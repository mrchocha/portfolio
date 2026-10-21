import React from 'react';
import { MotionConfig } from 'motion/react';
import App from './App';
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

// The whole page. Rendered to HTML at build time (entry-server.jsx), then brought to life in the browser (index.jsx).
export default function Root() {
  return (
    <React.StrictMode>
      {/* Turns off motion for visitors who ask their system for less of it */}
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        <Navbar />
        <App />
      </MotionConfig>
    </React.StrictMode>
  );
}
