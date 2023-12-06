import styles from "./modal.module.scss";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { modalClose } from "services/modalSlice";
import { balanceApi } from "../../service/balanceSlice";
import { useUpdateBalance } from "../../hooks/useUpdateBalance";
import { useState } from "react";
import { useUpdateMajorCurrency } from "../../hooks/useUpdateMajorCurrency";

const UpdateBalance = () => {
  const dispatch = useDispatch();

  const { data: balance } = balanceApi.useGetBalanceQuery();
  const [updatedBalance, setUpdatedBalance] = useState([]);
  const [majorCurrency, setMajorCurrency] = useState(null); 

  const { updateBalanceData } = useUpdateBalance();
  const { update } = useUpdateMajorCurrency();

  const handleInputChange = (value, currency) => {
    const updatedAmount = { currency: currency, amount: value };
    const updatedBalanceCopy = [...updatedBalance];

    const existingCurrencyIndex = updatedBalanceCopy.findIndex(
      (item) => item.currency === currency
    );

    if (existingCurrencyIndex !== -1) {
      updatedBalanceCopy[existingCurrencyIndex] = updatedAmount;
    } else {
      updatedBalanceCopy.push(updatedAmount);
    }
    setUpdatedBalance(updatedBalanceCopy);
  };

  const handleSubmit = async () => {
    await updateBalanceData(updatedBalance);
    if (
      majorCurrency &&
      majorCurrency?.currency != balance?.data?.majorCurrency?.currency
    ) {
      await update({ majorCurrency: majorCurrency.currency });
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.title}>{`Update balance`}</div>
      <div className={styles.sub_text}>
        {`Feel free to adjust your capital anytime and change a major currency if you prefer.`}
      </div>

      <Formik initialValues={{}} onSubmit={() => handleSubmit()}>
        {() => (
          <Form>
            <div className={styles.currencies}>
              {balance?.data?.currencies?.map((item, index) => (
                <div className={styles.currency_item} key={index}>
                  <div className={styles.name}>{item?.currency}</div>
                  <input
                    min={0}
                    type="number"
                    name={item?.currency}
                    defaultValue={item?.amount}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") e.preventDefault();
                    }}
                    onChange={(e) =>
                      handleInputChange(e.target.value, item?.currency)
                    }
                  />
                  <input
                    type="radio"
                    name="majorCurrency"
                    value={item}
                    defaultChecked={
                      item.currency == balance?.data?.majorCurrency?.currency
                    }
                    onChange={() => setMajorCurrency(item)}
                  />
                </div>
              ))}
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

export default UpdateBalance;
