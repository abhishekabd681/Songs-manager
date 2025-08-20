import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import Filters from "../components/Filters";
import SongTable from "../components/SongTable";
import { Link } from "react-router-dom";

function getUserDataKey(email) {
  return `mm_user_data_${email}`;
}
function initUserData() {
  return {
    pageName: "Song List Page",
    songs: [
      // {
      //   id: 1,
      //   title: "Sample Song One",
      //   artist: "Demo Artist",
      //   year: 2019,
      //   artwork:
      //     "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/58/7b/0f/587b0fe6-1d4a-8c54-2fcc-9a0f69b79b3a/859746759230_cover.jpg/300x300bb.jpg",
      //   url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/1d/4d/2a/1d4d2a2b-0ae1-5dfe-7f4a-4a3c8d25db44/mzaf_14622198010500707449.plus.aac.p.m4a",
      // },
    ],
  };
}

export default function MySongPage() {
  const { user } = useAuth();
  const { play } = usePlayer();
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(getUserDataKey(user.email));
    return raw ? JSON.parse(raw) : initUserData();
  });
  const [filter, setFilter] = useState({
    singer: "",
    alpha: "",
    from: "",
    to: "",
    q: "",
  });

  useEffect(() => {
    localStorage.setItem(getUserDataKey(user.email), JSON.stringify(data));
  }, [data, user.email]);

  const years = useMemo(() => {
    const ys = Array.from(
      new Set((data.songs || []).map((s) => s.year).filter(Boolean))
    );
    ys.sort((a, b) => b - a);
    return ys;
  }, [data.songs]);

  const filtered = useMemo(() => {
    return (data.songs || []).filter((s) => {
      const singerOk = filter.singer
        ? s.artist.toLowerCase().includes(filter.singer.toLowerCase())
        : true;
      const alphaOk = filter.alpha
        ? (s.title || "").toUpperCase().startsWith(filter.alpha)
        : true;
      const fromOk = filter.from ? (s.year || 0) >= Number(filter.from) : true;
      const toOk = filter.to ? (s.year || 9999) <= Number(filter.to) : true;
      const qOk = filter.q
        ? (s.title || "").toLowerCase().includes(filter.q.toLowerCase()) ||
          (s.artist || "").toLowerCase().includes(filter.q.toLowerCase())
        : true;
      return singerOk && alphaOk && fromOk && toOk && qOk;
    });
  }, [data.songs, filter]);

  const onDelete = useCallback((id) => {
    if (window.confirm("Delete this song?")) {
      setData((d) => ({ ...d, songs: d.songs.filter((s) => s.id !== id) }));
    }
  }, []);

  const renamePage = useCallback(() => {
    const name = window.prompt("Enter new page name", data.pageName);
    if (name && name.trim()) setData((d) => ({ ...d, pageName: name.trim() }));
  }, [data.pageName]);

  const deletePage = useCallback(() => {
    if (window.confirm("Delete the whole song page? This removes all songs.")) {
      setData(initUserData());
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">{data.pageName}</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={renamePage}>
            Rename Page
          </Button>
          <Button variant="contained" component={Link} to="/page/add">
            Add Song
          </Button>
        </Stack>
      </Stack>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search within your page
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by song name or artist"
          value={filter.q || ""}
          onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <SongTable
          songs={filtered}
          onPlay={play}
          onDelete={onDelete}
          basePath="/page"
        />
      </Paper>
    </Container>
  );
}
