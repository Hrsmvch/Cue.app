import styles from './Sidebar.module.scss';
import { ReactComponent as Logo } from '../../../../assets/logos/logo_light.svg';
import Vertical from '../../../../components/socials/vertical';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to='/'>
        <Logo className={styles.logo} />
      </Link>
      <Vertical />
    </div> 
  )
}

export default Sidebar