import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/Form.css";
import "../styles/App.css";
import Store from "../stores/store";
import { observer } from "mobx-react-lite";

const InputSchema = Yup.object().shape({
  startDiameter: Yup.number()
    .required("Wpisz średnicę początkową")
    .moreThan(
      Yup.ref("endDiameter"),
      "Wartość nie może być mniejsza niż średnica końcowa"
    )
    .positive("Wymagane jest wartość dodatnia"),
  endDiameter: Yup.number()
    .required("Wpisz średnicę końcową")
    .lessThan(
      Yup.ref("startDiameter"),
      "Wartość nie może być większa niż średnica początkowa"
    )
    .positive("Wymagane jest wartość dodatnia"),
  maxLoss: Yup.number()
    .required("Wpisz maksymalny ubytek przekroju")
    .max(100, "Wartośc nie może przekraczać 100%")
    .moreThan(
      Yup.ref("minLoss"),
      "Wartość nie może być mniejsza niż minimalny ubytek"
    )
    .positive("Wymagane jest wartość dodatnia"),
  minLoss: Yup.number()
    .required("Wpisz minimalny ubytek przekroju")
    .lessThan(
      Yup.ref("maxLoss"),
      "Wartość nie może być większa niż maksymalny ubytek"
    )
    .max(100, "Wartośc nie może przekraczać 100%")
    .positive("Wymagane jest wartość dodatnia")
});

const MainForm = () => {
  const store = useContext(Store);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        startDiameter: store.startDiameter ? store.startDiameter : 20,
        endDiameter: store.endDiameter ? store.endDiameter : 8,
        maxLoss: store.maxLoss ? store.maxLoss : 40,
        minLoss: store.minLoss ? store.minLoss : 10
      }}
      validationSchema={InputSchema}
      onSubmit={values => {
        store.handleSumbit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="main-form text-center">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-3">Wprowadź dane</h3>
            </div>

            <div className="card-body">
              <label htmlFor="startDiameter">Początkowa średnica [mm]</label>
              <Field
                name="startDiameter"
                type="number"
                className="form-control text-center"
                placeholder="Wpisz początkową średnicą pręta"
              />
              {errors.startDiameter && touched.startDiameter ? (
                <div className="text-danger">{errors.startDiameter}</div>
              ) : null}
              <label htmlFor="endDiameter">Końcowa średnica [mm]</label>
              <Field
                name="endDiameter"
                type="number"
                className="form-control text-center"
                placeholder="Wpisz końcową średnicą pręta"
              />
              {errors.endDiameter && touched.endDiameter ? (
                <div className="text-danger">{errors.endDiameter}</div>
              ) : null}

              <label htmlFor="maxLoss">Maksymalny ubytek [%]</label>
              <Field
                name="maxLoss"
                type="number"
                className="form-control text-center"
                placeholder="Wpisz max ubytek przekroju"
              />
              {errors.maxLoss && touched.maxLoss ? (
                <div className="text-danger">{errors.maxLoss}</div>
              ) : null}

              <label htmlFor="minLoss">Minimalny ubytek [%]</label>
              <Field
                name="minLoss"
                type="number"
                className="form-control text-center"
                placeholder="Wpisz min ubytek przekroju"
              />
              {errors.minLoss && touched.minLoss ? (
                <div className="text-danger">{errors.minLoss}</div>
              ) : null}
            </div>

            <div className="card-footer text-center dropright">
              <button
                className="btn btn-lg btn-outline-dark btn-block dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                type="submit"
              >
                Oblicz
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(MainForm);
