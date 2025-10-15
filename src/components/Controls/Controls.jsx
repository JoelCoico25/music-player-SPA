import styles from '@components/Controls/Controls.module.css';
import { FaRandom } from "react-icons/fa";
import { PiRepeatOnceDuotone } from "react-icons/pi";
import { BsArrowRepeat } from "react-icons/bs";
import ProgressBarVolume from '@components/ProgressBarVolume/ProgressBarVolume';
import PlayerControls from '@components/PlayerControls/PlayerControls';
import { useCallback, useState } from 'react';
import { usePlaylistContext } from "@context/usePlaylistContext";

const Controls = () => {
  const { isPlaying, playlist, currentTrack, playTrack, pauseTrack, resumeTrack, nextTrack, prevTrack, restartPlaylist, isShuffle, repeatOne, toggleShuffle, toggleRepeatOne } = usePlaylistContext();
  const [restartActive, setRestartActive] = useState(false);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
      return;
    }
    if (currentTrack) {
      resumeTrack();
      return;
    }
    if (playlist.length > 0) {
      playTrack(0);
    }
  }, [isPlaying, pauseTrack, resumeTrack, currentTrack, playlist, playTrack]);

  const handleRestart = useCallback(() => {
    restartPlaylist();
    setRestartActive(true);
    window.setTimeout(() => setRestartActive(false), 300);
  }, [restartPlaylist]);
  return (
    <section className={styles.controlsContainer}>
      <div className={styles.playlistControls}>
        <button type="button" style={{background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={toggleShuffle} aria-pressed={isShuffle} aria-label="Alternar reproducción aleatoria">
          <FaRandom size={46} color={isShuffle ? '#ff2ed1' : 'gray'} />
        </button>
        <button type="button" style={{background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={toggleRepeatOne} aria-pressed={repeatOne} aria-label="Alternar repetir una vez">
          <PiRepeatOnceDuotone size={46} color={repeatOne ? '#ff2ed1' : 'gray'} />
        </button>
      </div>
      <section className={styles.playerControls}>
          <PlayerControls 
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onPrev={prevTrack}
            onNext={nextTrack}
          />
      </section>
      <div className={styles.playbackControls}>
        <button type="button" style={{background: 'transparent', border: 'none', cursor: 'pointer'}} onClick={handleRestart} aria-label="Reiniciar pista">
          <BsArrowRepeat size={46} color={restartActive ? '#ff2ed1' : 'gray'} />
        </button>
      </div>
      <div className={styles.volumeControl}>
        <ProgressBarVolume />
      </div>
    </section>
  )
}

export default Controls;