import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // In development on localhost, default to local FastAPI server on port 8000
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:8000/api';
  }
  // In production (Vercel / cloud), use relative /api route
  return '/api';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const apiService = {
  // GET /api/health
  async getHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // POST /api/prediction
  async predictLoan(applicantData) {
    try {
      const response = await apiClient.post('/prediction', applicantData);
      return response.data;
    } catch (error) {
      console.error('Loan prediction request failed:', error);
      throw error;
    }
  },

  // GET /api/dashboard
  async getDashboardData() {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error);
      throw error;
    }
  },

  // GET /api/loans
  async getLoans(search = '', riskLevel = '') {
    try {
      const params = {};
      if (search) params.search = search;
      if (riskLevel) params.risk_level = riskLevel;
      
      const response = await apiClient.get('/loans', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch loans:', error);
      throw error;
    }
  },

  // GET /api/loans/:id
  async getLoanDetails(loanId) {
    try {
      const response = await apiClient.get(`/loans/${loanId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch loan ${loanId}:`, error);
      throw error;
    }
  }
};

export default apiService;
