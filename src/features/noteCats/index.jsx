/* eslint-disable react/no-unescaped-entities */

import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import styles from './categories.module.scss';
import CategoryItem from './components/CategoryItem';
import { notesCategoriesApi } from './services/NoteCategoriesSlice';
import { useDispatch } from 'react-redux';
import { modalOpen } from "services/modalSlice"; 

const NoteCategories = ({handleCurrentCat, currentCat}) => { 
 const dispatch = useDispatch()
 
 const handleAddCategory = () => dispatch(modalOpen({modalType: 'createNoteCategory'}))
 
 const { data: categories } = notesCategoriesApi.useGetAllCategoriesQuery(); 
 
  return (
    <div className={styles.cats_wrapper}>
      <div className={styles.cats}>
      <div  className={`${styles.cat_all} ${currentCat.title == "All category" ? styles.active : ''}`}>
        <div className={styles.cat_name} 
        onClick={() => handleCurrentCat({id: '',  title: 'All category'})}
        >
          All category
        </div>
        <AddIcon className={styles.add_category} onClick={() => handleAddCategory()}/>
      </div>
      {categories?.data && categories?.data?.length > 0 ? (
        categories?.data?.map((item) => (
          <CategoryItem 
            key={item._id} 
            id={item._id} 
            name={item.name} 
            count={item.noteCount} 
            handleCat={handleCurrentCat} 
            currentCat={currentCat}
            />
        ))
      ) : (
        <div className={styles.no_data}>
          You don't have any categories yet. You can create one by clicking on the <span> + </span> icon. 
        </div>
      )}
      
    </div>
   </div>
  )
}
 

export default NoteCategories