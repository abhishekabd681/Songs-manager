import React, { memo } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

export default memo(function Filters({ filter, setFilter, years }){
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField fullWidth size="small" label="Filter by singer" value={filter.singer||''} onChange={(e)=>setFilter(f=>({...f, singer:e.target.value}))} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField select fullWidth size="small" label="Alphabet" value={filter.alpha||''} onChange={(e)=>setFilter(f=>({...f, alpha:e.target.value}))}>
          <MenuItem value="">All</MenuItem>
          {alphabet.map((ch)=> <MenuItem key={ch} value={ch}>{ch}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField select fullWidth size="small" label="From year" value={filter.from||''} onChange={(e)=>setFilter(f=>({...f, from:e.target.value}))}>
          <MenuItem value="">Any</MenuItem>
          {years.map((y)=> <MenuItem key={y} value={y}>{y}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField select fullWidth size="small" label="To year" value={filter.to||''} onChange={(e)=>setFilter(f=>({...f, to:e.target.value}))}>
          <MenuItem value="">Any</MenuItem>
          {years.map((y)=> <MenuItem key={y} value={y}>{y}</MenuItem>)}
        </TextField>
      </Grid>
    </Grid>
  );
});
