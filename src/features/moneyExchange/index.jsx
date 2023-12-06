import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ReactComponent as ReviewIcon } from './assets/review.svg';
import customStyles from "components/FormElements/customSelectStyles";


import styles from './moneyExchange.module.scss';
import { balanceApi } from '../cardManagement/service/balanceSlice';
import { useAddSalary } from './hooks/useAddSalary';
import { useExchangeMoney } from './hooks/useExchangeMoney';

const MoneyExchange = () => {
  const { data : balance } = balanceApi.useGetBalanceQuery();  
  
  const [activeTab, setActiveTab] = useState("exchange");
  const [fromCurrency, setFromCurrency] = useState(null); 
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(''); 
  
  useEffect(() => {
    if (balance && balance.data) {
      setFromCurrency(balance.data.currencies[0]?.currency); 
      setToCurrency(balance.data.majorCurrency?.currency);
    }
  }, [balance]);

  const { addSalaryData } = useAddSalary()
  const { exchange } = useExchangeMoney()
   
   
  // const [ addSalary, { isLoading : isLoadingSalary }  ] = salaryApi.useAddSalaryMutation();
  // const [ exchangeMoney, { isLoading : isLoadingExchange }  ] = exchangeApi.useExchangeMoneyMutation();
 
  const currencies = balance?.data?.currencies?.map(item => ({
    value: item?.currency,
    label: item?.currency,
  }));
  
 
    const onSwitchTabs = (tab) => {
      setAmount('');
      setActiveTab(tab)
    } 

    async function handleIncomes() {
      const data = { 
        amount: Number(amount), 
        currency: fromCurrency, 
        currencySymbol: balance?.data?.currencies?.find(it => it.currency === fromCurrency)?.symbol}
         
      await addSalaryData(data);
      setAmount(''); 
    }
    

    async function handleExchange (){
      const data = {amount: Number(amount), fromCurrency: fromCurrency, toCurrency: toCurrency}
      exchange(data);
      setAmount('');  
    }

  return (
    <div className={styles.exchange_income_tab}>
      <div className={styles.tabs_heading}>
        <div 
          className={`${styles.tab_name} ${activeTab === 'exchange' && styles.active_tab}`} 
          onClick={() => onSwitchTabs('exchange')}>Exchange</div>
        <div
          className={`${styles.tab_name} ${activeTab === 'income' && styles.active_tab}`} 
          onClick={() => onSwitchTabs('income')}>Income</div>
      </div>

      <div className={styles.tabs_content}>
        { activeTab === 'exchange' && (
          <>

            <div className={`${styles.group_currency}`}> 
              <Select
                name='from' 
                styles={customStyles}
                options={currencies}
                onChange={(selected) => setFromCurrency(selected.value)}
                placeholder={`Choose a currency`}
                value={currencies?.find(it => it.value === fromCurrency)}
                className={styles.select__input}
                components={{ IndicatorSeparator: () => null }}
                /> 

              <Select
                name='to' 
                styles={customStyles}
                options={currencies}
                onChange={(selected) => setToCurrency(selected.value)}
                placeholder={`Choose a currency`}
                value={currencies?.find(it => it.value === toCurrency)}
                className={styles.select__input}
                components={{ IndicatorSeparator: () => null }}
                /> 
            </div>

            <input 
              min={0} 
              type="number" 
              value={amount} 
              className={styles.simple__input} 
              placeholder='Amount' 
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") e.preventDefault();
              }}
              onChange={(e) => setAmount(e.currentTarget.value)} 
            /> 
 
            <button disabled={!amount} className={styles.review} onClick={handleExchange}>
              {/* {isLoadingExchange ? <Loader /> : <ReviewIcon />}  */}
              <ReviewIcon />
              Review</button>

          </>
        )}

        { activeTab === 'income' && (
          <>
            <div className={`${styles.group_currency} ${styles.single}`}> 
              <Select
                name='type' 
                styles={customStyles}
                options={currencies}
                onChange={(selected) => setFromCurrency(selected.value)}
                placeholder={`Choose a currency`}
                value={currencies?.find(it => it.value === fromCurrency)}
                className={styles.select__input}
                components={{ IndicatorSeparator: () => null }}
                /> 
                </div>

                <input 
                  min={0} 
                  type="number" 
                  value={amount} 
                  className={styles.simple__input} 
                  placeholder='Amount' 
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                  onChange={(e) => setAmount(e.currentTarget.value)} 
                /> 

            <button disabled={!amount} className={styles.review} onClick={handleIncomes}>
              {/* {isLoadingSalary ? <Loader /> : <ReviewIcon />}  */}
              <ReviewIcon />
              Review </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MoneyExchange