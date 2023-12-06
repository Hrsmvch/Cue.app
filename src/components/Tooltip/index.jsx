import styles from './Tooltip.module.scss'

const Tooltip = ({content}) => { 
  return (
    <span className={styles.tooltip}>{content}</span>
  )
}

export default Tooltip