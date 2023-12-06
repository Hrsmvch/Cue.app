import PageTitle from "components/PageTitle";
import DefaultHeader from "layouts/DefaultHeader";
import NoteCategories from "features/noteCats";
import NotesContent from "features/notes";
import UserInfo from "components/UserInfo";
import styles from "./Notes.module.scss";
import { useState } from "react";

const Notes = () => {
  const [currentCat, setCurrentCat] = useState({id: '', title: 'All category'});  

  return (
    <div className={styles.note_page}>
      <div className={styles.categories_container}>
        <DefaultHeader>
          <PageTitle title="Notes" />
        </DefaultHeader>
        <NoteCategories handleCurrentCat={setCurrentCat} currentCat={currentCat} />
      </div>

      <div className={styles.notes_container}>
        <DefaultHeader >
          <PageTitle title={currentCat.title} />
          <UserInfo />
        </DefaultHeader>   
        <NotesContent currentCat={currentCat} />
      </div>
    </div>
  );
};

export default Notes;
