const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    isProduction: process.env.REACT_APP_ENVIRONMENT === 'production'
  };
  
  export default config;