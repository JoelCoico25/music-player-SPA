import React, { useState } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ val = 0, maxValue = 200 }) => {
  const [value, setValue] = useState(val);
  const [showTooltip, setShowTooltip] = useState(false);

  // formato mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const percentage = (value / maxValue) * 100;

  return (
    <section className={styles.progressContainer}>
      <input
        type="range"
        min={0}
        max={maxValue}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseDown={() => setShowTooltip(true)}
        onMouseUp={() => setShowTooltip(false)}
        className={styles.progressBar}
      />

      <div
        className={`${styles.timeIndicator} ${
          showTooltip ? styles.showTooltip : ""
        }`}
        style={{ left: `calc(${percentage}% - 20px)` }}
      >
        {formatTime(value)}
      </div>

      <div className={styles.timeStamps}>
        <span>0:00</span>
        <span>{formatTime(maxValue)}</span>
      </div>
    </section>
  );
};

export default ProgressBar;
