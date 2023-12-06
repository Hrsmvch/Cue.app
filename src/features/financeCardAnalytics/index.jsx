import { ReactComponent as Icon } from "./assets/addToBalance.svg";
import styles from "./cards.module.scss";
import { currentBalanceApi } from "./services/currentBalanceSlice";

const FinanceCardAnalytics = () => { 
  const { data : balance } = currentBalanceApi.useGetCurrentBalanceQuery();  

  return (
    <div className={styles.fin_cards}>
      <div className={styles.item}>
        <div className={styles.title}>Total Expenses | month</div>
        <Icon className={styles.card_action} />
        <div className={styles.sum}>
          <span>{balance?.data?.expanses?.symbol} </span>
          {new Intl.NumberFormat().format(balance?.data?.expanses?.amount)}
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>Total Earning | month</div>
        <Icon className={styles.card_action} />
        <div className={styles.sum}>
          <span> {balance?.data?.salary?.symbol} </span>
          {new Intl.NumberFormat().format(balance?.data?.salary?.amount)}
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>Total Saving | month</div>
        <Icon className={styles.card_action} />
        <div className={styles.sum}>
          <span>{balance?.data?.saving?.symbol} </span>
          {new Intl.NumberFormat().format(balance?.data?.saving?.amount)}
        </div>
      </div>
    </div>
  );
};

export default FinanceCardAnalytics;
