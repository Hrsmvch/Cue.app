import { useDispatch } from "react-redux";
import { modalClose } from "services/modalSlice";
import styles from "./modal.module.scss";
import { useCreateNotesCategory } from "../../hooks/useCreateNotesCategory";
import {
  customErrorStyles,
  customStyles,
} from "../../../../components/FormElements/customInputStyles";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddNotesCategory = () => {
  const dispatch = useDispatch();
  const { create, error } = useCreateNotesCategory();

  return (
    <div
      className={styles.container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.title}>{`Add new category`}</div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => await create(values)}
      >
        {() => (
          <Form key={error}>
            <Field
              autoFocus
              type="text"
              name="name" 
              placeholder="Enter new category name"
              style={error ? customErrorStyles : customStyles}
            />

            <div className={styles.actions}>
              <button type="submit">
                Create
              </button>
              <button onClick={() => dispatch(modalClose())}>X</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNotesCategory;
