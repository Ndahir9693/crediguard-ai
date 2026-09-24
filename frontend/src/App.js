import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import apiService from './services/api';
import './styles/index.css';

function MainLayout() {
  const [isHealthy, setIsHealthy] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Logistic Regression');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const checkHealth = async () => {
      try {
        const res = await apiService.getHealth();
        setIsHealthy(res.status === 'healthy');
        if (res.selectedModel) setSelectedModel(res.selectedModel);
      } catch (e) {
        setIsHealthy(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <Header 
        isHealthy={isHealthy}
        selectedModel={selectedModel}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <div className="main-content">
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<Profile />} />
          </Routes>
        </main>
      </div>

      <footer className="app-footer">
        <div className="app-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>LoanRisk AI</span>
            <span>•</span>
            <span>Machine Learning Risk Evaluation Engine</span>
          </div>
          <div>
            <span>Developed by <strong>Naimish Dangar</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
