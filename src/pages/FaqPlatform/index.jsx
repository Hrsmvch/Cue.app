import Accordion from 'components/Accordion'; 
import UserInfo from 'components/UserInfo';
import PageTitle from 'components/PageTitle';
import DefaultHeader from 'layouts/DefaultHeader';
import styles from './Faq.module.scss';
import { faqPlatform } from 'data/faq';

const Faq = () => {
  return (
    <>
    <DefaultHeader >
      <PageTitle title="FAQ's" /> 
      <UserInfo />
    </DefaultHeader>
    <div className={styles.faq_page}>
      <Accordion sections={faqPlatform} mode={'light'} />
    </div>
  </>
        
  )
}

export default Faq