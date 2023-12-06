import { transactionsApi } from './service/transactionsSlice';
import styles from './transactions.module.scss'
import moment from "moment"; 
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { useRemoveTransaction } from './hooks/useRemoveTransaction';

const Transactions = () => { 
  const { data: payments } = transactionsApi.useGetLastPaymentQuery([]); 
  //36568
  const {remove} = useRemoveTransaction()
  
  return (
    <>
    {payments?.data?.length ? (
      <>
        <div className={styles.transaction_title}>Recent transaction</div>
        <div className={styles.recent_transactions}>
          {payments?.data && payments?.data.map((item, index) => {   
            const {amount, paymentDate, comment, category, currencySymbol, _id} = item;
            return (
              <div className={styles.transaction_item} key={index}> 
              <div className={styles.section_description}>
                <div className={styles.section_title}>{category.name} | {moment(paymentDate).format("D. MMMM")}</div>
                <div className={styles.section_coment}>{comment}</div>
              </div>
              <div className={styles.expense}> -{amount} {currencySymbol}</div>
              <div className={styles.actions}> 
                <TrashIcon 
                  className={styles.category_remove} 
                  onClick={() => remove(_id)} 
                  />
              </div> 
            </div> 
            )
          })} 
        </div>
        </>
    ): null}
    </>
  )
}

export default Transactions