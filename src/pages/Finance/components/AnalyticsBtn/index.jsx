import { ReactComponent as Icon } from '../../assets/analytics.svg';
import styles from '../../Finance.module.scss';

const AnalyticsBtn = () => {
  return (
    <button className={`${styles.action_button} ${styles.circle}`} onClick={() => console.log('Analytics!')}><Icon /></button>
  )
}

export default AnalyticsBtn