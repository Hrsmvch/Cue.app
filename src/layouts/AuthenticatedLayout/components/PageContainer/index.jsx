import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar' 

import styles from './PageContainer.module.scss';

const PageContainer = () => {
  return (
    <div className={styles.page}> 
      <Sidebar />
      <main>
      <Outlet /> 
      </main>
    </div>
  )
}

export default PageContainer