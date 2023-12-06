/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react' 
import styles from './categoryItem.module.scss'
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { useRemoveCategory } from '../../hooks/useRemoveNoteCategory';
import { useUpdateCategory } from '../../hooks/useUpdateCategory';
 

const CategoryItem = ({id, name, count, handleCat, currentCat}) => { 

  const [editCat, setEditCat] = useState(false); 
  const [categoryName, setCategoryName] = useState(name);

  useEffect(() => {
    setCategoryName(name)
  }, [name])

  const { remove } = useRemoveCategory();
  const { update, error, isLoading, isSuccess } = useUpdateCategory();

  useEffect(() => {
    if(isSuccess) setEditCat(false)
  }, [isSuccess])

  const editCategory = () => setEditCat(true)
  
  const saveCategory = async () => {  
    if (!categoryName) {
      console.error('Category name is missing.');
      return;
    }
    await update(id, {name: categoryName}) 
  }

  function closeUpdating () { 
    setCategoryName(name);
    setEditCat(false);
  } 


  return (
    <div className={`${styles.cat} ${currentCat.id == id ? styles.active : ''}`} >
      <div className={``} onClick={() => handleCat({id: id, title: name})}>
        {!editCat ? (
          <div className={styles.cat_name}>{categoryName}</div>
        ) : (
          <input type="text" autoFocus defaultValue={categoryName} onChange={(e) => setCategoryName(e.currentTarget.value)}/>
        )}
        <div className={styles.cat_note_count}>{`${count} notes`}</div>
      </div>
      {!editCat ? (
        <div className={styles.actions}>
          <EditIcon 
            className={styles.category_edit} 
            onClick={() => editCategory()} 
            />
          <TrashIcon 
            className={styles.category_remove} 
            onClick={() => remove(id)} 
            />
        </div> 
      ) : ( 
        <div className={styles.actions_updating}>
          <button className={styles.save_updates} onClick={() => saveCategory()}>Save</button> 
          <button className={styles.save_updates} onClick={closeUpdating}>X</button> 
        </div>
      )}
    </div>
  )
}

export default CategoryItem