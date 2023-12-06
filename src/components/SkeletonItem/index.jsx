import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
 
const SkeletonItem = ({ count, width, height, circle, className, direction }) => {
  return (
    <Skeleton count={count} width={width} height={height} circle={circle} className={className} direction={direction}   />
  );
};

export default SkeletonItem;
