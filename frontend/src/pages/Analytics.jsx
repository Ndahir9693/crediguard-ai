import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const modelComparisonData = [
    { name: 'Logistic Regression', Accuracy: 0.6764, Precision: 0.2196, Recall: 0.6995, F1_Score: 0.3343, status: 'Balanced Recall' },
    { name: 'Decision Tree', Accuracy: 0.8850, Precision: 0.5993, Recall: 0.0305, F1_Score: 0.0581, status: 'High Accuracy' },
    { name: 'SVC (LinearSVC)', Accuracy: 0.6747, Precision: 0.2193, Recall: 0.7036, F1_Score: 0.3344, status: 'Top Recall' },
    { name: 'KNN (k=5)', Accuracy: 0.8750, Precision: 0.2871, Recall: 0.0516, F1_Score: 0.0875, status: 'Instance Baseline' },
    { name: 'Naive Bayes', Accuracy: 0.8848, Precision: 0.5633, Recall: 0.0352, F1_Score: 0.0663, status: 'Probabilistic' }
  ];

  const featureImportancesData = [
    { feature: 'InterestRate', importance: 0.28 },
    { feature: 'Income', importance: 0.22 },
    { feature: 'CreditScore', importance: 0.17 },
    { feature: 'DTIRatio', importance: 0.14 },
    { feature: 'LoanAmount', importance: 0.11 },
    { feature: 'MonthsEmployed', importance: 0.08 }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div>
        <h1 className="section-heading" style={{ fontSize: '2.5rem' }}>
          Machine Learning Model Analytics
        </h1>
        <p className="section-subheading">
          Rigorous benchmarking and evaluation metrics across all 5 trained classification algorithms on 255,347 loan applications.
        </p>
      </div>

      {/* Model Benchmark Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {modelComparisonData.map((m, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{m.name}</h4>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', background: '#CCFBF1', color: '#0F766E' }}>
                  {m.status}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Accuracy: <strong>{(m.Accuracy * 100).toFixed(1)}%</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Precision</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>{(m.Precision * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Recall</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F766E' }}>{(m.Recall * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>F1-Score</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284C7' }}>{m.F1_Score.toFixed(4)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Accuracy</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>{(m.Accuracy * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Visual Chart */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
          Comparative Algorithm Performance Metrics
        </h3>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 1]} />
              <Tooltip formatter={(val) => Number(val).toFixed(4)} />
              <Legend />
              <Bar dataKey="Accuracy" fill="#0D9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#0284C7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#D97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1_Score" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importances */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Key Influential Risk Predictors
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
          Relative feature weighting identified during machine learning evaluation
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {featureImportancesData.map((f, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-main)' }}>{f.feature}</span>
                <span style={{ color: '#0F766E' }}>{(f.importance * 100).toFixed(0)}% Importance</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${f.importance * 100}%`, height: '100%', background: '#0D9488', borderRadius: '9999px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Analytics;
