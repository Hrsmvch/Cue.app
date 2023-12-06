/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import styles from "./modalContent.module.scss";

import { ReactComponent as CalendarIcon } from "assets/icons/calendarWithDots.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg";
import { ReactComponent as LinkIcon } from "assets/icons/link.svg";
import { ReactComponent as AddressIcon } from "assets/icons/address.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";

import { modalClose, modalOpen } from "services/modalSlice";
import { checkModalData } from "services/modalSlice";
import { useOpenEvent } from "../../hooks/useOpenEvent";
import { useDateDuration } from "../../hooks/useDateDuration";
import { useNormalizeDate } from "../../hooks/useNormalizeDate";
import { useRemoveEvent } from "../../hooks/useRemoveEvent";

const OpenEvent = () => {
  const dispatch = useDispatch();
  const modalData = useSelector(checkModalData); 
  const { eventInfo } = useOpenEvent(modalData?.id); 
  const { remove } = useRemoveEvent();  

  const handleRemoveEvent = () => { 
    if(eventInfo?.data?.repeat !== 'none'){
      dispatch(modalOpen({ modalType: 'removeEvent', modalData: modalData?.id}))
    }else{
      remove(modalData?.id)
    }
  }
  const handleEditEvent = () => {
    dispatch(modalOpen({ modalType: 'editEvent', modalData: modalData.id }))
  }

  const duration = useDateDuration(
    eventInfo?.data?.startDate,
    eventInfo?.data?.endDate
  );
  const normalizeDate = useNormalizeDate(
    eventInfo?.data?.startDate,
    eventInfo?.data?.endDate
  );

  return (
    <div className={`${styles.container} ${styles.event_preview}`} onClick={(event) => event.stopPropagation()}>
      <div className={styles.close} onClick={() => dispatch(modalClose())}></div>
      <div className={styles.event_title}>{eventInfo?.data.title}</div>

      <div className={styles.event_data}>
        <CalendarIcon />
        {normalizeDate}
      </div>

      <div className={styles.event_data}>
        <ClockIcon />
        {duration}
      </div>

      {eventInfo?.data.link && (
        <div className={styles.event_data}>
          <LinkIcon />
          {eventInfo?.data.link}
        </div>
      )}

      {eventInfo?.data.address && (
        <div className={styles.event_data}>
          <AddressIcon />
          {eventInfo?.data.address}
        </div>
      )}

      {eventInfo?.data.description && (
        <div className={styles.description}>{eventInfo?.data.description}</div>
      )}

      <div className={styles.event_footer}>
        <div className={styles.event_type}>
          <ClockIcon />
          {eventInfo?.data?.type}
        </div>
        <div className={styles.event_action}>
          <EditIcon onClick={() => handleEditEvent()} />
          <TrashIcon onClick={() => handleRemoveEvent()} />
        </div>
      </div>
    </div>
  );
};

export default OpenEvent;
