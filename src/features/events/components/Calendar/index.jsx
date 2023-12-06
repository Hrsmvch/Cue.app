/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import moment from "moment";
import styles from "./Calendar.module.scss";
import { eventsApi } from "../../services/eventsSlice";
import { modalOpen } from "services/modalSlice";
import { ReactComponent as CalendarIcon } from "../../assets/CreateEvent.svg";
import { useViewportCheck } from "hooks/useViewportCheck";

const CalendarSection = () => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  moment.updateLocale("en", { week: { dow: 1 } });

  const [startDate, setStartDate] = useState(
    moment(new Date()).startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).endOf("month").format("YYYY-MM-DD")
  );

  const [events, setEvents] = useState();
  const { data: eventsData } = eventsApi.useGetAllEventsQuery({ startDate, endDate });

  useEffect(() => {
    if (eventsData?.data) {
      let doc = eventsData.data.map((item) => {
        return {
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        };
      });
      setEvents(doc);
    }
  }, [eventsData]);

  const onRangeChange = (e) => {
    let newStartDate, newEndDate;
    if (e.start && e.end) {
      newStartDate = moment(e.start).format("YYYY-MM-DD");
      newEndDate = moment(e.end).endOf("day").format("YYYY-MM-DD");
    } else {
      newStartDate = moment(e[0]).format("YYYY-MM-DD");
      newEndDate = moment(e[e.length - 1])
        .endOf("day")
        .format("YYYY-MM-DD");
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleEventProp = (event) => {
    if (event.priority === "minor") {
      return {
        className: "minor-event",
      };
    } else if (event.priority === "critical") {
      return {
        className: "critical-event",
      };
    } else {
      return {};
    }
  };

  const handleEventModal = (event) => { 
    dispatch(
      modalOpen({ modalType: "openEvent", modalData: { id: event._id } })
    );
  };

  const handleSelectSlot = (day) => {
    const startDate = moment(day.start)
      .startOf("day")
      .format("yyy-MM-DD HH:mm");
    const endDate = moment(day.end)
      .endOf("day")
      .subtract(1, "day")
      .format("yyy-MM-DD HH:mm");

    dispatch(
      modalOpen({ modalType: "createEvent", modalData: { startDate, endDate } })
    );
  };

  const isDesktop = useViewportCheck('desktop'); 

  return (
    <div className={styles.calendar_section}>
      <Calendar
        selectable
        onSelectSlot={(e) => isDesktop ? handleSelectSlot(e): null}
        localizer={localizer}
        events={events ? events : []}
        eventPropGetter={handleEventProp}
        defaultDate={new Date()}
        onSelectEvent={(event) => handleEventModal(event)}
        onRangeChange={onRangeChange}
        step={90}
        min={moment("7:00", "hh:mm").toDate()}
        max={moment("23:00", "hh:mm").toDate()}
        startAccessor="startDate"
        endAccessor="endDate"
        views={["month", "week", "day"]}
      />
      <div
        className={styles.create_btn}
        onClick={() => dispatch(modalOpen({ modalType: "createEvent" }))}
      >
        <CalendarIcon />
      </div>
    </div>
  );
};

export default CalendarSection;
