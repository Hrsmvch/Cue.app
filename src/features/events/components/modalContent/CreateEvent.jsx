import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";

import Select from "react-select";
import * as Yup from "yup";
import styles from "./modalContent.module.scss";
import { modalClose } from "services/modalSlice";
import { ReactComponent as CalendarIcon } from "../../assets/CalendarIcon.svg";
import { ReactComponent as CalendarDateIcon } from "assets/icons/calendarWithDots.svg"; 
import { weekDays, repeatOptions, types, repeatEveryOptions } from 'data/events';

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import customStyles from "components/FormElements/customSelectStyles";
import { useCreateEvent } from '../../hooks/useCreateEvent'; 
import { checkModalData } from "services/modalSlice";

const AddEvent = () => {
  const dispatch = useDispatch(); 
  const { create, error } = useCreateEvent();  
  const modalData = useSelector(checkModalData);   

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
 
  const renderDayButton = (day, label, values, setFieldValue) => {
    const isSelected = values.customRepeat.days.includes(day);
    return (
      <button
        key={day}
        data-term={day}
        className={`${styles.day} ${isSelected ? styles.selected : ""}`}
        onClick={() => {
          if (values.customRepeat.days.includes(day)) {
            setFieldValue("customRepeat.days", values.customRepeat.days.filter((d) => d !== day) ); 
          } else {
            setFieldValue("customRepeat.days", [...values.customRepeat.days, day]);
          } 
        }}
      >
        {label}
      </button>
    );
  };

  const handleSubmit = async (values) => await create(values)

 

  return (
    <div
      className={styles.container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.heading}>
        <CalendarIcon />
        <div className={styles.title}>Create a event</div>
        <button
          className={styles.close_btn}
          onClick={() => dispatch(modalClose())}
        ></button>
      </div>

      <Formik
        initialValues={{
          title: "",
          startDate: modalData?.startDate ? new Date(modalData.startDate) : new Date(),
          endDate: modalData?.endDate ? new Date(modalData.endDate) : new Date(),
          repeat: repeatOptions[0].value,
          customRepeat: {
            interval: 1,
            unit: 'days',
            days: []
          },
          repeatEnds: new Date().setMonth(new Date().getMonth() + 1),
          type: "event",
          link: "",
          address: "",
          description: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is a required'),
          startDate: Yup.date().nullable().required("Start date  is a required"),
          endDate: Yup.date()
          .nullable()
          .required("End date  is a required")
          .min(Yup.ref('startDate'), "End date must be greater than start date"),
        
          repeat: Yup.string(),
          customRepeat: Yup.object().shape({
            interval: Yup.number(),
            unit: Yup.string(),
            days: Yup.array().of(Yup.string()),
          }),
          repeatEnds: Yup.string(),
          type: Yup.string(),
          link: Yup.string(),
          address: Yup.string(),
          description: Yup.string(),
        })}
        
        validateOnBlur={false}
        // validateOnChange={false}
        onSubmit={ (values) => handleSubmit(values)}
      >
        {({ setFieldValue, values, errors }) => (
          <Form className={styles.form}>  
            <Field
              type="text"
              name="title"
              placeholder="Enter note title.."
              className={
                errors?.title
                  ? `${styles.simple__input} ${styles.error}`
                  : styles.simple__input
                }
                autoFocus
            />

            <div className={`${styles.group} ${styles.no_gap}`}>
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
                styles={customStyles}
                options={types}
                defaultValue={types[3]}
                onChange={(selected) => setFieldValue("type", selected.value)}
                components={{ IndicatorSeparator: () => null }}
              />

              <Select
                name="repeat"
                styles={customStyles}
                options={repeatOptions}
                onChange={(selected) => setFieldValue('repeat', selected.value)}
                defaultValue={repeatOptions[0]}
                placeholder={`Choose a repeating`}
                components={{ IndicatorSeparator: () => null }}
              />
            </div>

            {values?.repeat !== "none" && (
              <div className={`${styles.custom_repeat} ${styles.in_progress}`}> 
                {values.repeat === "custom" && (
                  <>
                    <div className={styles.custom_date}>
                      <div className={styles.custom_title}> Repeat every</div>
                      <input
                        type="number"
                        className={styles.number}
                        onChange={(selected) => setFieldValue("customRepeat.interval", selected.target.value)}
                        defaultValue={values.customRepeat.interval}
                        min={1}
                        max={31}
                      />
                      <Select
                        name="repeat_every"
                        styles={customStyles}
                        options={repeatEveryOptions}
                        onChange={(selected) => setFieldValue("customRepeat.unit", selected.value)}
                        className={styles.custom_period}
                        defaultValue={repeatEveryOptions[0]}
                        placeholder={`Select period`}
                        components={{ IndicatorSeparator: () => null }}
                      />
                    </div>

                    {values.repeat === 'custom' && values.customRepeat.unit === "weeks" && (
                      <>
                        <div className={styles.repeat_on}>
                          <div className={styles.custom_title}>Repeat on</div>
                          <div className={styles.days}>
                             {weekDays?.map(({label, value}) => renderDayButton(value, label, values, setFieldValue))}
                           </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className={styles.custom_date_ends}>
                  <div className={styles.custom_title}>End time</div> 
                   <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={values.repeatEnds ? new Date(values.repeatEnds) : null}
                    placeholderText={"Select repeat ends"}
                    onChange={(selected) => setFieldValue("repeatEnds", selected ? selected : "")} 
                    dateFormat="dd. MMM" 
                    customInput={formatPickerView(values.repeatEnds, "Repeat ends date:")}
                    
                  />
                </div>
              </div>
            )}

            <Field
              type="text"
              name="link"
              placeholder="Enter link (optional).."
              className={styles.simple__input}
            />

            <Field
              type="text"
              name="address"
              placeholder="Enter address (optional).."
              className={styles.simple__input}
            />

            <Field
              name="description"
              as="textarea"
              className={styles.simple__textarea}
              placeholder="Enter description (optional).."
            />
            {errors && (
              <div className={styles.error_message}>
                {Object.values(errors).map((error, index) => (
                  <span key={index} className={styles.error}>
                    {error}.{' '} 
                  </span>
                ))}
              </div>
            )}
            {error && <div className={styles.error_message}>{error?.message}</div>}
            <div className={styles.actions}>
              <button
                className={styles.save}
                type="submit"
                disabled={Object.entries(errors).length > 0}>
                Save
              </button>
              <button
                className={styles.close}
                onClick={() => dispatch(modalClose())}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEvent;
