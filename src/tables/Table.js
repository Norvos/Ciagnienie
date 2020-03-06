import React, { useContext } from "react";
import "../styles/Table.css";
import { observer } from "mobx-react-lite";
import Store from "../stores/store";

const Table = ({ message, loss, setCulverts,tableID }) => {
  const store = useContext(Store);
  const { startDiameter, endDiameter } = store;
  const tableBody = [];

  const createTable = () => {
    let lastDiameter = startDiameter;
    let number = 1;
    let endLoss = 0;

    while (lastDiameter > endDiameter) {
      let newDiameter = Math.sqrt(1 - loss / 100) * lastDiameter;
      if (newDiameter <= endDiameter) {
        newDiameter = endDiameter;
        endLoss = ((1 - Math.pow(endDiameter / lastDiameter, 2)) * 100).toFixed(2);
      }
      let totalLoss = (1 - Math.pow(newDiameter / startDiameter, 2)) * 100;
      let singleLambda = Math.pow(lastDiameter / newDiameter, 2);
      let totalLambda = Math.pow(startDiameter / newDiameter, 2);
      tableBody.push(
        <tr key={number}>
          <td>{number}</td>
          <td>{newDiameter.toFixed(2)}</td>
          <td>{totalLoss.toFixed(2)}</td>
          <td>{singleLambda.toFixed(2)}</td>
          <td>{totalLambda.toFixed(2)}</td>
        </tr>
      );
      number++;
      lastDiameter = newDiameter;
    }

    tableBody.push(
      <tr key={++number}>
        <td>
          Ubytek końcowy = <b>{endLoss} %</b>
        </td>
      </tr>
    );

    setCulverts(--tableBody.length);
    return tableBody;
  };

  return (
    <>
      <div className="mt-3"></div>
      <h2 className="my-4 text-center">{message}</h2>
      <table className="table table-bordered text-justify-center text-center my-table table-striped" id={tableID}>
        <thead>
          <tr>
            <th scope="col">Nr ciągu</th>
            <th scope="col">Średnica [mm]</th>
            <th scope="col">Ubytek całkowity [%]</th>
            <th scope="col">Lambda pojedyncza</th>
            <th scope="col">Lambda całkowita</th>
          </tr>
        </thead>
        <tbody>{createTable()}</tbody>
      </table>
    </>
  );
};

export default observer(Table);
