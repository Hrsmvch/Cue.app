import Accordion from 'components/Accordion'; 
import styles from './Faq.module.scss';
import { faqGeneral } from 'data/faq';

const Faq = () => {
  return (
    <div className={styles.faq_page}>
      <h1 className={styles.page_title}>{`FAQ's`}</h1>
      <Accordion sections={faqGeneral} mode={'dark'}
      />
    </div>
  )
}

export default Faq