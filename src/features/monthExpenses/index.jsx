import CircularProgressBar from './components/CircularProgressBar';
import { ReactComponent as SettingIcon } from './assets/setting.svg';
import { modalOpen } from "services/modalSlice";
import styles from './expenses.module.scss'
import { useGetMonthExpensesQuery } from './service/expensesSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'; 

const MonthExpenses = () => { 
  const dispatch = useDispatch(); 
  const { data: expensesByCats } = useGetMonthExpensesQuery()   
  
  return (
    <div className={styles.expenses_overview}>
    <div className={styles.heading}>
      <div className={styles.title}>Expences overview</div>
      <div className={styles.expenses_actions}>  
        <AddIcon onClick={() => dispatch(modalOpen({modalType: 'createExpensesCategory'}))} />
        <SettingIcon onClick={() => dispatch(modalOpen({modalType: 'categoriesSettings'}))} />
      </div>
    </div>
    
    <div className={styles.cats}>
      {expensesByCats?.data?.length ? expensesByCats?.data
        .slice()
        .sort((a, b) => a.category.name.localeCompare(b.category.name))
        .map((cat, index) => {   
          const percentage = cat.category.limit ? Math.round((cat.expenseSum / cat.category.limit) * 100) : 0; 

          return (
          <div className={styles.cat_item} key={index} onClick={() => dispatch(modalOpen({modalType: 'openYearExpenseByCat', modalData: cat.category._id}))}>
            <div className={styles.graph}></div>
            <CircularProgressBar percentage={percentage} />
            <div className={styles.info}>
              <div className={styles.cat_name}>{cat.category.name}</div>
              <div className={styles.cat_sum}>{cat.expenseSum} UAH</div>
            </div>
          </div>
          )
      }) : null}  
    </div>
  </div> 
  )
}

export default MonthExpenses