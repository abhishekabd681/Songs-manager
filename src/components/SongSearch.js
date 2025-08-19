import React, { memo, useCallback, useState } from 'react';
import { Grid, Paper, TextField, Button, Avatar, Typography, Stack } from '@mui/material';
import { searchItunes } from '../services/itunes';

export default memo(function SongSearch({ onAdd, onPlay }){
  const [q,setQ]=useState('');
  const [loading,setLoading]=useState(false);
  const [results,setResults]=useState([]);

  const doSearch = useCallback(async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const items = await searchItunes(q || 'top songs');
      setResults(items);
    }finally{ setLoading(false); }
  },[q]);

  return (
    <>
      <form onSubmit={doSearch} style={{display:'flex', gap:8}}>
        <TextField fullWidth size="small" label="Search by song, artist, album" value={q} onChange={e=>setQ(e.target.value)} />
        <Button variant="contained" disabled={loading} type="submit">{loading?'Searching…':'Search'}</Button>
      </form>
      <Grid container spacing={2} sx={{mt:1}}>
        {results.map((r)=>(
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Paper sx={{p:2, display:'flex', gap:1}}>
              <Avatar variant="rounded" src={r.artwork} alt="" sx={{width:56,height:56}}/>
              <div style={{flex:1, minWidth:0}}>
                <Typography noWrap fontWeight={600}>{r.title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{r.artist} {r.year?`• ${r.year}`:''}</Typography>
                <Stack direction="row" spacing={1} sx={{mt:1}}>
                  <Button size="small" variant="outlined" onClick={()=>onPlay(r)}>Play</Button>
                  {onAdd && <Button size="small" variant="contained" onClick={()=>onAdd(r)}>Add</Button>}
                </Stack>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
});
