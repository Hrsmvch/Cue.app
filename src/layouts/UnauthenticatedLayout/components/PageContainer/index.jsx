import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar'
import Menu from "../Menu";

import styles from './PageContainer.module.scss';

const PageContainer = () => {
  return (
    <div className={styles.page}>
      <Menu />
      <Sidebar />
      <Outlet /> 
    </div>
  )
}

export default PageContainer