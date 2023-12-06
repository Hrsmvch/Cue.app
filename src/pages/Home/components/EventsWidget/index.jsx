import { Link } from "react-router-dom";
import { eventsApi } from "features/events/services/eventsSlice";
import moment from "moment";
import classNames from "utils/classNames";
import styles from "./events.module.scss";

import { ReactComponent as Icon } from "assets/icons/arrowDown.svg";

const EventsWidget = ({ active, handleOpenWidget }) => {

  const { data: upcomingEvents } = eventsApi.useGetUpcomingEventsQuery(); 

  const widgetClasses = classNames([], {
    [styles.events]: true,
    [styles.active]: active === "events" }, []
  );

  const normalizeDate = (start, end) => {
    const startDate = moment(start).format("DD. MMM");
    const startTime = moment(start).format("HH:MM");

    const endDate = moment(end).format("DD. MMM");
    const endTime = moment(end).format("HH:MM");

    if (start === end) {
      return moment(start).format("DD. MMM HH:MM");
    }
    if (startDate === endDate) {
      return `${startDate} ${startTime} - ${endTime}`;
    }
    return `${startDate} ${startTime} - ${endDate} ${endTime}`;
  };
  return (
    <div className={widgetClasses}>
      <div className={styles.title} onClick={() => handleOpenWidget("events")}>
        Upcoming Events
        <button className={styles.btn_open}>
          <Icon />
        </button>
      </div>
      {upcomingEvents && upcomingEvents?.length > 0 ? (
        <div className={`${styles.wrapper}`}>
          {upcomingEvents?.map(
            ({ title, description, startDate, endDate }, index) => (
              <div className={`${styles.event_item}`} key={index}>
                <div className={styles.event_time}>
                  {normalizeDate(startDate, endDate)}
                </div>
                <div className={styles.event_title}>{title}</div>
                {description && (
                  <div className={styles.event_theme}>{description}</div>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <div className={`${styles.no_data} ${styles.wrapper}`}>
          You don`t have upcoming event for now. Go to{" "}
          <Link to="/calendar">Calendar page</Link> to create one.
        </div>
      )}
    </div>
  );
};

export default EventsWidget;
