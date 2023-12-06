import styles from "./settings.module.scss";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { modalClose } from "services/modalSlice"; 
import { useCreateCategory } from "../../hooks/useCreateCategory";

const CreateExpensesCategory = () => {
  const dispatch = useDispatch();    
  const { create } = useCreateCategory();  

  return (
    <div
      className={styles.container__sm}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.title}>{`Create categories`}</div>
      <div className={styles.sub_text}>
        {`Feel free to adjust your capital anytime and change a major currency if you prefer.`}
      </div>

      <Formik initialValues={{name: ''}} onSubmit={async(values) => await create(values)}>
        {() => (
          <Form>
            <div className={styles.currencies}> 
                <div className={styles.currency_item}> 
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter category name.." 
                /> 
                </div> 
            </div>

            <div className={styles.actions}>
              <button className={styles.save} type="submit">
                {`Save`}
              </button>
              <button
                className={styles.close}
                onClick={() => dispatch(modalClose())}
              ></button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateExpensesCategory;
