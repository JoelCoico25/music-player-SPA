import Banner from "@components/Banner/Banner";
import Controls from "@components/Controls/Controls";
import ProgressBar from "@components/ProgressBar/ProgressBar";
import BannerFile from "@components/BannerFile/BannerFile";
import { usePlaylistContext } from "@context/usePlaylistContext";

const MusicPlayer = () => {
  const { isPlaying, currentTrack, currentTime, duration, seekTo } = usePlaylistContext();

  return (
    <>
      <Banner
        state={isPlaying ? "playing" : currentTrack ? "paused" : "none"}
        song={currentTrack?.title || currentTrack?.name || ""}
        artist={currentTrack?.artist || ""}
        album={currentTrack?.album || ""}
        coverUrl={currentTrack?.coverUrl || ""}
      />
      {console.log(currentTrack)}
      <ProgressBar 
        value={Math.floor(currentTime)}
        maxValue={Math.max(0, Math.floor(duration || 0))}
        onChange={(val) => seekTo(val)}
      />
      <Controls />
      <BannerFile />
    </>
  );
};

export default MusicPlayer;
