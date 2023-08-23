import React from 'react';

export default class CheckedService {
  // const [sheetData2, setSheetData2] = useState([])
  static handleCheckedFunc(name, checked, sheetData2) {
    console.log(sheetData2);
    if (name === 'allselect') {
      const checkedValue = sheetData2.map((row) => {
        return { ...row, defect: true };
      });
      console.log(checkedValue);
      //setSheetData2(checkedValue);
      return checkedValue;
    } else {
      console.log(name);
      const checkedValue = sheetData2.map(
        (row) => (row.id === name ? { ...row, defect: checked } : { ...row }) //  row.id === name ? { ...row, defect: true } : row
      );
      console.log(checkedValue);
      //setSheetData2(checkedValue);
      return checkedValue;
    }
  }
}
