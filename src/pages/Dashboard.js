import React, { useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import SongSearch from '../components/SongSearch';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const { play } = usePlayer();
  const navigate = useNavigate();

  const handleAdd = useCallback((song)=>{
    navigate('/page/add', { state: { fromApi: song } });
  },[navigate]);

  return (
    <Container maxWidth="lg" sx={{mt:3}}>
      <Typography variant="h5" gutterBottom>Discover & Play</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>Search the iTunes catalog, preview tracks, and add them to your song page.</Typography>
      <SongSearch onAdd={handleAdd} onPlay={play} />
    </Container>
  );
}
