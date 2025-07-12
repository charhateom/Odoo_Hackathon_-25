import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SwapPage from './pages/SwapPage';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import SwapInboxPage from './pages/SwapInboxPage';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import UserDetailPage from './pages/UserDetailPage';



function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/users/:id" element={<PrivateRoute><UserDetailPage /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        <Route path="/inbox" element={<PrivateRoute><SwapInboxPage /></PrivateRoute>} />        
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
