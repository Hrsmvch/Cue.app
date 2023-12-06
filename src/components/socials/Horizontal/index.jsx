import socials from 'data/socials';
import styles from './Socials.module.scss';

const SocialHorizontal = () => {
  return (
    <ul className={styles.social_list}>
      <li><a rel="noopener noreferrer" target="_blank" href={socials.instagram}>In</a></li>
      <li><a rel="noopener noreferrer" target="_blank" href={socials.twitter}>Tw</a></li>
      <li><a rel="noopener noreferrer" target="_blank" href={socials.facebook}>Fb</a></li>
    </ul>
  )
}

export default SocialHorizontal;