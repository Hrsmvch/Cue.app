import Select from "react-select";
import customStyles from "components/FormElements/customSelectStyles";
import styles from './modal.module.scss'
import { Form, Formik } from 'formik'
import { useDispatch } from "react-redux";
import { modalClose } from 'services/modalSlice'; 
import { balanceApi } from "../../service/balanceSlice";
import { useState } from "react";
import { useUpdateCurrencies } from "../../hooks/useUpdateCurrencies";
import { allCurrencies } from 'data/finances';


const AddCurrency = () => {
  const dispatch = useDispatch(); 

  const { data : balance } = balanceApi.useGetBalanceQuery();
  const {update} = useUpdateCurrencies();

  const [selectedData, setSelectedData] = useState()
 
  const defaultSelectedCurrencies = allCurrencies.filter(currency => {
    return balance?.data?.currencies?.some(b => b.currency === currency.value);
  });

  return (
    <div
    className={styles.container}
    onClick={(event) => event.stopPropagation()}
  >
    <div className={styles.title}>{`Choose currency`}</div>
    <Formik
      initialValues={{}}
      onSubmit={() => update(selectedData)}
    >
      {() => (
        <Form>
            <Select
                isMulti
                name="type"
                placeholder="Choose currency"
                styles={customStyles}
                options={allCurrencies}
                defaultValue={defaultSelectedCurrencies}
                onChange={(selected) => setSelectedData(selected)
              }
                components={{ IndicatorSeparator: () => null }}
              />

          <div className={styles.actions}>
            <button className={styles.save} type="submit">
              Save
            </button>
            <button className={styles.close} onClick={() => dispatch(modalClose())}></button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default AddCurrency