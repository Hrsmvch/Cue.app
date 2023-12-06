import moment from "moment/moment";
import { eventsApi } from "../../services/eventsSlice";
import styles from './UpcomingEvents.module.scss';

const UpcomingEvents = () => { 
  const { data: upcomingEvents } = eventsApi.useGetUpcomingEventsQuery();   
  
  const normalizeDate = (start, end) => {  
    const startDate = moment(start).format('DD. MMM')  
    const startTime = moment(start).format('HH:MM')  

    const endDate = moment(end).format('DD. MMM')  
    const endTime = moment(end).format('HH:MM')  
    
    if(start === end){
      return moment(start).format('DD. MMM HH:MM');
    }
    if(startDate === endDate){
      return `${startDate} ${startTime} - ${endTime}`;
    }
    return `${startDate} ${startTime} - ${endDate} ${endTime}`;
 
  };

  const renderPriorities = (priority) => { 
    if(priority === 'low'){
      return styles.low;
    }
    if(priority === 'medium'){
      return styles.medium;
    }
    if(priority === 'high'){
      return styles.high;
    }
    return styles.low;
  }

  return (
    <div className={styles.upcoming_events}> 
          <div className={styles.title}>Upcoming events</div>
          <div className={styles.sub_title}>{`Don't miss the schedule ...`}</div>

          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className={styles.events}>
              {upcomingEvents?.map(({title, description, startDate, endDate, priority}, index) => (
                <div className={`${styles.event_item} ${renderPriorities(priority)}`} key={index}>
                <div className={styles.event_time}>
                  {normalizeDate(startDate, endDate)}
                </div>
                <div className={styles.event_title}>{title}</div>
                {description && <div className={styles.event_theme}>{description}</div>}
                </div> 
              ))}
            </div>
          )}
       </div>
  )
}

export default UpcomingEvents