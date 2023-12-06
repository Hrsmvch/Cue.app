import { useSelector, useDispatch } from "react-redux";
import styles from "./modal.module.scss";
import moment from "moment";

import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";

import { modalClose, modalOpen } from "services/modalSlice";
import { checkModalData } from "services/modalSlice";
import { useOpenNote } from "../../hooks/useOpenNote";
import { useRemoveNote } from "../../hooks/useRemoveNote";

const OpenNote = () => {
  const dispatch = useDispatch();
  const modalData = useSelector(checkModalData); 

  const { NoteInfo } = useOpenNote(modalData); 
   const { remove } = useRemoveNote();

  const handleEditEvent = () => {
    dispatch(modalOpen({ modalType: "editNote", modalData: modalData }));
  };

  return (
    <div
      className={`${styles.container} ${styles.note_preview}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.heading}>
        <div
          className={styles.close_btn}
          onClick={() => dispatch(modalClose())}
        ></div>
        <div className={styles.title}>{NoteInfo?.data?.title}</div>
      </div>

      {NoteInfo?.data?.content?.images?.length > 0 && (
        <div className={styles.images}>
          {NoteInfo?.data?.content?.images?.map((image, index) => (
            <img key={index} className={styles.image} src={image} alt="" />
          ))}
        </div>
      )}

      {NoteInfo?.data?.content?.text && (
        <div className={styles.text_content}>
          {NoteInfo?.data?.content?.text}
        </div>
      )}

      {NoteInfo?.data?.content?.checkboxes?.length > 0 && (
        <div className={styles.checkboxes_content}>
          {NoteInfo?.data?.content?.checkboxes.map((it, index) => (
            <div className={styles.list_item} key={index}>
              <input disabled type="checkbox" defaultChecked={it.checked} />
              <div className={styles.label}>{it.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.note_info}>
        <div className={styles.date}>
          {moment(NoteInfo?.data?.createdAt).format("DD. MMM")}
        </div>
        <div className={styles.openedNote_actions}>
          <EditIcon
            className={styles.category_edit}
            onClick={() => handleEditEvent()}
          />
          <TrashIcon
            className={styles.category_remove}
            onClick={() => remove(modalData)}
          />
        </div>
      </div>
    </div>
  );
};

export default OpenNote;
