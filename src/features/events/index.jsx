import CalendarSection from './components/Calendar'; 
import UpcomingEvents from './components/UpcomingEvents';
import './defaultEvents.scss';

const Events = () => {
  return (
    <div className={'page_content'}>
      <UpcomingEvents />
      <CalendarSection /> 
    </div>
  )
}

export default Events