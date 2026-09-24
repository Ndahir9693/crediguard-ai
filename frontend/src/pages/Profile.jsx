import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { 
  User, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Profile = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await apiService.getHealth();
        setHealth(data);
      } catch (e) {
        setHealth({ status: 'offline' });
      }
    };
    check();
  }, []);

  const modelsTrained = [
    { name: 'Logistic Regression', type: 'Linear Classification', metric: 'Baseline Linear Separator', badge: 'Standard' },
    { name: 'Decision Tree Classifier', type: 'Tree-based Inference', metric: 'Interpretability & Rule Splitting', badge: 'Rule-Based' },
    { name: 'Support Vector Classifier (SVC)', type: 'Kernel / Margin', metric: 'Maximum Margin Hyperplane', badge: 'High Dimension' },
    { name: 'K-Nearest Neighbors (KNN)', type: 'Instance-based', metric: 'Proximity Cluster Matching', badge: 'Distance' },
    { name: 'Naive Bayes (GaussianNB)', type: 'Probabilistic', metric: 'Conditional Probability Bayes', badge: 'Fast Prob' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto', padding: '1rem 0 3rem' }}>
      
      {/* Hero Developer Profile Section matching screenshot */}
      <div style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
        
        {/* Pulsing Concentric Rings Avatar */}
        <div className="pulsing-avatar-container">
          <div className="pulsing-ring pulsing-ring-1"></div>
          <div className="pulsing-ring pulsing-ring-2"></div>
          <div className="pulsing-ring pulsing-ring-3"></div>
          <div className="avatar-inner-circle">
            <User size={38} strokeWidth={2.2} />
          </div>
        </div>

        {/* Section Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0F766E',
            background: 'var(--brand-teal-light)',
            padding: '0.35rem 0.95rem',
            borderRadius: '9999px',
            border: '1px solid rgba(15, 118, 110, 0.2)'
          }}>
            <Sparkles size={14} />
            About Me
          </span>
        </div>

        {/* Developer Name */}
        <h1 style={{
          fontSize: '3.25rem',
          fontWeight: 900,
          color: '#0F4C49',
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          marginBottom: '0.75rem'
        }}>
          Naimish Dangar
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '650px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Machine Learning & Full-Stack Developer. Building intelligent financial risk assessment systems powered by scikit-learn and high-performance APIs.
        </p>

        {/* Action Social Buttons matching the screenshot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/Ndahir9693" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-dark"
            style={{ minWidth: '150px' }}
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>

          <a 
            href="https://www.linkedin.com/in/naimish-dangar-316a32322?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ minWidth: '150px', background: '#0284C7' }}
          >
            <LinkedinIcon size={18} />
            <span>LinkedIn</span>
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </div>

      {/* 5 ML Models Comparison Overview */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div className="form-section-icon">
            <Cpu size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Trained Machine Learning Models (Task 5)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Trained and evaluated on 255,347 loan applications with comprehensive scikit-learn pipelines
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {modelsTrained.map((m, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {m.name}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: 'rgba(15, 118, 110, 0.1)',
                  color: '#0F766E',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  {m.badge}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {m.type}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {m.metric}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Backend System Diagnostics */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div className="form-section-icon">
            <ShieldCheck size={20} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Live Service Diagnostics
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>API Server Status</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: health?.status === 'healthy' ? '#059669' : '#DC2626', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
              <CheckCircle2 size={16} />
              {health?.status === 'healthy' ? 'Operational & Ready' : 'Backend Disconnected'}
            </div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>Loaded Default Classifier</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {health?.selectedModel || 'Logistic Regression / Decision Tree'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
