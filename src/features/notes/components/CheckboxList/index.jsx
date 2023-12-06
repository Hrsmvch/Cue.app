 
import { useEffect, useState } from 'react'
import styles from './CheckboxList.module.scss'; 
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrowDown.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

const CheckboxList = ({handleList, defaultList}) => { 

  const [listItem, setListItem] = useState("");  
  const [list, setListUpdated] = useState([]);  

  useEffect(() => {
    if(defaultList){
      setListUpdated(defaultList)
    }
  }, [defaultList])
  
  const handleInputChange = (event) => {
    setListItem(event.target.value);
  };

  // Adding to list
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(listItem){ 
      const newElement = {checked: false, value: listItem};
      setListUpdated([...list, newElement]);
      handleList('content.checkboxes', [...list, newElement])
      setListItem("");
    }
  };

  // Removing from list
  const handleDeleteItem = (value) => { 
      const updatedList = list.filter((item) => item.value !== value.value); 
      setListUpdated(updatedList);
      handleList('content.checkboxes', updatedList)
  };
 
  // Updated list item
  const handleChecked = (value) => {
    const updatedList = list.map(item => {
      if (item.value === value.value) { 
        return {
          ...item,
          checked: !item.checked
        };
      }
      return item;
    });
    setListUpdated(updatedList);
    handleList('content.checkboxes', updatedList)
  }
 

  return (
    <div className={styles.list_container}> 
    <div className={styles.title}>Create checkboxes</div>
    <div className={styles.list_input}>
      <input 
        type="text"  
        value={listItem} 
        placeholder={`List item.`}
        onChange={handleInputChange} />
      <button className={styles.add_to_list__btn} onClick={(event) => handleFormSubmit(event)}>
        Add item <ArrowDownIcon />
      </button>
    </div>
      
      <div className={styles.list}>
        {list.length ? (
          <>
           {list.map((item) => (
          <div className={styles.list_item} key={item.value}>
            <input defaultChecked={item?.checked} type="checkbox" onClick={() => handleChecked(item)} />  
            <div className={styles.item_text}>{item.value}</div>
            <div className={styles.remove_item} onClick={() => handleDeleteItem(item)}>
              <TrashIcon />  
            </div>
          </div>
        ))}
          </>
        ) : (
          <div className={styles.empty_list}>List is empty. Please add some items.</div>
        )}
        
      </div>
    </div>
  )
}

export default CheckboxList