import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback((track) => {
    setCurrent(track);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
        setPlaying(true);
      }
    });
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [playing]);

  const value = useMemo(
    () => ({ current, playing, play, toggle }),
    [current, playing, play, toggle]
  );

  const bar = (
    <div
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 16,
        zIndex: 1000,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "95%",
        maxWidth: 560,
      }}
    >
      <audio ref={audioRef} />
      <img
        src={current?.artwork}
        alt=""
        style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {current?.title || "Nothing playing"}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {current?.artist || "Select a song to play"}
        </div>
      </div>
      <button
        onClick={toggle}
        disabled={!current}
        style={{
          padding: "8px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {bar}
    </PlayerContext.Provider>
  );
}
