import styles from './Sidebar.module.scss';
import { ReactComponent as Logo } from '../../../../assets/logos/logo_light.svg'; 
import { Link } from 'react-router-dom';
import Menu from '../Menu';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to='/'>
        <Logo className={styles.logo} />
      </Link>
      <Menu />
    </div> 
  )
}

export default Sidebar