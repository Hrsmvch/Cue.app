/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "services/modalSlice";
import styles from "./modalContent.module.scss";
import { checkModalData } from "services/modalSlice";
import { useRemoveEvent } from "../../hooks/useRemoveEvent";

const RemoveEvents = () => {
  const dispatch = useDispatch();
  const { remove } = useRemoveEvent();
  const modalData = useSelector(checkModalData);

  return (
    <div
      className={`${styles.container} ${styles.event_remove}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={styles.close}
        onClick={() => dispatch(modalClose())}
      ></div>
      <div className={styles.event_title}>{`Remove regular event`}</div>
      <div
        className={styles.description}
      >{`This event is regular. Please select the option to remove it:`}</div>

      <div className={styles.actions}>
        <button 
          className={styles.remove_current} 
          onClick={() => remove(modalData)}>
          Remove current
        </button>
        <button 
          className={styles.remove_all}
          onClick={() => remove(modalData, 'false')}>
          Remove all</button>
      </div>
    </div>
  );
};

export default RemoveEvents;
