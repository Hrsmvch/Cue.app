import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "services/modalSlice";
import styles from "./modal.module.scss"; 
import {
  customErrorStyles,
  customStyles,
} from "../../../../components/FormElements/customInputStyles";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { checkModalData } from "services/modalSlice";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";

const RenameNotesCategory = () => {
  const dispatch = useDispatch();
  const modalData = useSelector(checkModalData);    
  // const { update, error } = useUpdateCategoryMutation();
  const { update, error} = useUpdateCategory();


  return (
    <div
      className={styles.container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.title}>{`Rename category`}</div>
      <Formik
        initialValues={{ name: modalData?.name }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => await update(modalData?.id, values)}
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
                Save
              </button>
              <button onClick={() => dispatch(modalClose())}>X</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RenameNotesCategory;
