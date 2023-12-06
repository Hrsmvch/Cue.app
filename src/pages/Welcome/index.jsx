import styles from './Welcome.module.scss';
import videoBg from '../../assets/videos/alb_cityscp103_1080p.mp4';

const Welcome = () => {
  return (
    <div className={styles.welcome_page}>
      <div className={styles.video_wrap}>
        <video src={videoBg} autoPlay loop muted className={styles.video_background} />
      </div>
      <h1 className={styles.content}>
        {`Unleash organization and empowerment. Seamlessly manage your calendar, receive notifications, take notes, and gain insights. 
      Achieve financial goals while staying on top of events. Elevate your life effortlessly.`}
      </h1>
    </div>
  )
}

export default Welcome