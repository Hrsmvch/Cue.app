import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss'; 
import routes from 'data/routes';
// import Tooltip from '../../../../../components/Tooltip';

import { ReactComponent as SettingIcon } from './assets/setting-svgrepo-com.svg'; 
import { ReactComponent as FAQIcon } from './assets/question-help-svgrepo-com.svg'; 
import { ReactComponent as AnalyticsIcon } from './assets/analytics.svg';  
import { ReactComponent as NotesIcon } from './assets/app-menu-svgrepo-com.svg'; 
import { ReactComponent as CalendarIcon } from './assets/calendar-today-svgrepo-com.svg'; 
import { ReactComponent as CardIcon } from './assets/card.svg';
import { ReactComponent as OverviewIcon } from './assets/overview.svg'; 

const DesktopMenu = () => {
  return (
   <>
    <nav className={`${styles.nav}`}> 
      <NavLink
        to={routes.home} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <OverviewIcon />
        {/* <Tooltip content={`Overview`} /> */}
      </NavLink>

      <NavLink
        to={routes.finance} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <CardIcon />
        {/* <Tooltip content={`Finance`} /> */}
      </NavLink>

      <NavLink
        to={routes.calendar} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <CalendarIcon />
        {/* <Tooltip content={`Calendar`} /> */}
      </NavLink>

      <NavLink
        to={routes.notes} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <NotesIcon />
        {/* <Tooltip content={`Notes`} /> */}
      </NavLink>

      <NavLink
        to={`${routes.analytics}`} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <AnalyticsIcon />
        {/* <Tooltip content={`Analytics`} /> */}
      </NavLink>

      <NavLink
        to={routes.faq} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <FAQIcon />
        {/* <Tooltip content={`FAQ's`} /> */}
      </NavLink> 

        
      </nav>
      <NavLink
        to={routes.settings} 
        className={(navData) => (navData.isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}>
        <SettingIcon className={styles.setting_icon}/>
      </NavLink>
   </>
  )
}

export default DesktopMenu