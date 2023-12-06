import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss'; 
import routes from 'data/routes';
import { useDispatch } from 'react-redux';
import { modalOpen } from 'services/modalSlice';

const DesktopMenu = () => {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(modalOpen({modalType: 'auth'}))
  }

  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.menu_items}>
        <NavLink 
          to={routes.faq} 
          className={(navData) => (navData.isActive ? styles.active : '')}>FAQ</NavLink>
        <a href='mailto: cue_info@cue.com'>Contact</a>
        <a
          href="#!"
          className={styles.sign_in_btn}
          onClick={(e) => {
            e.preventDefault();
            openLoginModal(e);
          }} >
          Sign in
        </a>;
      </div>
    </nav>
  )
}

export default DesktopMenu