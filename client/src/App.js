import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SwapPage from './pages/SwapPage';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/swap" element={<PrivateRoute><SwapPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
