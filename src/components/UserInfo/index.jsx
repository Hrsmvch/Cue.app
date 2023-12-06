import { useSelector } from 'react-redux';
import styles from './UserInfo.module.scss';
import userDefault from '../../assets/placeholders/userDefault.jpg'

const UserInfo = () => {
  const { userInfo } = useSelector((state) => state?.user);

  if(!userInfo) return;

  return (
    <div className={styles.user_info}>
      <span className={styles.username}>{userInfo?.username}</span>
      <img 
        className={styles.avatar}
        src={userInfo?.avatar ? userInfo?.avatar : userDefault} alt={userInfo?.username} /> 
    </div>
  )
}

export default UserInfo