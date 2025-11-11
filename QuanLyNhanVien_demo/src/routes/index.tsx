import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import Dashboard from '../pages/Dashboard';
import PhongBan from '../pages/PhongBan';
import ChucVu from '../pages/ChucVu';
import NhanVien from '../pages/NhanVien';
import ChamCong from '../pages/ChamCong';
import Luong from '../pages/Luong';
import BaoCao from '../pages/BaoCao';
import CaiDat from '../pages/CaiDat';
import Login from '../pages/Login';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/phong-ban"
        element={
          <PrivateRoute>
            <PhongBan />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/chuc-vu"
        element={
          <PrivateRoute>
            <ChucVu />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/nhan-vien"
        element={
          <PrivateRoute>
            <NhanVien />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/cham-cong"
        element={
          <PrivateRoute>
            <ChamCong />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/luong"
        element={
          <PrivateRoute>
            <Luong />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/bao-cao"
        element={
          <PrivateRoute>
            <BaoCao />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/cai-dat"
        element={
          <PrivateRoute>
            <CaiDat />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;