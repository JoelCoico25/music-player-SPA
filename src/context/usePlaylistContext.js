import { useContext } from "react";
import { PlaylistContext } from "@context/playlistContext";

export const usePlaylistContext = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) {
    throw new Error("usePlaylistContext must be used within a PlaylistProvider");
  }
  return ctx;
};
