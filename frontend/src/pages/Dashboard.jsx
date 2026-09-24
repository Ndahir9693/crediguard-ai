import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import {
  ArrowRight,
  Database,
  TrendingUp,
  Zap,
  ShieldCheck,
  Layers,
  BrainCircuit,
  Activity,
  Target,
  BarChart2
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

/* ─── Keyframe injection ─── */
const CubeStyles = () => (
  <style>{`
    @keyframes rotateCube3D {
      0%   { transform: rotateX(20deg) rotateY(0deg); }
      100% { transform: rotateX(20deg) rotateY(360deg); }
    }
    @keyframes cubeFloat {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    @keyframes tagDrift {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-9px); }
    }
  `}</style>
);

/* ─── Animated 3D Floating ML Cube ─── */
const FACE_SIZE = 160;
const HALF = FACE_SIZE / 2;

const faceBase = {
  position: 'absolute',
  width: FACE_SIZE,
  height: FACE_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  fontWeight: 900,
  color: 'rgba(255,255,255,0.95)',
  fontFamily: 'monospace',
  letterSpacing: '0.06em',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

const faces = [
  { label: 'ML', style: { transform: `translateZ(${HALF}px)`, background: 'linear-gradient(135deg,#0D9488,#0F766E)' } },
  { label: 'AI', style: { transform: `rotateY(180deg) translateZ(${HALF}px)`, background: 'linear-gradient(135deg,#0E7490,#0369A1)' } },
  { label: 'SK', style: { transform: `rotateY(90deg) translateZ(${HALF}px)`,  background: 'linear-gradient(135deg,#059669,#047857)' } },
  { label: 'PY', style: { transform: `rotateY(-90deg) translateZ(${HALF}px)`, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' } },
  { label: 'NN', style: { transform: `rotateX(90deg) translateZ(${HALF}px)`,  background: 'linear-gradient(135deg,#0F766E,#0D9488)' } },
  { label: 'DT', style: { transform: `rotateX(-90deg) translateZ(${HALF}px)`, background: 'linear-gradient(135deg,#374151,#111827)' } },
];

const MLCube = () => (
  <div style={{ animation: 'cubeFloat 6s ease-in-out infinite' }}>
    <div style={{ perspective: 800, width: FACE_SIZE, height: FACE_SIZE }}>
      <div style={{
        width: FACE_SIZE, height: FACE_SIZE,
        position: 'relative',
        transformStyle: 'preserve-3d',
        animation: 'rotateCube3D 10s linear infinite',
        filter: 'drop-shadow(0 20px 40px rgba(13,148,136,0.55))'
      }}>
        {faces.map(f => (
          <div key={f.label} style={{ ...faceBase, ...f.style }}>{f.label}</div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Floating Tag Chip ─── */
const FloatingTag = ({ label, color, delay = '0s', style = {} }) => (
  <div style={{
    position: 'absolute',
    fontSize: '0.7rem',
    fontWeight: 700,
    fontFamily: 'monospace',
    color,
    background: 'rgba(255,255,255,0.92)',
    border: `1.5px solid ${color}55`,
    borderRadius: 8,
    padding: '4px 11px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 14px rgba(0,0,0,0.07)',
    animation: `tagDrift 4s ease-in-out ${delay} infinite`,
    whiteSpace: 'nowrap',
    zIndex: 2,
    ...style,
  }}>
    {label}
  </div>
);


/* ─── Stat Counter with animated count-up ─── */
const StatCounter = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 1800 / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="stat-counter-item">
      <div className="stat-counter-value">
        {count >= 1000 ? `${Math.floor(count / 1000)}K` : count}{suffix}
      </div>
      <div className="stat-counter-label">{label}</div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiService.getDashboardData().then(setData).catch(() => {});
  }, []);

  const defaulted = data?.defaultedLoans || 29653;
  const nonDefaulted = data?.nonDefaultedLoans || 225694;

  const pieData = [
    { name: 'Non-Defaulted', value: nonDefaulted, color: '#0D9488' },
    { name: 'Defaulted', value: defaulted, color: '#EF4444' }
  ];

  const barData = [
    { name: 'Low Risk', count: 184500, color: '#10B981' },
    { name: 'Medium', count: 41194, color: '#F59E0B' },
    { name: 'High Risk', count: 29653, color: '#EF4444' }
  ];

  return (
    <div className="dashboard-root animate-fade-in">
      <CubeStyles />

      {/* ══════ HERO ══════ */}
      <section className="hero-section">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-left">
          <div className="hero-eyebrow">
            <BrainCircuit size={14} />
            <span>Decision Intelligence</span>
          </div>

          <h1 className="hero-heading">
            Predict loan risk<br />
            with <span className="hero-accent">machine precision.</span>
          </h1>

          <p className="hero-sub">
            An intelligent workspace that evaluates borrower default risk in real time
            using five production-grade ML models and a clean, transparent workflow.
          </p>

          <div className="hero-actions">
            <Link to="/prediction" className="cta-primary">
              Start Evaluation
              <ArrowRight size={18} />
            </Link>
            <Link to="/analytics" className="cta-ghost">
              Explore Analytics
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="hero-stats">
            <StatCounter end={255} suffix="K+" label="Training Records" />
            <div className="stat-divider" />
            <StatCounter end={16} suffix="" label="Input Features" />
            <div className="stat-divider" />
            <StatCounter end={5} suffix="" label="ML Models" />
            <div className="stat-divider" />
            <StatCounter end={88} suffix="%" label="Accuracy" />
          </div>
        </div>

        <div className="hero-right">
          {/* Hero Visual Card with 3D Cube */}
          <div style={{
            background: 'linear-gradient(145deg, #F0FDFA 0%, #EFF6FF 100%)',
            border: '1px solid #C7F9F1',
            borderRadius: 28,
            padding: '2.5rem',
            position: 'relative',
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(13,148,136,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}>
            {/* Floating tech tags */}
            <FloatingTag label="numpy"        color="#F59E0B" delay="0s"   style={{ top: '8%',  right: '10%' }} />
            <FloatingTag label="decision tree" color="#F97316" delay="0.5s" style={{ top: '36%', left: '4%' }} />
            <FloatingTag label="scikit-learn" color="#3B82F6" delay="1s"   style={{ top: '36%', right: '4%' }} />
            <FloatingTag label="pandas"       color="#0D9488" delay="1.5s" style={{ bottom: '20%', left: '10%' }} />


            {/* 3D Rotating Cube */}
            <MLCube />

            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              right: '1.25rem',
              background: '#fff',
              border: '1.5px solid #0F766E',
              borderRadius: 12,
              padding: '0.55rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}>
              <div className="status-dot" />
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0F766E' }}>Probability Engine</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', marginTop: 1 }}>Ready for evaluation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FEATURE CARDS ══════ */}
      <section className="features-section">
        <div className="feature-card-light">
          <div className="feature-icon-light"><Database size={22} /></div>
          <div className="feature-badge" style={{ color: '#0F766E' }}>Data Foundation</div>
          <h3 className="feature-title">Historical Borrower Patterns</h3>
          <p className="feature-desc">Financial, employment, and credit context unified in one clean pipeline trained on 255K real loan records.</p>
        </div>
        <div className="feature-card-dark">
          <div className="feature-icon-dark"><TrendingUp size={22} /></div>
          <div className="feature-badge" style={{ color: '#5EEAD4' }}>Risk Clarity</div>
          <h3 className="feature-title">Modeled Probability Split</h3>
          <p className="feature-desc">See default and repayment probabilities side by side with the final ML classification for every applicant.</p>
        </div>
        <div className="feature-card-light">
          <div className="feature-icon-light"><Zap size={22} /></div>
          <div className="feature-badge" style={{ color: '#0F766E' }}>Built for Speed</div>
          <h3 className="feature-title">From Inputs to Signal</h3>
          <p className="feature-desc">A concise form and real-time API endpoint keep each review moving without unnecessary friction.</p>
        </div>
      </section>

      {/* ══════ EVALUATION FLOW ══════ */}
      <section className="flow-section">
        <div className="flow-header">
          <div className="section-badge">
            <Layers size={13} />
            <span>Evaluation Flow</span>
          </div>
          <h2 className="flow-heading">Structured inputs.<br />Measurable confidence.</h2>
          <p className="flow-sub">
            Every decision follows the same clear path — making models easier to use and outputs easier to explain.
          </p>
        </div>

        <div className="steps-grid">
          {[
            { num: '01', title: 'Capture Context', desc: 'Record income, employment, debt, credit, and loan details in structured fields with preset baselines.' },
            { num: '02', title: 'Encode Features', desc: 'Normalize the application into model-ready numerical features through preprocessing pipelines.' },
            { num: '03', title: 'Review Risk', desc: 'Use the predicted default probability and risk tier to inform underwriting decisions with confidence.' }
          ].map(s => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <h4 className="step-title">{s.title}</h4>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flow-banner">
          <ShieldCheck size={20} />
          <span>Model responses return clear probability context with instantaneous inference speeds.</span>
        </div>
      </section>

      {/* ══════ ANALYTICS PREVIEW ══════ */}
      <section className="analytics-section">
        <div className="analytics-header">
          <div>
            <div className="section-badge" style={{ marginBottom: '0.5rem' }}>
              <Activity size={13} />
              <span>Dataset Overview</span>
            </div>
            <h2 className="analytics-title">Training Dataset Distribution</h2>
            <p className="analytics-sub">255,347 loan records · 11.61% baseline default rate</p>
          </div>
          <Link to="/analytics" className="cta-outline">
            <BarChart2 size={16} />
            Full Analytics
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="charts-grid">
          <div className="chart-box">
            <h4 className="chart-title">Repayment vs Default Split</h4>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={4} dataKey="value">
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${Number(v).toLocaleString()} loans`} contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              {pieData.map(e => (
                <div key={e.name} className="legend-item">
                  <span className="legend-dot" style={{ background: e.color }} />
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-box">
            <h4 className="chart-title">Portfolio Risk Stratification</h4>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barCategoryGap="35%">
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13 }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {barData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="model-panel">
            <div className="section-badge" style={{ marginBottom: '0.75rem' }}>
              <Target size={13} />
              <span>Model Performance</span>
            </div>
            <h4 className="chart-title" style={{ marginBottom: '1.25rem' }}>Top Classifiers</h4>
            {[
              { name: 'Logistic Regression', acc: 88 },
              { name: 'Decision Tree', acc: 85 },
              { name: 'SVC', acc: 87 },
              { name: 'KNN', acc: 83 },
              { name: 'Naive Bayes', acc: 82 }
            ].map(m => (
              <div key={m.name} className="model-row">
                <span className="model-name">{m.name}</span>
                <div className="model-bar-bg">
                  <div className="model-bar-fill" style={{ width: `${m.acc}%` }} />
                </div>
                <span className="model-acc">{m.acc}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
