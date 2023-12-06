/* eslint-disable no-unused-vars */
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import styles from './modalContent.module.scss';  
import customStyles from "components/FormElements/customSelectStyles";
import { weekDays, repeatOptions, types, repeatEveryOptions } from 'data/events';

import { modalClose, modalOpen } from "services/modalSlice";

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// import { selectStyles } from '../../CustomFormFields/selectStyles'; 
// import { ReactComponent as CalendarIcon } from 'assets/icons/create_event.svg';
// import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg';
import { ReactComponent as CalendarIcon } from "../../assets/CalendarIcon.svg";
import { ReactComponent as CalendarDateIcon } from "assets/icons/calendarWithDots.svg"; 
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css"; 
import { useOpenEvent } from '../../hooks/useOpenEvent';
import { useUpdateEvent } from '../../hooks/useUpdateEvent';

const EditEvent = () => {
  const dispatch = useDispatch();

  const { modalData } = useSelector((state) => state.modal);  
  const { eventInfo } = useOpenEvent(modalData);  

  const { update, isLoading, error } = useUpdateEvent();  
    
  const formatPickerView = (selectedDate, prefix, fullFormat) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const formattedDate = fullFormat 
      ? moment(selectedDate).format("DD. MMM HH:mm") 
      : moment(selectedDate).format("DD. MMMM yyyy");

    if (isMobile && selectedDate) {
      return (
        <div className={styles.custom_datePicker}>
          {prefix} {formattedDate}
          <CalendarDateIcon />
        </div>
      );
    }
    return (
      <div className={styles.custom_datePicker}>
        {formattedDate} <CalendarDateIcon />
      </div>
    );
  };

  const handleUpdate = async(values) => await update(modalData, values)

  return (
    <div className={styles.container} onClick={(event) => event.stopPropagation()}> 
      <div className={styles.heading}>
        <CalendarIcon />
        <div className={styles.title}>Edit a event</div> 
      </div> 

      <Formik
       initialValues={{ 
          title: eventInfo?.data?.title, 
          startDate: new Date(eventInfo?.data?.startDate).toISOString(), 
          endDate: new Date(eventInfo?.data?.endDate).toISOString(), 
          repeat: eventInfo?.data?.repeat,
          customRepeat: {
            interval: eventInfo?.data?.customRepeat.interval,
            unit: eventInfo?.data?.customRepeat.unit,
            days: eventInfo?.data?.customRepeat.days
          },
          repeatEnds: eventInfo?.data?.repeatEnds,
          type: eventInfo?.data?.type, 
          link: eventInfo?.data?.link, 
          address: eventInfo?.data?.address,
          description: eventInfo?.data?.description, 
        }}
       validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        startDate: Yup.date().nullable().required('Required'),
        endDate: Yup.date().nullable().required('Required'),
        repeat: Yup.string(),
        customRepeat: {
          interval: Yup.number(),
          unit: Yup.string(),
          days: [String]
        },
        repeatEnds: Yup.string(),
        type: Yup.string(),
        link: Yup.string(),
        address: Yup.string(),
        description: Yup.string(), 
       })}  
       validateOnBlur={false}
       validateOnChange={false}
       onSubmit={ async (values, { setSubmitting }) => { 
        // console.log('values: ', values);
         
       }}
      >
       {({ setFieldValue, values, isSubmitting, errors }) => (
         <Form className={styles.form}>             
          <Field 
            type="text" 
            name="title" 
            placeholder='Enter note title..' 
            className={
              errors?.title
                ? `${styles.simple__input} ${styles.error}`
                : styles.simple__input
            } /> 

          <div className={styles.group}>  
              <DatePicker
                selected={values.startDate ? new Date(values.startDate) : null}
                placeholderText={"Select start date"}
                onChange={(selected) => setFieldValue("startDate", selected ? selected : "")}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={20}
                dateFormat="dd. MMM"
                customInput={formatPickerView(values.startDate, "Start date:", true)}
              />

              <DatePicker
                selected={values.endDate ? new Date(values.endDate) : null}
                placeholderText={"Select end date"}
                onChange={(selected) => setFieldValue("endDate", selected ? selected : "")} 
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={20}
                dateFormat="dd. MMM" 
                customInput={formatPickerView(values.endDate, "End date:", true)}
              />
          </div>

          <div className={styles.group}>   
              <Select
                name="type"
                selected={values.type}
                styles={customStyles}
                options={types}
                defaultValue={types?.find((el) => el.value === values.type)}
                onChange={(selected) => setFieldValue("type", selected.value)}
                components={{ IndicatorSeparator: () => null }}
              />

              <Select
                isDisabled
                name="repeat"
                styles={customStyles}
                options={repeatOptions}
                defaultValue={repeatOptions?.find((el) => el.value === values.repeat)}
                components={{ IndicatorSeparator: () => null, DropdownIndicator: () => null }}
              />
          </div>

          <Field 
            type="text" 
            name="link" 
            placeholder='Enter link (optional)..' 
            className={styles.simple__input} /> 
          
          <Field 
            type="text" 
            name="address" 
            placeholder='Enter address (optional)..' 
            className={styles.simple__input} /> 

          <Field 
            name="description" 
            as="textarea" 
            className={styles.simple__textarea}
            placeholder='Enter description (optional)..' />
          
          <div className={styles.actions}>
            <button className={styles.save} type="submit" onClick={() => handleUpdate(values)} >
              Save
            </button>
            <button className={styles.close} onClick={() => dispatch(modalClose())}>Cancel</button>
          </div>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default EditEvent