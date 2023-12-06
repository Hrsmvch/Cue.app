import { Link } from "react-router-dom";
import classNames from "utils/classNames";
import styles from "./notes.module.scss";
import { ReactComponent as Icon } from "assets/icons/arrowDown.svg";
import { notesApi } from "../../../../features/notes/services/notesSlice";

const NotesWidget = ({ active, handleOpenWidget }) => {
  const { data: lastNote } = notesApi.useGetLastNoteQuery(); 

  const widgetClasses = classNames(
    [],
    {
      [styles.notes]: true,
      [styles.active]: active === "notes",
    },
    []
  );

  return (
    <div className={widgetClasses}>
      <div className={styles.title} onClick={() => handleOpenWidget("notes")}>
        Last Note
        <button className={styles.btn_open}>
          <Icon />
        </button>
      </div>
      {lastNote && lastNote?.data ? (
        <div className={`${styles.note_item}`}>
          <div className={styles.note_title}>{lastNote?.data.title}</div>

          {lastNote?.data?.content?.text && (
            <div className={styles.text}>{lastNote?.data?.content?.text}</div>
          )}

          {lastNote?.data?.content?.checkboxes?.length > 0 &&
            lastNote?.data?.content?.checkboxes?.map((item) => (
              <div className={styles.list_item} key={item.value}>
                <input
                  disabled
                  checked={item.checked}
                  type="checkbox"
                />
                <div className={styles.item_text}>{item.value}</div>
              </div>
            ))}
        </div>
      ) : (
        <div className={`${styles.no_data} ${styles.wrapper}`}>
          You don`t have notes for now. Go to{" "}
          <Link to="/notes">Notes page</Link> to create one.
        </div>
      )}
    </div>
  );
};

export default NotesWidget;
