// import React from 'react'
import styles from '../../widgets.module.scss'

const WidgetsContainer = ({children}) => {
  return (
    <div className={styles.overview_container}>
      {children}
    </div>
  )
}

export default WidgetsContainer