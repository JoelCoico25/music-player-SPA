import { usePlaylist as usePlaylistHook } from "@hooks/usePlaylist";

import { PlaylistContext } from "@context/playlistContext";

export const PlaylistProvider = ({ children }) => {
  const value = usePlaylistHook();
  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  );
};
