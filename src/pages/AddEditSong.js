import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Stack, Avatar } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getUserDataKey(email){ return `mm_user_data_${email}`; }

export default function AddEditSong(){
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const { user } = useAuth();
  const location = useLocation();

  const [data,setData]=useState(()=>{
    const raw = localStorage.getItem(getUserDataKey(user.email));
    return raw ? JSON.parse(raw) : { pageName:'My Song Page', songs: [] };
  });

  const initial = useMemo(()=>{
    if (editing) return data.songs.find(s=>String(s.id)===String(id)) || {};
    const fromApi = location.state?.fromApi || {};
    return {
      id: fromApi.id || Date.now(),
      title: fromApi.title || '',
      artist: fromApi.artist || '',
      artwork: fromApi.artwork || '',
      url: fromApi.url || '',
      year: fromApi.year || ''
    };
  },[editing, id, data.songs, location.state]);

  const [form,setForm]=useState(initial);
  useEffect(()=>{ setForm(initial); },[initial]);

  const save = useCallback((e)=>{
    e.preventDefault();
    if(!form.title || !form.artist){ alert('Title and Artist are required'); return; }
    if(editing){
      const songs = data.songs.map(s=> String(s.id)===String(id) ? {...form, id: s.id} : s);
      const next = {...data, songs};
      localStorage.setItem(getUserDataKey(user.email), JSON.stringify(next));
      alert('Song updated');
      navigate('/page');
    } else {
      const songs = [...data.songs, {...form, id: form.id || Date.now()}];
      const next = {...data, songs};
      localStorage.setItem(getUserDataKey(user.email), JSON.stringify(next));
      alert('Song added');
      navigate('/page');
    }
  },[form, editing, id, data, navigate, user.email]);

  return (
    <Container maxWidth="sm" sx={{mt:3}}>
      <Paper sx={{p:3}}>
        <Typography variant="h6" gutterBottom>{editing? 'Edit Song' : 'Add New Song'}</Typography>
        <Box component="form" onSubmit={save} sx={{display:'grid', gap:2}}>
          <TextField label="Title" value={form.title||''} onChange={e=>setForm(f=>({...f,title:e.target.value}))} fullWidth size="small" />
          <TextField label="Artist" value={form.artist||''} onChange={e=>setForm(f=>({...f,artist:e.target.value}))} fullWidth size="small" />
          <TextField label="Year" value={form.year||''} onChange={e=>setForm(f=>({...f,year:e.target.value}))} fullWidth size="small" />
          <TextField label="Artwork URL" value={form.artwork||''} onChange={e=>setForm(f=>({...f,artwork:e.target.value}))} fullWidth size="small" />
          <TextField label="Preview Audio URL" value={form.url||''} onChange={e=>setForm(f=>({...f,url:e.target.value}))} fullWidth size="small" />
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar variant="rounded" src={form.artwork} sx={{width:56,height:56}}/>
            <Button variant="outlined" onClick={()=>{ if(form.url) new Audio(form.url).play(); }}>Test Play</Button>
            <Box sx={{flex:1}} />
            <Button type="submit" variant="contained">{editing?'Save Changes':'Add Song'}</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
