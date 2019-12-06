import React, { useContext } from "react";
import "../styles/App.css";
import Form from "../forms/MainForm";
import CulvertTable from "../tables/CulvertTable";
import CulvertsForm from "../forms/CulvertForm";
import Table from "../tables/Table";
import { observer } from "mobx-react-lite";
import Store from "../stores/store";

const App = () => {
  const store = useContext(Store);
  return !store.formFulfilled ? (
    <Form />
  ) : (
    <>
      <Table
        message={`Tabela dla maksymalnego pojedyńczego względnego ubytku przekroju równego: ${store.maxLoss} %`}
        loss={store.maxLoss}
        setCulverts={store.setMinCulverts}
      />
      <Table
        message={`Tabela dla minimalnego pojedyńczego względnego ubytku przekroju równego: ${store.minLoss} %`}
        loss={store.minLoss}
        setCulverts={store.setMaxCulverts}
      />

      <CulvertsForm />
      {store.culverts ? <CulvertTable /> : null}

      <div className="dropleft my-btn">
        <button
          className="btn btn-lg btn-outline-dark btn-block dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          type="submit"
          onClick={store.showForm}
        >
          Cofnij
        </button>
      </div>
    </>
  );
};

export default observer(App);
