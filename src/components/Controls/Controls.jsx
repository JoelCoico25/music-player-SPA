 
 import styles from './Controls.module.css';
 import { FaRandom } from "react-icons/fa";
 import { PiRepeatOnceDuotone } from "react-icons/pi";
 import { BsArrowRepeat } from "react-icons/bs";
 import ProgressBarVolume from '../ProgressBarVolume/ProgressBarVolume';
 import PlayerControls from '../PlayerControls/PlayerControls';
 import { useState } from 'react';

 const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <section className={styles.controlsContainer}>
      <div className={styles.playlistControls}>
        <button><FaRandom size={46} color='gray'/></button>
        <button><PiRepeatOnceDuotone size={46} color='gray' /></button>
      </div>
      <section className={styles.playerControls}>
          <PlayerControls state={isPlaying} setState={setIsPlaying} />
      </section>
      <div className={styles.playbackControls}>
        <button><BsArrowRepeat size={46} color='gray' /></button>
      </div>
      <div className={styles.volumeControl}>
        <ProgressBarVolume />
      </div>
    </section>
  )
}

export default Controls;