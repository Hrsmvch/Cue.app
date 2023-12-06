/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'; 
import styles from './settings.module.scss';
import { modalClose } from "services/modalSlice"; 
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg"; 
import { useDispatch } from 'react-redux';
import { useGetPaymentCatsQuery } from '../../service/expensesSlice';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; 
import { useUpdateCategories } from '../../hooks/useUpdateCategories';
const CategoriesSettings = () => { 
  const dispatch = useDispatch();  

  const {update} = useUpdateCategories()

  const { data: categories } = useGetPaymentCatsQuery()   

  const [list, setList] = useState([]); 

  useEffect(() => {
    if(categories?.data[0]?.categories){
      setList(categories?.data[0]?.categories)
    }
  }, [categories])
 
  const [toUpdate, setToUpdate] = useState([]); 
  const [toRemove, setToRemove] = useState([]); 


  const handleUpdate = (type, catId, e) => { 
    let updatedItem = list.find(cat => cat._id === catId); 
    if(type == 'name'){ 
      updatedItem = { ...updatedItem, name: e.target.value }; 
    } 
    
    if(type == 'limit'){ 
      updatedItem = { ...updatedItem, limit: Number(e.target.value) }; 

    }  

    if(toUpdate.some(cat => cat._id === catId)){
       const updatedList = toUpdate.filter(item => item._id !== catId);
       setToUpdate([...updatedList, updatedItem])
      } else {
        setToUpdate([...toUpdate, updatedItem]) 
      }  
    }

  const handleRemove = (id) => {  
    setToRemove([...toRemove, id])  

    const updatedList = list.filter(item => item._id !== id); 
    setList(updatedList);
  }
  
  function handleKeyDown(e) {
    if (e.key === '+' || e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault();
  }

  return (
    <div className={styles.container} onClick={(event) => event.stopPropagation()}>
      <div className={styles.title}>Update categories</div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem dicta laudantium doloremque laborum, unde id voluptas consequuntur enim fugit eius assumenda tempora amet necessitatibus!
      </div>

      <Formik
       initialValues={{    
        number: 0,  
      }}
     validationSchema={Yup.object({
      number: Yup.number(),
       
     })}  
       validateOnBlur={false}
       validateOnChange={false}
       onSubmit={async() => await update({update: toUpdate, remove: toRemove})}
      >
       {({ errors }) => (
         <Form>   
          {list && list.length > 0 ? (
            <>
              <div className={styles.categories_container}>
              <div className={styles.cat}>
                <div className={styles.table_header}>Category name</div>
                <div className={styles.table_header}>Limit (optional)</div> 
              </div>
              <div className={styles.cat}>
                <div className={styles.table_header}>Category name</div>
                <div className={styles.table_header}>Limit (optional)</div> 
              </div>
                {list?.map((cat) => (
                  <div key={cat._id} className={styles.cat}>
                      <Field
                        type="text" 
                        name="name"   
                        defaultValue={cat?.name} 
                        onChange={(e) => handleUpdate('name', cat?._id, e)}
                      />

                      <Field
                        type="number" 
                        name="amount" 
                        placeholder='0'  
                        defaultValue={cat.limit > 0 ? cat.limit : ""}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => handleUpdate('limit', cat?._id, e)}
                      /> 

                      <TrashIcon onClick={() => handleRemove(cat?._id)} />
                  </div>
                ))}

              </div>
              <div className={styles.actions}>
                <button className={styles.save} type="submit">
                  Save
                </button>
                <button className={styles.close} onClick={() => dispatch(modalClose())}></button>
              </div>
            </>
          ) : (
            <div className="">No data</div>
          )} 
         </Form>
       )}
     </Formik>  
    </div>
  )
}

export default CategoriesSettings