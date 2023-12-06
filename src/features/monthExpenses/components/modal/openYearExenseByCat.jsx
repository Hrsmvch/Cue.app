/* eslint-disable no-unused-vars */
 
import styles from './settings.module.scss';    
import { useDispatch, useSelector } from 'react-redux';
 
// import { ReactComponent as CalendarIcon } from "../../assets/CalendarIcon.svg"; 
import { useYearExpensesByCat } from '../../hooks/useYearExpensesByCat,js';

const OpenYearExpensesByCat = () => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const { modalData } = useSelector((state) => state.modal);  
  const { data } = useYearExpensesByCat({year: currentYear, id: modalData});   
  console.log('data: ', data); 

  return (
    <div className={styles.container__sm} onClick={(event) => event.stopPropagation()}> 
      <div className={styles.heading}>
        {/* <CalendarIcon /> */}
        <div className={styles.title}>Year expenses of {data?.data?.category?.name} category</div> 
        <div>
          {data?.data?.categoryData?.map(item => {
            return (
              <h2 key={item.month}>{item.month} - {item.amount}</h2>
            )
          })}
        </div>
      </div> 

       
    </div>
  )
}

export default OpenYearExpensesByCat