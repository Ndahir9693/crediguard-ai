import React, { useState } from 'react';
import apiService from '../services/api';
import { 
  Calculator, 
  RotateCcw, 
  AlertTriangle, 
  User, 
  DollarSign, 
  Briefcase, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Sparkles 
} from 'lucide-react';

const Prediction = () => {
  const initialFormState = {
    Age: 35,
    Income: 75000,
    LoanAmount: 25000,
    CreditScore: 720,
    MonthsEmployed: 48,
    NumCreditLines: 3,
    InterestRate: 7.5,
    LoanTerm: 36,
    DTIRatio: 0.28,
    Education: "Bachelor's",
    EmploymentType: "Full-time",
    MaritalStatus: "Married",
    HasMortgage: "Yes",
    HasDependents: "No",
    LoanPurpose: "Home",
    HasCoSigner: "Yes"
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedModel, setSelectedModel] = useState("Decision Tree");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const loadPreset = (presetType) => {
    if (presetType === 'low') {
      setFormData({
        Age: 48,
        Income: 140000,
        LoanAmount: 20000,
        CreditScore: 810,
        MonthsEmployed: 120,
        NumCreditLines: 2,
        InterestRate: 5.5,
        LoanTerm: 36,
        DTIRatio: 0.15,
        Education: "Master's",
        EmploymentType: "Full-time",
        MaritalStatus: "Married",
        HasMortgage: "Yes",
        HasDependents: "Yes",
        LoanPurpose: "Home",
        HasCoSigner: "Yes"
      });
    } else if (presetType === 'medium') {
      setFormData({
        Age: 32,
        Income: 55000,
        LoanAmount: 28000,
        CreditScore: 660,
        MonthsEmployed: 24,
        NumCreditLines: 5,
        InterestRate: 12.0,
        LoanTerm: 48,
        DTIRatio: 0.38,
        Education: "Bachelor's",
        EmploymentType: "Full-time",
        MaritalStatus: "Single",
        HasMortgage: "No",
        HasDependents: "No",
        LoanPurpose: "Auto",
        HasCoSigner: "No"
      });
    } else if (presetType === 'high') {
      setFormData({
        Age: 22,
        Income: 24000,
        LoanAmount: 50000,
        CreditScore: 540,
        MonthsEmployed: 4,
        NumCreditLines: 8,
        InterestRate: 21.5,
        LoanTerm: 60,
        DTIRatio: 0.62,
        Education: "High School",
        EmploymentType: "Unemployed",
        MaritalStatus: "Single",
        HasMortgage: "No",
        HasDependents: "Yes",
        LoanPurpose: "Other",
        HasCoSigner: "No"
      });
    } else if (presetType === 'reset') {
      setFormData(initialFormState);
    }
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        Age: Number(formData.Age),
        Income: Number(formData.Income),
        LoanAmount: Number(formData.LoanAmount),
        CreditScore: Number(formData.CreditScore),
        MonthsEmployed: Number(formData.MonthsEmployed),
        NumCreditLines: Number(formData.NumCreditLines),
        InterestRate: Number(formData.InterestRate),
        LoanTerm: Number(formData.LoanTerm),
        DTIRatio: Number(formData.DTIRatio),
        selected_model: selectedModel
      };

      const data = await apiService.predictLoan(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        'Unable to complete prediction. Please verify that the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const rawProb = result ? (
    result.probabilityPercentage !== undefined 
      ? Number(result.probabilityPercentage) 
      : (result.probability !== undefined ? Number(result.probability) * 100 : 0)
  ) : 0;
  const defaultProb = rawProb.toFixed(1);
  const repayProb = Math.max(0, 100 - rawProb).toFixed(1);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="section-heading" style={{ fontSize: '2.5rem' }}>
          Loan Default Risk Evaluation
        </h1>
        <p className="section-subheading">
          Fill in the applicant details below to calculate default probabilities using our pre-trained <strong>{selectedModel}</strong> model.
        </p>
      </div>

      {/* Quick Test Profiles Bar matching screenshot */}
      <div className="preset-bar">
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={16} color="#0D9488" />
          Quick Test Profiles:
        </span>
        <button 
          type="button" 
          onClick={() => loadPreset('low')}
          className="preset-pill preset-pill-low"
        >
          <CheckCircle2 size={14} />
          Low Risk Profile
        </button>
        <button 
          type="button" 
          onClick={() => loadPreset('medium')}
          className="preset-pill preset-pill-med"
        >
          <AlertTriangle size={14} />
          Moderate Risk Profile
        </button>
        <button 
          type="button" 
          onClick={() => loadPreset('high')}
          className="preset-pill preset-pill-high"
        >
          <AlertTriangle size={14} />
          High Risk Profile
        </button>
        <button 
          type="button" 
          onClick={() => loadPreset('reset')}
          className="preset-pill preset-pill-reset"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {error && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          color: '#991B1B',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertTriangle size={20} color="#DC2626" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Card 1: Personal & Demographic Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="form-section-icon">
              <User size={18} />
            </div>
            <h3 className="form-section-title">Personal & Demographic Information</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Age</label>
                <span className="form-hint">(18 - 100)</span>
              </div>
              <input 
                type="number" 
                name="Age" 
                min="18" 
                max="100" 
                value={formData.Age} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Education</label>
              </div>
              <select name="Education" value={formData.Education} onChange={handleChange} className="form-select">
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Marital Status</label>
              </div>
              <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className="form-select">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Has Dependents</label>
              </div>
              <select name="HasDependents" value={formData.HasDependents} onChange={handleChange} className="form-select">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Employment & Income */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="form-section-icon">
              <Briefcase size={18} />
            </div>
            <h3 className="form-section-title">Employment & Income</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Annual Income</label>
                <span className="form-hint">($ USD)</span>
              </div>
              <input 
                type="number" 
                name="Income" 
                min="0" 
                step="1000" 
                value={formData.Income} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Employment Type</label>
              </div>
              <select name="EmploymentType" value={formData.EmploymentType} onChange={handleChange} className="form-select">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Months Employed</label>
                <span className="form-hint">(Experience)</span>
              </div>
              <input 
                type="number" 
                name="MonthsEmployed" 
                min="0" 
                max="600" 
                value={formData.MonthsEmployed} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>
          </div>
        </div>

        {/* Card 3: Credit & Debt Profile */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="form-section-icon">
              <CreditCard size={18} />
            </div>
            <h3 className="form-section-title">Credit & Debt Profile</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Credit Score</label>
                <span className="form-hint">(300 - 850)</span>
              </div>
              <input 
                type="number" 
                name="CreditScore" 
                min="300" 
                max="850" 
                value={formData.CreditScore} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Credit Lines</label>
                <span className="form-hint">(Open)</span>
              </div>
              <input 
                type="number" 
                name="NumCreditLines" 
                min="0" 
                max="30" 
                value={formData.NumCreditLines} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">DTI Ratio</label>
                <span className="form-hint">(0.0 - 1.0)</span>
              </div>
              <input 
                type="number" 
                name="DTIRatio" 
                min="0" 
                max="1" 
                step="0.01" 
                value={formData.DTIRatio} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Has Mortgage</label>
              </div>
              <select name="HasMortgage" value={formData.HasMortgage} onChange={handleChange} className="form-select">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Has Co-Signer</label>
              </div>
              <select name="HasCoSigner" value={formData.HasCoSigner} onChange={handleChange} className="form-select">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Loan Specifics */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="form-section-icon">
              <DollarSign size={18} />
            </div>
            <h3 className="form-section-title">Loan Specifics</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Loan Amount</label>
                <span className="form-hint">($ USD)</span>
              </div>
              <input 
                type="number" 
                name="LoanAmount" 
                min="500" 
                step="500" 
                value={formData.LoanAmount} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Interest Rate</label>
                <span className="form-hint">(% APR)</span>
              </div>
              <input 
                type="number" 
                name="InterestRate" 
                min="1" 
                max="35" 
                step="0.1" 
                value={formData.InterestRate} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Loan Term</label>
                <span className="form-hint">(Months)</span>
              </div>
              <select name="LoanTerm" value={formData.LoanTerm} onChange={handleChange} className="form-select">
                <option value="12">12 Months (1 yr)</option>
                <option value="24">24 Months (2 yrs)</option>
                <option value="36">36 Months (3 yrs)</option>
                <option value="48">48 Months (4 yrs)</option>
                <option value="60">60 Months (5 yrs)</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Loan Purpose</label>
              </div>
              <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange} className="form-select">
                <option value="Home">Home Improvement / Mortgage</option>
                <option value="Auto">Auto Vehicle Loan</option>
                <option value="Education">Education & Tuition</option>
                <option value="Business">Small Business Expansion</option>
                <option value="Other">Personal / Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          flexWrap: 'wrap',
          padding: '1.25rem 1.6rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px'
        }}>
          {/* Active Model Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ color: '#0F766E', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem' }}>
              <Cpu size={18} />
              <span>Active ML Model:</span>
            </div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '240px', fontWeight: 700 }}
            >
              <option value="Decision Tree">Decision Tree Classifier</option>
              <option value="Logistic Regression">Logistic Regression</option>
              <option value="Support Vector Classifier (SVC)">Support Vector Classifier (SVC)</option>
              <option value="K-Nearest Neighbors (KNN)">K-Nearest Neighbors (KNN)</option>
              <option value="Naive Bayes">Naive Bayes (GaussianNB)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-dark"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem', background: '#0F2F2D' }}
          >
            <Calculator size={18} />
            <span>{loading ? 'Evaluating Model Inference...' : 'Calculate Default Prediction'}</span>
          </button>
        </div>

      </form>

      {/* Result Display Card when evaluated */}
      {result && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem', border: `2px solid ${result.prediction === 1 ? '#FCA5A5' : '#86EFAC'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0F766E' }}>
                Evaluation Complete • Model: {result.selectedModel || result.model_used || selectedModel}
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Inference Result & Risk Assessment
              </h2>
            </div>

            <div style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: result.prediction === 1 ? '#FEE2E2' : '#D1FAE5',
              color: result.prediction === 1 ? '#DC2626' : '#059669',
              border: `1.5px solid ${result.prediction === 1 ? '#FCA5A5' : '#86EFAC'}`
            }}>
              {result.prediction === 1 ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
              <span>{result.prediction === 1 ? 'HIGH DEFAULT RISK' : 'LOW RISK - APPROVED'}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            {/* Probability Gauge / Metric */}
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Modeled Default Probability
              </div>
              <div style={{
                fontSize: '4.25rem',
                fontWeight: 900,
                color: result.prediction === 1 ? '#DC2626' : '#059669',
                lineHeight: 1.1,
                margin: '0.5rem 0'
              }}>
                {defaultProb}%
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Repayment Confidence: <strong>{repayProb}%</strong>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '9999px', marginTop: '1.25rem', overflow: 'hidden' }}>
                <div style={{
                  width: `${defaultProb}%`,
                  height: '100%',
                  background: result.prediction === 1 ? '#DC2626' : '#059669',
                  borderRadius: '9999px',
                  transition: 'width 0.6s ease'
                }}></div>
              </div>
            </div>

            {/* Assessment Details & Underwriter Recommendation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-subtle)', padding: '1.2rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Underwriter Recommendation
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.35rem' }}>
                  {result.message || (result.prediction === 1 
                    ? '⚠️ Loan default probability exceeds policy threshold. Underwriting review or collateral requirement mandatory before consideration.'
                    : '✅ Applicant demonstrates robust repayment metrics. Standard loan authorization approved with prime interest pricing.'
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Debt-to-Income (DTI)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {(formData.DTIRatio * 100).toFixed(0)}%
                  </div>
                </div>
                <div style={{ padding: '0.85rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Credit Score Tier</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {formData.CreditScore >= 740 ? 'Excellent' : formData.CreditScore >= 670 ? 'Good' : 'Subprime'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Prediction;
