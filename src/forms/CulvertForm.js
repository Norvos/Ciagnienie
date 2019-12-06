import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/Form.css";
import Store from "../stores/store";
import { observer } from "mobx-react-lite";

const CulvertForm = () => {
  const store = useContext(Store);
  const { culverts, maxCulverts,minCulverts,setCulverts } = store;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ value: culverts ? culverts : 0 }}
      validationSchema={Yup.object().shape({
        value: Yup.number()
          .required("Wpisz liczbę przepustów")
          .max(maxCulverts, "Wartośc maksymalna to " + maxCulverts)
          .min(minCulverts, "Wartośc minimalna to " + minCulverts)
      })}
      onSubmit={({value}) => {
        setCulverts(value);
      }}
    >
      {({ errors, touched }) => (
        <Form className="sub-form text-center">
          <div className="card">
            <div className="card-body">
              <label htmlFor="value">Liczba przepustów</label>
              <Field
                name="value"
                type="number"
                className="form-control text-center"
                placeholder="Wpisz liczbę przepustów"
              />
              {errors.value && touched.value ? (
                <div className="text-danger">{errors.value}</div>
              ) : null}
            </div>

            <div className="card-footer text-center">
              <button
                className="btn btn-lg btn-outline-dark btn-block"
                type="submit"
              >
                Pokaż
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(CulvertForm);
