import React, { useMemo } from "react";
import styles from "@components/ProgressBar/ProgressBar.module.css";

const ProgressBar = ({ value = 0, maxValue = 200, onChange }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  // formato mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const percentage = useMemo(() => (maxValue ? (value / maxValue) * 100 : 0), [value, maxValue]);

  return (
    <section className={styles.progressContainer}>
      <input
        type="range"
        min={0}
        max={maxValue}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
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
        <span>{formatTime(value)}</span>
        <span>{formatTime(maxValue)}</span>
      </div>
    </section>
  );
};

export default ProgressBar;
