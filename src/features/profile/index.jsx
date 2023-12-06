import { useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import styles from "./profile.module.scss";
import * as Yup from "yup";
import { convertBase64 } from "utils/convertBase64";
import { useSelector } from "react-redux";
import userDefault from '../../assets/placeholders/userDefault.jpg'
import { useUpdateProfile } from "./hooks/useUpdateProfile";

const Profile = () => {
  const fileInputRef = useRef(null);
  const emailFormatWrong = "test error";

  const { userInfo } = useSelector((state) => state?.user);  
  const { updateProfile, isLoading, error } = useUpdateProfile();   
 

  const handleImageClick = () => fileInputRef.current.click();

  return (
    <Formik 
      initialValues={{
        email: userInfo?.email,
        username: userInfo?.username,
        password: '',
        repeat_password: '',
        avatar: userInfo?.avatar ? userInfo?.avatar : userDefault,
        active: userInfo?.active,
      }}
      validationSchema={Yup.object({
        email: Yup.string().email(emailFormatWrong),
        username: Yup.string(),
        password: Yup.string(),
        repeat_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        avatar: Yup.string(),
        active: Yup.boolean(),
      })}
      validateOnChange={false}
      onSubmit={ async (values) => {  
        await updateProfile({...values, id: userInfo._id}) 
      }}
      
      >
      {({
        values,
        errors,
        handleSubmit,
        handleReset,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form className={styles.profile_settings} onSubmit={handleSubmit}> 
          <div className={styles.avatar_section}>
            <img className={styles.avatar} src={values?.avatar} alt="avatar" />
            <Field
              hidden
              type="file" 
              name="image"
              accept="image/*"
              innerRef={(input) => {
                fileInputRef.current = input;
              }}
              onChange={async (event) => {
                const file = await convertBase64(event.currentTarget.files[0]);
                setFieldValue("avatar", file);
              }}
            />
            <button className={styles.update_avatar} onClick={handleImageClick}>
              <EditIcon />
            </button>
            <ErrorMessage name="image" component="div" />
          </div>

          <div className={styles.update_user_info}>
            <div className={styles.form_fields}>
              <label htmlFor="username">Your Username
                <Field
                  type="text"
                  name="username"
                  placeholder="Your username*"
                  className={
                    errors?.username
                      ? `${styles.profile__input} ${styles.error}`
                      : `${styles.profile__input}`
                  }
                />
              </label>

              <label htmlFor="email">
                {"Your email"}
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email*"
                  className={
                    errors?.email
                      ? `${styles.profile__input} ${styles.error}`
                      : `${styles.profile__input}`
                  }
                /> 
                {error && <div className={styles.modal__error_message}>{error}</div>}
              </label>

              <label htmlFor="password">
                {" "}
                Your Password
                <Field
                  type="password"
                  name="password"
                  placeholder="****************"
                  className={
                    errors?.password
                      ? `${styles.profile__input} ${styles.error}`
                      : `${styles.profile__input}`
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.modal__error_message}
                />
              </label>

              <label htmlFor="repeat_password">
                {" "}
                Repeat password
                <Field
                  type="password"
                  name="repeat_password"
                  placeholder="****************"
                  className={
                    errors?.repeat_password
                      ? `${styles.profile__input} ${styles.error}`
                      : `${styles.profile__input}`
                  }
                />
                <ErrorMessage
                  name="repeat_password"
                  component="div"
                  className={styles.modal__error_message}
                />
              </label>
            </div>

            
            

            <div className={styles.actions}>
              <button className={styles.cancel} onClick={handleReset}>
                Reset
              </button>
              <button
                className={styles.save}
                type="submit"
                disabled={isSubmitting}
              >
                Save
                {isLoading && '...'} 
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
