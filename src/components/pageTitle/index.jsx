import styles from './PageTitle.module.scss';

const PageTitle = ({ title }) => {
  return <div className={styles.title}>{title}</div>
}

export default PageTitle