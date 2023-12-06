import styles from './DefaultContent.module.scss';

export default function DefaultContent({children}) {
    return (
        <div className={styles.content}>
            {children}
        </div>
    )
}

