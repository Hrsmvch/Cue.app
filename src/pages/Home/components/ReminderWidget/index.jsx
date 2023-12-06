import styles from './reminder.module.scss';
import { Link } from 'react-router-dom';

const Reminder = () => {
  return (
    <div className={`${styles.remainder}`}>
      <div className={styles.title}>Reminder</div>
      <div className={styles.wrapper}>
        <div className={styles.main_title}>It`s time to pay your bills.</div>
        <div className={styles.sub_title}>    
          Some text. Some text. Some text. 
          <Link to='/finances'>Request a payment.</Link>
        </div>
      </div>
    </div>
  )
}

export default Reminder