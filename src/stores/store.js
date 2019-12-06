import { decorate, observable, action } from "mobx";
import { createContext } from "react";

class Store {
  startDiameter = null;
  endDiameter = null;
  maxLoss = null;
  minLoss = null;
  culverts = null;
  formFulfilled = false;
  maxCulverts = null;
  minCulverts = null;

  setMaxCulverts = (culverts) => {
    this.maxCulverts=culverts;
  }

  setMinCulverts = (culverts) => {
    this.minCulverts=culverts;
  }
  
  handleSumbit = (values) => {
    this.startDiameter = values.startDiameter;
    this.endDiameter = values.endDiameter;
    this.maxLoss = values.maxLoss;
    this.minLoss = values.minLoss;
    this.formFulfilled = true;
  };
  setCulverts = (culverts) => {
    this.culverts = culverts;
  };
  showForm = () => {
    this.formFulfilled = false;
  }
}

decorate(Store, {
  startDiameter: observable,
  endDiameter: observable,
  maxLoss: observable,
  minLoss: observable,
  culverts: observable,
  maxCulverts: observable,
  minCulverts: observable,
  formFulfilled : observable,
  handleSumbit: action,
  setCulverts: action,
  showForm : action,
  setMaxCulverts : action,
  setMinCulverts: action
});

export default createContext(new Store());
