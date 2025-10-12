import { useMemo } from "react";
import styles from "@components/ProgressBarVolume/ProgressBarVolume.module.css";
import {
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";
import { usePlaylistContext } from "@context/usePlaylistContext";

const ProgressBarVolume = () => {
  const { volume, isMuted, setVolume, toggleMute } = usePlaylistContext();

  const percent = useMemo(() => Math.round((isMuted ? 0 : volume) * 100), [volume, isMuted]);

  return (
    <div className={styles.volumeContainer}>
      <button type="button" aria-label={isMuted ? "Unmute" : "Mute"} onClick={toggleMute} className={styles.icon}>
        {percent === 0 ? (
          <FaVolumeMute size={24} color="#ff2ed1" />
        ) : percent > 0 && percent <= 30 ? (
          <FaVolumeOff size={24} color="#ff2ed1" />
        ) : percent > 30 && percent <= 60 ? (
          <FaVolumeDown size={24} color="#00eaff" />
        ) : (
          <FaVolumeUp size={24} color="#00eaff" />
        )}
      </button>

      <input
        type="range"
        id="volume-slider"
        min="0"
        max="100"
        value={percent}
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        className={styles.slider}
      />
    </div>
  );
};

export default ProgressBarVolume;
