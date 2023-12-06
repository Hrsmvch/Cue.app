import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../Modal.module.scss'; 
import { useRegister } from '../../../hooks/useRegister';
import { useState } from 'react';
import { ReactComponent as OpenEyeIcon } from '../../../../../assets/icons/openEye.svg';
import { ReactComponent as CloseEyeIcon } from '../../../../../assets/icons/closeEyeIcon.svg';

const ModalRegistration = () => {  

  const [showPassword, setShowPassword] = useState(false);

  const { signUp, isLoading, error } = useRegister();  

  return (
    <div className={styles.modal_content} onClick={(event) => event.stopPropagation()}>
      <h3 className={styles.title}>Sign up</h3>
      
      <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid format').required('Required'),
        password: Yup.string()
        .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/,
            'Password: 8 characters minimum, at least one uppercase letter, one lowercase letter, one digit, and one symbol: @$!%*#?&_'
          ),
      })}
      validateOnBlur={false}
      // validateOnMount={true}
      validateOnChange={false}
      onSubmit={ async (values) => await signUp(values) }
      >
      {({ isSubmitting }) => (
        <Form className="sign-up__form"> 

          <Field 
            type="text" 
            name="username" 
            placeholder='Your name*' 
            className={error ? `${styles.simple_input} ${styles.error}` : styles.simple_input}  
            />
        
          <Field 
              type="email" 
              name="email" 
              placeholder='Your email*' 
              className={error ? `${styles.simple_input} ${styles.error}` : styles.simple_input}   /> 
          
          <div className={styles.pwd}>
              <Field 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                placeholder='Your password*' 
                className={error ? `${styles.simple_input} ${styles.error}` : styles.simple_input}  />

              <div className={styles.icon_password}>
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <OpenEyeIcon onClick={() => setShowPassword(true)} />
                )}
              </div>
              <ErrorMessage name="password" component="div" className={styles.modal__error_message} />

            </div>
 
          <button className={styles.form_submit} type="submit" disabled={isSubmitting}>
            Submit
            {isLoading && '...'}
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default ModalRegistration