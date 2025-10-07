import { useState } from "react";
import styles from "./ProgressBarVolume.module.css";
import {
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";

const ProgressBarVolume = () => {
  const [volume, setVolume] = useState(50);

  return (
    <div className={styles.volumeContainer}>
      <label htmlFor="volume-slider" className={styles.icon}>
        {volume === 0 ? (
          <FaVolumeMute size={24} color="#ff2ed1" />
        ) : volume > 0 && volume <= 30 ? (
          <FaVolumeOff size={24} color="#ff2ed1" />
        ) : volume > 30 && volume <= 60 ? (
          <FaVolumeDown size={24} color="#00eaff" />
        ) : (
          <FaVolumeUp size={24} color="#00eaff" />
        )}
      </label>

      <input
        type="range"
        id="volume-slider"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className={styles.slider}
      />
    </div>
  );
};

export default ProgressBarVolume;
