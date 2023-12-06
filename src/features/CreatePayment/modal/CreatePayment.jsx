/* eslint-disable no-unused-vars */
import { Field, Form, Formik } from 'formik';
import { useState } from 'react'; 
import styles from './Payment.module.scss';
import { modalClose } from "services/modalSlice";
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import customStyles from "components/FormElements/customSelectStyles";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import { ReactComponent as ArrowDownIcon } from "assets/icons/arrowDown.svg";
import DatePicker from "react-datepicker";


// import ExpenseCatIcon from '../../ExpenseCatIcon/ExpenseCatIcon';
import moment from 'moment'; 
import { paymentApi } from '../service/paymentSlice';
import { useCreatePayment } from '../hooks/useCreatePayment';
import { balanceApi } from '../../cardManagement/service/balanceSlice';

const CreatePayment = () => {

  const dispatch =useDispatch();  

  const { data : balance } = balanceApi.useGetBalanceQuery();    
  const { create, error } = useCreatePayment();   
 
  const {data : paymentCats} = paymentApi.useGetPaymentCatsQuery();  

  const [listItem, setListItem] = useState({paymentDate: new Date().toISOString()});  
  const [list, setListUpdated] = useState([]);     
   
  const categories = paymentCats?.data[0]?.categories?.map(item => {
    return { value: item.name, label: item.name, id: item._id}; 
  }); 

  const handleDeleteItem = (value) => { 
    const newList = list.filter((item) => item !== value); 
    setListUpdated(newList);
  };
 
  const handleAddToList = () => {  
    if(listItem.categoryId){
      setListUpdated([...list, listItem]);
    }else{
      const firstCategory = categories[0];
      const updatedItem = {
        ...listItem, 
        categoryId: firstCategory?.id, 
        categoryName: firstCategory?.label,  
      };
      setListUpdated([...list, updatedItem]); 
    } 

    setListItem({ ...listItem, amount: '',  comment: '' });
  };
 
  function handleKeyDown(e) {
    if (e.key === '+' || e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault();
  }

const handleSubmit = async () => {  
  const updatedValues = list?.map(obj => { 
    const { categoryName, ...rest } = obj;
    return rest;
  });
  await create({ transactions: list})
}
 

  return (
    <div className={styles.container} onClick={(event) => event.stopPropagation()}>
      <div className={styles.title}>Create a payment</div>
      <Formik
       initialValues={{   
          paymentDate: new Date(),
          comment: '', 
          amount: 0, 
          categoryId: categories ? categories[0]?.id : '',  
        }} 
       validateOnBlur={false}
       validateOnChange={false}
       onSubmit={handleSubmit}
      >
       {({ setFieldValue, values, isSubmitting, errors }) => (
         <Form className={styles.payment__form}>  
            <div className={styles.group}>   
              <div> 
            
                <DatePicker
                  onChange={(selected) => setListItem({...listItem, paymentDate: selected.toISOString()})} 
                  selected={listItem.paymentDate ? new Date(listItem.paymentDate) : null}
                  placeholderText={"Select Payment date"} 
                  dateFormat="dd. MMM"   
                  className={styles.paymentDate} /> 
                <Select
                  styles={customStyles}
                  options={categories}
                  placeholder={`Choose a category`} 
                  value={categories ? (listItem.categoryId ? categories.find(item => item.id === listItem.categoryId) : categories[0]) : ''} 
                  onChange={(selected) => setListItem({...listItem, categoryId: selected.id, categoryName: selected.label})}
                  className='select__input full'
                  components={{ IndicatorSeparator: () => null }} /> 
                <Field 
                  type="number" 
                  name="amount" 
                  min={0}
                  placeholder='Enter amount..'  
                  value={listItem.amount || ''}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setListItem({...listItem, amount: Number(e.target.value)})}
                  className={errors?.title ? `${styles.simple__input} ${styles.error}` : styles.simple__input} /> 
                </div>
                
                <Field 
                  name="content" 
                  as="textarea" 
                  placeholder={`Comment..`} 
                  value={listItem.comment || ''}
                  className={styles.select__textarea} 
                  onChange={(e) => setListItem({...listItem, comment: e.target.value})} />

            </div>
  

            <div className={styles.list_container}>  
              <button className={styles.add_to_list__btn} disabled={!listItem.amount} onClick={() =>  handleAddToList()}>
                Add item 
                <ArrowDownIcon />
              </button>
              
              <div className={`${styles.list}`}>
                {list.length ? (
                  <>
                  {list.map((item, index) => (
                  <div className={styles.list_item} key={index}>     
                  <div className={styles.cat_info}>
                    {/* <ExpenseCatIcon category={item.categoryName} />  */}
                    <div className={styles.item_text}>{item.categoryName}</div>
                    {item.comment && <div className={styles.item_comment}>({item.comment})</div>}
                  </div>
                  <div className={styles.additional_info}>
                    <div className={styles.item_text}>{moment(item.paymentDate).format("DD. MMM")}</div>
                    <div className={styles.item_text}>₴{item.amount}</div>
                    <div className={styles.remove_item} onClick={() => handleDeleteItem(item)}>
                      <TrashIcon />  
                    </div>
                  </div>
                  </div>
                ))}
                  </>
                ) : (
                  <div className={styles.empty_list}>List is empty. Please add some items.</div>
                )}
                
              </div>
            </div>  
            <div className={styles.actions}>
              <button className={styles.save} type="submit" disabled={isSubmitting || list.length === 0} >
              Save
              </button>
              <button className={styles.close} onClick={() => dispatch(modalClose())}></button>
            </div>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default CreatePayment