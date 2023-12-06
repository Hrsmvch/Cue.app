import {  useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.scss';
import { checkModalOpen, checkModalType, modalClose } from 'services/modalSlice';
import ModalSignIn from 'features/authentication/components/modal/ModalSignIn/';
import ModalSignUp from 'features/authentication/components/modal/ModalSignUp/';
import AddEvent from 'features/events/components/modalContent/CreateEvent';
import './defaultModal.scss';
import OpenEvent from 'features/events/components/ModalContent/OpenEvent';
import RemoveEvents from 'features/events/components/ModalContent/RemoveEvents';
import EditEvent from 'features/events/components/ModalContent/EditEvent';
import AddNotesCategory from '../../features/noteCats/components/modal/addCategory';
import AddNote from '../../features/notes/components/modal/CreateNote';
import RenameNotesCategory from '../../features/noteCats/components/modal/renameCategory';
import OpenNote from '../../features/notes/components/modal/OpenNote';
import EditNote from '../../features/notes/components/modal/EditNote';
import AddCurrency from '../../features/cardManagement/components/modal/addCurrency';
import UpdateBalance from '../../features/cardManagement/components/modal/updateBalance';
import CreatePayment from '../../features/CreatePayment/modal/CreatePayment';
import CategoriesSettings from '../../features/monthExpenses/components/modal/categoriesSettings';
import CreateExpensesCategory from '../../features/monthExpenses/components/modal/addCategory';
import OpenYearExpensesByCat from '../../features/monthExpenses/components/modal/openYearExenseByCat';
const Modal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(checkModalOpen); 
  const modalType = useSelector(checkModalType);  
 

  // const renderModalView = () => {
    // switch (modalView){
    //   case 'center' : 
    //     return styles.center;  
    //   case 'side' :  
    //     return styles.side;
    //   case 'transparent' :  
    //     return styles.transparent;  
    //   case 'preview' :  
    //     return styles.preview; 
    //   default:
    //     return null;
    // }
  // }

  

  const renderModalContent = () => {
    switch (modalType) {
      case 'register':
        return <ModalSignUp />;
      case 'auth':
        return <ModalSignIn />; 
      case 'createEvent':
        return <AddEvent />;
      case 'openEvent':
        return <OpenEvent />;
      case 'removeEvent':
        return <RemoveEvents />;
      case 'editEvent':
        return <EditEvent />  
      case 'createNoteCategory':
        return <AddNotesCategory />;
      case 'createNote':
        return <AddNote />;
      case 'updateNoteCategory':
        return <RenameNotesCategory />;
      case 'openNote':
        return <OpenNote />;
      case 'editNote':
        return <EditNote />;
      case 'addCurrency':
        return <AddCurrency />;
      case 'updateBalance':
        return <UpdateBalance />;
      case 'createPayment':
        return <CreatePayment />;
      case 'categoriesSettings':
        return <CategoriesSettings />;
      case 'createExpensesCategory':
        return <CreateExpensesCategory />
      case 'openYearExpenseByCat':
        return <OpenYearExpensesByCat />
        
      default:
        return false;
    }
  };

  return (
    <div  
      className={isModalOpen ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
      onClick={() =>  dispatch(modalClose())}> 
        {renderModalContent()} 
    </div>
  );
};

export default Modal;
