/* eslint-disable no-unused-vars */
import { Bar } from 'react-chartjs-2';
import { useGetLastWeekPaymentsQuery } from './service/lastWeekPayments';
import moment from "moment";
import styles from './finance.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinanceByWeek = () => {

  const {data : payments} = useGetLastWeekPaymentsQuery();
  console.log('data: ', payments?.data);

  const renderData = () => {
    const daysPeriod = payments?.data?.sumOfTransactions[0]?.period;  
    const endDate = moment(daysPeriod?.endData);
    const startDate = moment(daysPeriod?.startData);

    if (endDate.isSame(startDate, 'month')) {   
      return `${moment(startDate).format("D")} - ${moment(endDate).format("D MMM")}`
    } else {
      return `${moment(startDate).format("D MMM")} - ${moment(endDate).format("D MMM")}`
    } 
  }

  const renderAmount = () => {
    const amount = payments?.data?.sumOfTransactions[0]?.totalAmount;
    const balanceData = amount ? amount.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(',', ' ') + '.00' : '0.00';  

    return balanceData; 
  }
 

  const [data, setData] = useState(null);
  const [maxValue, setMaxValue] = useState(0); 
  const [stepSize, setStepSize] = useState(1000);
  const [roundedMaxValue, setRoundedMaxValue] = useState(0); 
  console.log('roundedMaxValue: ', roundedMaxValue);

  const largestAmount = payments?.data?.sumByDays.reduce((max, obj) => {
    return obj.amount > max ? obj.amount : max;
  }, 0);

  useEffect(() => {  
    setTimeout(() => { 

      const fetchedData = {
        labels: payments?.data?.sumByDays?.map(item => moment(item.paymentDate).format("D. MMM")),
        datasets: [
          {
            backgroundColor: "#E34E4E",
            borderRadius: '8',
            data: payments?.data?.sumByDays?.map(item => item.amount + (largestAmount * 0.03)),
            borderWidth: 1,
            borderSkipped: false,
          },
        ],
      }; 

      const maxValue = Math.max(...fetchedData.datasets[0].data);
      const roundedMaxValue =
        Math.ceil(maxValue / stepSize) * stepSize;
 
        setMaxValue(maxValue);
        setRoundedMaxValue(roundedMaxValue); 
        setData(fetchedData);

    }, 1000); 

  }, [payments, maxValue]);

  if (!data) {
    return '';
  }

  // const labels = payments?.data?.sumByDays?.map(item => moment(item.paymentDate).format("D. MMM"));  


  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       backgroundColor: "#E34E4E",
  //       borderRadius: '8',
  //       data: payments?.data?.sumByDays?.map(item => item.amount + 50),
  //       borderWidth: 1,
  //       borderSkipped: false, 
  //     },
  //   ], 
  // };  
 
  // const maxValue = Math.max(...data.datasets[0].data);
  // const stepSize = 1000; 
  // const roundedMaxValue = Math.ceil(maxValue / stepSize) * stepSize;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (xDatapoint) => {return (xDatapoint.raw)},
          label: (tooltipItem) => {
            const originalValue = tooltipItem.raw;
            const modifiedValue = originalValue - (largestAmount * 0.03);
       
            const formattedValue = payments?.data?.sumOfTransactions[0]?.currencySymbol + ' ' + modifiedValue.toFixed(2);
            return formattedValue;
          },
          
        }
      }
    },
   
    scales: {  
      x: {  
        grid: { tickBorderDash: 1000, display: false },
        display: false, 
      },
      y: { 
        grid: { 
          display: false,
        },
        display: true,   
        ticks: {
          beginAtZero: true,
          stepSize: largestAmount != 0 ?  (roundedMaxValue / 2) : 500,
          max: largestAmount != 0 ? roundedMaxValue : 1000, 
        },
      }
    }

  }; 

 

  const BarChart = () => { 
    return (
      <div className={styles.bars_container}>
        {payments?.data && data && 
          <Bar 
            options={options} 
            data={data} 
            width={100} 
            height={100}   
          />
        }
      </div>
    );
  };

  return (
    <div className={styles.week_overview}>
      <div className={styles.week_period}>Last days: {renderData()}</div>
      <div className={styles.week_sum}>{renderAmount()} <span>{payments?.data?.sumOfTransactions[0]?.currencySymbol}</span></div>
      {largestAmount != 0 ? <BarChart /> : (
        <>
        <div className={styles.no_data}>You don`t have payments yet. Please create a payment to see charts with weeks payments</div>
        </>
      )}
       
    </div>
  )
}

export default FinanceByWeek