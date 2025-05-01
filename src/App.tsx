import React from 'react';
import { HomeworkProvider } from './context/HomeworkCtx';
import Homeworks from './pages/Homeworks';

/**
 * App root component: wraps context provider
 * and renders the Homeworks page (entry point)
 */
const App: React.FC = () => (
  <HomeworkProvider>
    <Homeworks />
  </HomeworkProvider>
);

export default App;
