import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MySongPage from './pages/MySongPage';
import AddEditSong from './pages/AddEditSong';
import RequireAuth from './pages/RequireAuth';
import { LoginForm, SignupForm } from './components/AuthForms';
import { Container, CircularProgress } from '@mui/material';

function HomeGate(){
  const { user } = useAuth();
  return user ? <Dashboard/> : <Navigate to="/login"/>;
}

export default function App(){
  return (
    <AuthProvider>
      <PlayerProvider>
        <Navbar />
        <Suspense fallback={<Container sx={{py:6, textAlign:'center'}}><CircularProgress/></Container>}>
          <Routes>
            <Route path="/" element={<HomeGate/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/page" element={<RequireAuth><MySongPage/></RequireAuth>} />
            <Route path="/page/add" element={<RequireAuth><AddEditSong/></RequireAuth>} />
            <Route path="/page/edit/:id" element={<RequireAuth><AddEditSong/></RequireAuth>} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </Suspense>
      </PlayerProvider>
    </AuthProvider>
  );
}
