import styles from './emptyList.module.scss';
import SkeletonItem from 'components/SkeletonItem'; 

const EmptyList = () => { 
  return (
    <section className={styles.cards}>
      <div className={styles.card}>
        <SkeletonItem width={'100%'} height={140} />
        <br /> 
        <SkeletonItem width={'100%'} count={3} />
      </div> 
      <div className={styles.card}>
        <SkeletonItem width={'100%'} height={80} />
          <SkeletonItem width={'70%'} count={1} />
          <SkeletonItem width={'90%'} count={1} />
          <SkeletonItem width={'65%'} count={1} />  
      </div>
      <div className={styles.card}> 
          <SkeletonItem width={'100%'} count={3} />
          <SkeletonItem width={'100%'} height={80} />
          <SkeletonItem width={'80%'} count={1} />
          <SkeletonItem width={'60%'} count={1} />
      </div>
      <div className={styles.card}> 
          <SkeletonItem width={'100%'} count={2} />
          <div style={{ margin: '24px 0' }}>
            <SkeletonItem width={'100%'} height={100} />
          </div>
          <SkeletonItem width={'100%'} count={2} />
          <SkeletonItem width={'80%'} count={1} />
          <SkeletonItem width={'60%'} count={1} />
      </div>
      <div className={styles.card}>
      <SkeletonItem width={'80%'} height={80} />
          <SkeletonItem width={'70%'} count={3} />
          <div style={{ margin: '24px 0' }}>
            <SkeletonItem width={'100%'} height={140} />
          </div>
          <SkeletonItem width={'60%'} height={80} />
          <SkeletonItem width={'50%'} count={2} />
      </div>
    </section>
  );
};

export default EmptyList;
