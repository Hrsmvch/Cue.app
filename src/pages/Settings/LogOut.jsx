import { useDispatch } from 'react-redux';
import styles from './Settings.module.scss';
import { setLogOut } from 'features/authentication/services/loginSlice';

const LogOut = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.profile_action}>
      <button className={styles.log_out} onClick={() => { 
        dispatch(setLogOut())
        localStorage.removeItem('userToken');
      }}>Log out</button>
    </div>
  )
}

export default LogOut