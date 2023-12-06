import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logos/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logos/logo_dark.svg';

import styles from './Menu.module.scss';
import { useState } from 'react';
import routes from 'data/routes';
import SocialHorizontal from 'components/socials/Horizontal';
import MobileMenuDots from 'components/MenuDots';

const MobileMenu = () => {
  const [openedMenu, setOpenedMenu] = useState(false);

  function handleCloseMenu (){
    setOpenedMenu(false);
  }

  function handleOpenSignIn (){
    handleCloseMenu();
    // TODO: Open Sign in modal
  }

  return (
    <nav className={`${styles.nav}`}>
        <NavLink exact="true" to='/' className={styles.logo}>
          <Logo className={styles.logo_dark} />
        </NavLink>
        <MobileMenuDots opened={openedMenu} handleOpenMenu={setOpenedMenu}/> 

        {openedMenu && (
          <div className={styles.fullscreen_menu}>
            <div className={styles.menu_heading}>
              <NavLink exact="true" to='/' className={styles.logo_icon}>
                <LogoDark className={styles.logo_icon} />
              </NavLink>
              <MobileMenuDots opened={openedMenu} handleOpenMenu={setOpenedMenu} /> 
            </div>
          
          <div className={styles.menu_items}>
            <a onClick={handleOpenSignIn}>Sign in</a>
            <a href='mailto: cue_fin@cue.com' onClick={handleCloseMenu}>Contact</a>
            <NavLink to={routes.faq} onClick={handleCloseMenu}>FAQ</NavLink>
          </div>

           <SocialHorizontal dark={openedMenu}/>
          </div>
        )}
    </nav>
  )
}

export default MobileMenu