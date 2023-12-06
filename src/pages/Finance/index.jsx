import UserInfo from "components/UserInfo"
import PageTitle from "components/PageTitle"
import DefaultHeader from "layouts/DefaultHeader"
import styles from './Finance.module.scss'
import CardManagement from "../../features/cardManagement"
import Transactions from "../../features/transactions"
import CreatePaymentBtn from "../../features/CreatePayment"
import AnalyticsBtn from "./components/AnalyticsBtn"
import FinanceByWeek from "../../features/financeByWeek"
import MoneyExchange from "../../features/moneyExchange"
import FinanceCardAnalytics from "../../features/financeCardAnalytics"
import MonthExpenses from "../../features/monthExpenses"

const Finance = () => { 
  return (
    <div className={styles.finance_page}>
      <div className={styles.card_container}>
        <DefaultHeader>
          <PageTitle title="Finance" />
        </DefaultHeader>
        <CardManagement />
        <Transactions />
      </div>

      <div className={styles.finances_container}>
        <DefaultHeader >
          <CreatePaymentBtn /> 
          <AnalyticsBtn />
          <UserInfo />
        </DefaultHeader>   
        <div className={styles.row}>
            <FinanceByWeek />
            <MoneyExchange />
        </div> 
        <FinanceCardAnalytics />
        <MonthExpenses />
      </div>
    </div>
  );
}

export default Finance