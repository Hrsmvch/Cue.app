import { useEffect, useState } from 'react';
import styles from './card.module.scss' 
import { balanceApi } from './service/balanceSlice';
import { useDispatch } from 'react-redux';
import { modalOpen } from 'services/modalSlice'; 


const CardManagement = () => {

  const dispatch = useDispatch(); 
  const { data : balance } = balanceApi.useGetBalanceQuery(); 
  const [currentCurrency, setCurrentCurrency] = useState();

  useEffect(() => {
    setCurrentCurrency(balance?.data?.currencies[0]?.currency)
  },[balance]) 


  const handleAddCurrency = () => dispatch( modalOpen({ modalType: 'addCurrency' }));
  const handleUpdateBalance = () => dispatch( modalOpen({ modalType: 'updateBalance' }));

  return (
    <div className={styles.card_management}>
      <div className={styles.heading}>
        <div className={styles.card_management_title}>{`Card management`}</div>
        <div className={styles.add_balance} onClick={() => handleUpdateBalance()}>+</div>
      </div>
      <div className={styles.card}>
        <div className={styles.card_heading}>
          <div className={styles.card_name}>{`Cue.Ink`}</div>
          <div className={styles.card_number}>{`**** 0000`}</div>
        </div>
        <div className={styles.card_balance}>
          { new Intl.NumberFormat().format(balance?.data?.currencies?.find((item) => item.currency == currentCurrency)?.amount || 0)}
            <span>{ balance?.data?.currencies?.find((item) => item.currency == currentCurrency)?.symbol}</span>
        </div>
        <div className={styles.card_date}>{`01/24`}</div>
      </div>
      <div className={styles.currency_wrapper}>
        <div className={styles.currency}>
          {balance?.data?.currencies?.map((item, index) => (
            <div
              key={index} 
              className={`${styles.currency_item} ${currentCurrency === item.currency && styles.active}`}
              onClick={() => setCurrentCurrency(item.currency)}  
            >{item.currency}</div>
          ))}
        </div>
          <div className={styles.addCurrency} onClick={() => handleAddCurrency()}>+</div>  
      </div>
    </div>
  )
}

export default CardManagement