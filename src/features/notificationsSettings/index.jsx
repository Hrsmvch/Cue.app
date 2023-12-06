/* eslint-disable no-unused-vars */
import { Formik, Field, Form } from "formik";
import customStyles from 'components/FormElements/customSelectStyles'
import PageTitle from "components/PageTitle";
import styles from "./notifications.module.scss";
import Select  from 'react-select';

const NotificationSettings = () => {

  const handleChanges = (value) => {  
  }

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]; 

  return (
    <div className={`${styles.notification_wrap} ${styles.in_progress}`}>
      <PageTitle title="Notifications" />
      <Formik initialValues={{ weekdays: false }}>
        <Form>
          <div className={styles.by_type_of_day}>
            <h3>Notifications by type of day</h3>
            <div className={styles.options}>
              <label className={styles.option_item}>
                <Field type="checkbox" name="workdays" />
                <span>Mon - Fri</span>
              </label>
              <label className={styles.option_item}>
                <Field type="checkbox" name="weekends" />
                <span>Sat - Sun</span>
              </label>
            </div>
          </div>

          <div className={styles.frequency}>
            <h3>Reporting frequency</h3>
            <div className={styles.options}>
              <div className={styles.option_item}>
                <div className={styles.title}>Remainders:</div>
                <Select
                  id="remainders"
                  name="remainders"
                  options={options}
                  styles={customStyles} 
                  defaultValue={options[0]} 
                  onChange={(optionValue) => handleChanges(optionValue)}
                  components={{ IndicatorSeparator: () => null, }}
                /> 
              </div>
              <div className={styles.option_item}>
                <div className={styles.title}>Birthdays:</div>
                <Select
                  id="birthdays"
                  name="birthdays"
                  options={options}
                  styles={customStyles} 
                  defaultValue={options[0]} 
                  onChange={(optionValue) => handleChanges(optionValue)}
                  components={{ IndicatorSeparator: () => null, }}
                />  
              </div>
              <div className={styles.option_item}>
                <div className={styles.title}>Events:</div>
                <Select
                  id="events"
                  name="events"
                  options={options}
                  styles={customStyles} 
                  defaultValue={options[0]} 
                  onChange={(optionValue) => handleChanges(optionValue)}
                  components={{ IndicatorSeparator: () => null, }}
                />  
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NotificationSettings;
