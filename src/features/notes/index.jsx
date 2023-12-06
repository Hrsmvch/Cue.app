/* eslint-disable react/no-unescaped-entities */

import { useDispatch } from "react-redux";
import NoteItem from "./components/NoteItem";
import styles from "./notes.module.scss";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { modalOpen } from "services/modalSlice";
import { notesApi } from "./services/notesSlice"; 
import EmptyList from "./components/EmptyLIst";
// import 

const NotesContent = ({ currentCat }) => {
  const dispatch = useDispatch();
  const { data: notesData, isLoading } = notesApi.useGetAllNotesQuery(currentCat.id); 
  
  const handleAddNote = () => {
    dispatch(modalOpen({ modalType: "createNote" }));
  };

  const handleUpdateCategory = () => { 
    dispatch(modalOpen({modalType: 'updateNoteCategory', modalData: {
      id: currentCat.id, 
      name: currentCat.title
    } }))
  };

  if (isLoading) return <EmptyList />;

  return (
    <>
      <div className={styles.notes_info}>
        <div className={styles.notes_count}>
          {notesData?.data?.count || 0} notes
        </div>
        <div className={styles.add_new} onClick={() => handleAddNote()}>
          + Add new
        </div>
        {currentCat.id && (
          <EditIcon
            className={styles.category_edit}
            onClick={() => handleUpdateCategory()}
          />
        )}
      </div>
      <div className={styles.notes_wrap}>
        {notesData?.data &&
          (notesData?.data?.notes?.length > 0 ? (
            <div className={styles.notes}>
              {notesData.data?.notes.map((itemData) => (
                <NoteItem key={itemData._id} data={itemData} />
              ))}
            </div>
          ) : (
            <div className={styles.no_data}>
              <div className={styles.text}>
                You don`t have any notes. <br />
                Create one by click on <span>+ Add new</span> button
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NotesContent;
