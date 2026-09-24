import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  Calculator, 
  BarChart3, 
  User, 
  Sun, 
  Moon 
} from 'lucide-react';

const Header = ({ isHealthy, theme, toggleTheme }) => {
  return (
    <header className="top-navbar-container">
      <div className="top-navbar-inner">
        {/* Brand Logo & Title */}
        <Link to="/" className="brand-badge">
          <div className="brand-icon-box">
            <Building2 size={24} />
          </div>
          <div>
            <div className="brand-title">LoanRisk AI</div>
            <div className="brand-subtitle">Decision Workspace</div>
          </div>
        </Link>

        {/* Center Nav Pills matching modern UI */}
        <nav className="nav-pill-group">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
          >
            <Home size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/prediction" 
            className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
          >
            <Calculator size={16} />
            <span>Predict Default Risk</span>
          </NavLink>

          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
          >
            <BarChart3 size={16} />
            <span>ML Analytics</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
          >
            <User size={16} />
            <span>About</span>
          </NavLink>
        </nav>

        {/* Right Status & Theme Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>


          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={15} color="#FBBF24" />
                <span style={{ display: 'none' }}>Light</span>
              </>
            ) : (
              <>
                <Moon size={15} color="#0D9488" />
                <span style={{ display: 'none' }}>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
