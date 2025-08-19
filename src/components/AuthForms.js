import React, { memo, useCallback, useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validate';

const Field = memo(function Field(props){ return <TextField fullWidth size="small" {...props} />; });

export function LoginForm(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');

  const onSubmit = useCallback(async (e)=>{
    e.preventDefault();
    setMsg('');
    if(!validateEmail(email)) return setMsg('Invalid email');
    if(password.length<6) return setMsg('Password too short (min 6)');
    try{
      setLoading(true);
      await new Promise(r=>setTimeout(r,250));
      login(email,password);
      alert('Logged in successfully');
      navigate('/');
    }catch(err){ setMsg(err.message); }
    finally{ setLoading(false); }
  },[email,password,login,navigate]);

  return (
    <Box sx={{maxWidth:420, mx:'auto', mt:6}}>
      <Paper sx={{p:3}} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        {msg && <Alert severity="error" sx={{mb:2}}>{msg}</Alert>}
        <Box component="form" onSubmit={onSubmit} sx={{display:'grid', gap:2}}>
          <Field label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Field label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button type="submit" variant="contained" disabled={loading}>{loading?'Please wait…':'Login'}</Button>
        </Box>
        <Typography variant="body2" align="center" sx={{mt:2}}>No account? <Link to="/signup">Sign up</Link></Typography>
      </Paper>
    </Box>
  );
}

export function SignupForm(){
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');

  const onSubmit = useCallback(async (e)=>{
    e.preventDefault();
    setMsg('');
    if(name.trim().length<2) return setMsg('Please enter your name');
    if(!validateEmail(email)) return setMsg('Invalid email');
    if(password.length<6) return setMsg('Password too short (min 6)');
    try{
      setLoading(true);
      await new Promise(r=>setTimeout(r,250));
      signup(name,email,password);
      alert('Signed up successfully');
      navigate('/');
    }catch(err){ setMsg(err.message); }
    finally{ setLoading(false); }
  },[name,email,password,signup,navigate]);

  return (
    <Box sx={{maxWidth:420, mx:'auto', mt:6}}>
      <Paper sx={{p:3}} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>Create account</Typography>
        {msg && <Alert severity="error" sx={{mb:2}}>{msg}</Alert>}
        <Box component="form" onSubmit={onSubmit} sx={{display:'grid', gap:2}}>
          <Field label="Name" value={name} onChange={e=>setName(e.target.value)} />
          <Field label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Field label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button type="submit" variant="contained" disabled={loading}>{loading?'Please wait…':'Sign up'}</Button>
        </Box>
        <Typography variant="body2" align="center" sx={{mt:2}}>Already have an account? <Link to="/login">Log in</Link></Typography>
      </Paper>
    </Box>
  );
}
