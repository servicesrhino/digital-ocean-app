import React from 'react';

export default class PrintedService {
  static handlePrinted(name, checked, data) {
    const printedValues = data.map((row) =>
      row.id === name ? { ...row, printed: checked } : { ...row }
    );
    return printedValues;
  }
}
