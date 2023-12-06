import { useState } from 'react';
import styles from './Accordion.module.scss';  
import classNames from 'utils/classNames';

function Accordion({ sections, mode }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const itemClasses = classNames([], {
    [styles.accordion_item]: true,
    [styles.dark_mode]: mode == 'dark', 
  }, []);
   

  const renderSections = () => {
    return sections?.map((section, index) => (
      <div key={index} className={` ${itemClasses} ${activeIndex === index ? styles.active : ''}`}>
        <h2 onClick={() => toggleSection(index)} className={styles.accordion_title}>{section.title}</h2> 
         <p className={`${styles.accordion_content} ${activeIndex === index ? styles.active : ''}`}>{section.content}</p>
      </div>
    ));
  };

  return <div className={styles.accordion}>{renderSections()}</div>;
}

export default Accordion;
