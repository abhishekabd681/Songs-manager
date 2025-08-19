import React, { memo } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, IconButton, Avatar, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default memo(function SongTable({ songs, onPlay, onDelete, basePath='/page' }){
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Song</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Year</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {songs.map((s)=> (
          <TableRow key={s.id} hover>
            <TableCell>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar variant="rounded" src={s.artwork} alt="" />
                <span>{s.title}</span>
              </Stack>
            </TableCell>
            <TableCell>{s.artist}</TableCell>
            <TableCell>{s.year || '-'}</TableCell>
            <TableCell>
              <IconButton onClick={()=>onPlay(s)} size="small"><PlayArrowIcon/></IconButton>
              <IconButton component={Link} to={`${basePath}/edit/${s.id}`} size="small"><EditIcon/></IconButton>
              {onDelete && <IconButton onClick={()=>onDelete(s.id)} size="small" color="error"><DeleteIcon/></IconButton>}
            </TableCell>
          </TableRow>
        ))}
        {songs.length===0 && (
          <TableRow><TableCell colSpan={4} align="center">No songs</TableCell></TableRow>
        )}
      </TableBody>
    </Table>
  );
});
