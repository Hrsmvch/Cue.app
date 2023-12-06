import styles from './bar.module.scss'; 

const CircularProgressBar = ({ percentage }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const excessPercentage = Math.max(0, percentage - 100);
  const strokeDashoffset = excessPercentage ? 0 : circumference - (percentage / 100) * circumference;

  let strokeColor;
  if (percentage < 50) {
    strokeColor = '#6E8658';
  } else if (percentage >= 50 && percentage <= 100) {
    strokeColor = '#FEC868';
  } else {
    strokeColor = '#ff4141';
  }

  return (
    <svg className={styles.CircularProgressBar} viewBox="0 0 52 52">
      <circle className={styles.CircularProgressBar_background} cx="26" cy="26" r={radius} />
      <circle
        className={styles.CircularProgressBar_progress}
        cx="26"
        cy="26"
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        style={{ stroke: strokeColor, transform: `rotate(-90deg) translate(-100%, 0)` }}
      />
      <text className={styles.CircularProgressBar_text} x="26" y="26">
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
