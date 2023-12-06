import { useDispatch } from 'react-redux';
import styles from './payment.module.scss';
import { modalOpen } from "services/modalSlice";

const CreatePaymentBtn = () => {
  const dispatch = useDispatch();

  return (
    <button className={styles.action_button} onClick={() => dispatch(modalOpen({modalType: 'createPayment'}))}>+ make a payment</button>
  )
}

export default CreatePaymentBtn