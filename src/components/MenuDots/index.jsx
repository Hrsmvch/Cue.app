import styles from './MenuDots.module.scss';

const MobileMenuDots = ({opened, handleOpenMenu}) => {
  return (
    <div className={`${styles.dots} ${opened ? `${styles.opened}` : ''}`} onClick={() => handleOpenMenu(!opened)}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  )
}

export default MobileMenuDots