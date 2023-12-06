import styles from './totalExpenses.module.scss'; 

const TotalExpensesWidget = () => {

  const balance = null;

  return (
    <div className={`${styles.total}`}> 
      <div className={`${styles.title} ${styles.expenses}`}>
        Total Expenses | month : 
        <div className={styles.total_expenses}>₴ {balance?.data?.expanses[0]?.amount || 0}</div>
      </div>
      
      
      <div className={styles.title}>Current balance</div>
      <div className={styles.balances}>
        <div className={styles.balance_item}>
          <div className={styles.balance_currency}>EUR</div>
          <div className={styles.interval_sum}>₴ 0</div>
        </div>
        <div className={styles.balance_item}>
          <div className={styles.balance_currency}>USD</div>
          <div className={styles.interval_sum}>₴ 0</div>
        </div>
        <div className={styles.balance_item}>
          <div className={styles.balance_currency}>UAH</div>
          <div className={styles.interval_sum}>₴ 0</div>
        </div>
      </div>
       
    </div>
  )
}

export default TotalExpensesWidget