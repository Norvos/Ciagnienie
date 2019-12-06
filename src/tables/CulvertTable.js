import React, { useContext } from "react";
import "../styles/Table.css";
import Store from "../stores/store";
import { observer } from "mobx-react-lite";

const CulvertTable = () => {
  const store = useContext(Store);
  const { startDiameter, endDiameter, culverts } = store;
  const tableBody = [];

  const createTable = () => {
    let lastDiameter = startDiameter;
    //stałe
    let totalLambda = Math.pow(startDiameter / endDiameter, 2);
    let singleLambda = Math.pow(totalLambda, 1 / culverts);
    let loss = (1 - 1 / singleLambda) * 100;

    for (let i = 1; i <= culverts; i++) {
      //obliczam średnicę
      let newDiameter = Math.sqrt(1 - loss / 100) * lastDiameter;
      let totalLoss = (1 - Math.pow(newDiameter / startDiameter, 2)) * 100;

      tableBody.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{newDiameter.toFixed(2)}</td>
          <td>{totalLoss.toFixed(2)}</td>
        </tr>
      );
      lastDiameter = newDiameter;
    }

    let key = culverts;
    tableBody.push(
      <tr key={key}>
        <td>
          Ubytek = <b> {loss.toFixed(2)} %</b>
        </td>
        <td>
          Lambda pojedyncza = <b> {singleLambda.toFixed(2)}</b>
        </td>
        <td>
          Lambda całkowita = <b> {totalLambda.toFixed(2)}</b>
        </td>
      </tr>
    );
    return tableBody;
  };

  return (
    <>
      <div className="results"></div>
      <h2 className="my-4 text-center">
        Tabela dla liczby ciągów równych: {store.culverts}
      </h2>
      <table className="table table-bordered text-justify-center text-center my-table table-striped">
        <thead>
          <tr>
            <th scope="col">Nr ciągu</th>
            <th scope="col">Średnica [mm]</th>
            <th scope="col">Ubytek całkowity [%]</th>
          </tr>
        </thead>
        <tbody>{createTable()}</tbody>
      </table>
    </>
  );
};

export default observer(CulvertTable);
