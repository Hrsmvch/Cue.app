import styles from './widgets.module.scss';
// import styles from './FinanceAnalyticsYear.module.scss';
// import { ReactComponent as Arrow } from 'assets/icons/chevron_right.svg';
import { NavLink } from 'react-router-dom';
// import routes from '../../constants/routes'; 
import { Bar } from "react-chartjs-2";

const FinanceAnalyticsYear = () => {

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: "#454545",
        borderRadius: '40',
        data: [1000, 1000, 15000, 2000, 20000, 30000, 45000, 10000, 10000, 5000, 2000, 20000],  
        borderSkipped: false,
      },
    ],

    
    
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      }
    },
    scales: {
      y: {
        min: 0,
        max: 50000,
      }
    }
  };
  
  const BarChart = () => {
    return (
      <div className={styles.bar_container}>
        <Bar 
          options={options} 
          data={data} 
          width={100} 
          // height={300}   
          />
      </div>
    );
  };


  return (
    <div className={styles.finance_widget}>
      <div className={styles.heading}>
        <div className={styles.title}>Finance analytics</div>
        <NavLink className={styles.more} to={'/'}>
          More 
          {/* <Arrow /> */}
        </NavLink>
      </div>
      <BarChart />
    </div>
  )
}

export default FinanceAnalyticsYear