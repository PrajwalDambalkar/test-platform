import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store/store';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import TestList from './containers/TestList';
import TestTaking from './containers/TestTaking';
import Results from './containers/Results';
import AdminPanel from './containers/AdminPanel';
import PrivateRoute from './hoc/PrivateRoute';
import RoleRoute from './hoc/RoleRoute';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                
                {/* Student routes */}
                <Route 
                  path="/tests" 
                  element={
                    <RoleRoute allowedRoles={['STUDENT']}>
                      <TestList />
                    </RoleRoute>
                  } 
                />
                <Route 
                  path="/test/:testId" 
                  element={
                    <RoleRoute allowedRoles={['STUDENT']}>
                      <TestTaking />
                    </RoleRoute>
                  } 
                />
                <Route 
                  path="/results" 
                  element={
                    <RoleRoute allowedRoles={['STUDENT']}>
                      <Results />
                    </RoleRoute>
                  } 
                />
                
                {/* Teacher routes */}
                <Route 
                  path="/teacher/tests" 
                  element={
                    <RoleRoute allowedRoles={['TEACHER']}>
                      <TestList />
                    </RoleRoute>
                  } 
                />
                <Route 
                  path="/teacher/results" 
                  element={
                    <RoleRoute allowedRoles={['TEACHER']}>
                      <Results />
                    </RoleRoute>
                  } 
                />
                
                {/* Admin routes */}
                <Route 
                  path="/admin" 
                  element={
                    <RoleRoute allowedRoles={['ADMIN']}>
                      <AdminPanel />
                    </RoleRoute>
                  } 
                />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
