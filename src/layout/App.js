import React, { useContext } from "react";
import "../styles/App.css";
import Form from "../forms/MainForm";
import CulvertTable from "../tables/CulvertTable";
import CulvertsForm from "../forms/CulvertForm";
import Table from "../tables/Table";
import { observer } from "mobx-react-lite";
import Store from "../stores/store";
import TableToExcel from "@linways/table-to-excel";
import { FaFileExcel } from 'react-icons/fa';
const App = () => {
  const store = useContext(Store);

  const tableToExcel = () => {

    const table = document.getElementById("firstTable").cloneNode(true);

    let tr = document.createElement("TR");
    const th = document.createElement("TH");
    th.innerText="Tabela dla maksymalnego pojedyńczego względnego ubytku przekroju";
    tr.appendChild(th)
    table.insertBefore(tr, table.firstChild);

    tr = tr.cloneNode(true);
    tr.firstChild.innerText = "Tabela dla minimalnego pojedyńczego względnego ubytku przekroju";

    const secondTable = document.getElementById("secondTable").cloneNode(true);
    secondTable.insertBefore(tr, secondTable.firstChild);
    table.append(secondTable);

    if(store.culverts)
    {
      const thirdTable = document.getElementById("thirdTable").cloneNode(true);
      tr = tr.cloneNode(true);
      tr.firstChild.innerText = "Tabela dla zadanej liczby ciągów";
      thirdTable.insertBefore(tr, thirdTable.firstChild);
      table.append(thirdTable);
    }
    TableToExcel.convert(table);
  }

  return !store.formFulfilled ? (
    <Form />
  ) : (
    <>
      <Table
        message={`Tabela dla maksymalnego pojedyńczego względnego ubytku przekroju równego: ${store.maxLoss} %`}
        loss={store.maxLoss}
        setCulverts={store.setMinCulverts}
        tableID="firstTable"
      />
      <Table
        message={`Tabela dla minimalnego pojedyńczego względnego ubytku przekroju równego: ${store.minLoss} %`}
        loss={store.minLoss}
        setCulverts={store.setMaxCulverts}
        tableID="secondTable"
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

        <button
          className="btn btn-lg btn-outline-dark btn-block"
          onClick={() => tableToExcel()}
        >
          Eksportuj do formatu .xls <FaFileExcel />
        </button>
      </div>
    </>
  );
};

export default observer(App);
