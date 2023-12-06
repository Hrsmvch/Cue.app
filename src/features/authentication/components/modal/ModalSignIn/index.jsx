import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; 
import styles from '../Modal.module.scss'; 
import { useDispatch } from 'react-redux';
import { modalOpen } from 'services/modalSlice'; 
import { useLogin } from '../../../hooks/useLogin';
import { useState } from 'react';
import { ReactComponent as OpenEyeIcon } from 'assets/icons/openEye.svg';
import { ReactComponent as CloseEyeIcon } from 'assets/icons/closeEyeIcon.svg';

const ModalSignIn = () => {
  const dispatch = useDispatch();  
  const { signIn, isLoading, error } = useLogin(); 

  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className={styles.modal_content} onClick={(event) => event.stopPropagation()}> 
      <h3 className={styles.title}>{`Sign in`}</h3>
      <Formik
       initialValues={{ email: '', password: '' }}
       validationSchema={Yup.object({ 
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
       })} 
       onSubmit={ async (values) => await signIn(values) }
      >
       {({ isSubmitting }) => (
         <Form className="sign-in__form" key={error}> 

            <Field 
              type="email" 
              name="email" 
              placeholder='Your email*' 
              className={error ? `${styles.simple_input} ${styles.error}` : styles.simple_input} />

            <div className={styles.pwd}>
              <Field 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                placeholder='Your password*' 
                className={error ? `${styles.simple_input} ${styles.error}` : styles.simple_input} />
              <div className={styles.icon_password}>
                {showPassword ? (
                  <CloseEyeIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <OpenEyeIcon onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
 
           <div 
              className={styles.go_register} 
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  modalOpen({ modalType: 'register' })
                );
              }}>{`Don't have an account yet?  Sign Up`}</div>

           <button className={styles.form_submit} type="submit" disabled={isSubmitting}>
              Submit
              {/* <Loader /> */}
              {isLoading && '...'}
           </button>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default ModalSignIn