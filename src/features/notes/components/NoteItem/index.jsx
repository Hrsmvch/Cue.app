import { useDispatch } from 'react-redux';
import styles from './noteItem.module.scss';
import { modalOpen } from "services/modalSlice";

const NoteItem = ({ data }) => { 
  const dispatch = useDispatch();
  const {_id, title, content, pinned} = data;  

  return (
    <div  
      onClick={() => dispatch(modalOpen({modalType: 'openNote', modalData: _id})) } 
      className={` ${styles.note_item} ${pinned ? styles.pinned : ''}`} 
      > 
       {content?.images?.length > 0 && (
          <img className={styles.preview_image} src={content.images[0]} alt="" /> 
       )}
      <div className={styles.note_title}>{title}</div>
      <div className={styles.note_content}>
        {content?.text && content.text}
  
        {content?.checkboxes?.length > 0 && ( 
            content?.checkboxes?.map((item, index) => (
              <div key={index} className={styles.checkbox_wrap}>  
                <input defaultChecked={item.checked} type="checkbox" />
                {item.value}
              </div>
            ))
        )}
      </div>
  </div>
  )
}

export default NoteItem