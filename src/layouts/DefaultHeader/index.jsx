import styles from './DefaultHeader.module.scss';

export default function DefaultHeader({children}) {
    return (
        <div className={styles.header}>
            {children}
        </div>
    )
}

