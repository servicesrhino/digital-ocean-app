import { useState } from 'react';
import { toast } from 'react-toastify';
import $api from '../Components/http';
import PrintedService from '../services/PrintedService';
import RemoveCheckService from '../services/RemoveCheckService';

function buildPrintUrl(printerUrl, item) {
  const cleanPrinterUrl = printerUrl.replace(/^https?:\/\//, '');
  return `http://${cleanPrinterUrl}?id=${encodeURIComponent(
    item.id
  )}&veh=${encodeURIComponent(item.vehicle)}&name=${encodeURIComponent(
    item.name
  )}%20${encodeURIComponent(item.rhinoID)}`;
}

function printBarcode(printerUrl, item) {
  return fetch(buildPrintUrl(printerUrl, item), {
    referrerPolicy: 'unsafe-url',
    mode: 'no-cors',
    credentials: 'include',
  });
}

export function usePrintableTable({
  data,
  setData,
  printerUrl,
  documentId,
  sheetId = '2020',
}) {
  const [styled, setStyled] = useState(false);

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setData(RemoveCheckService.remove(name, checked, data));
  };

  const barcodeNew = async (e, item) => {
    e.preventDefault();
    const { name, checked } = e.target;
    setData(PrintedService.handlePrinted(name, checked, data));

    try {
      await printBarcode(printerUrl, item);
    } catch (error) {
      toast.error('Не вдалося звернутися до принтера');
    }
  };

  const newPrintFunc2 = async (e, item) => {
    e.preventDefault();
    try {
      await $api.post('/Parts/print', {
        documentId,
        sheetId,
        barCode: item.id,
      });
    } catch (error) {
      toast.error('Не вдалося надрукувати штрихкод');
    }
  };

  const togle = (e, item) => {
    e.preventDefault();
    setStyled((prev) => !prev);
  };

  const printAll = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(data.map((item) => printBarcode(printerUrl, item)));
    } catch (error) {
      toast.error('Не вдалося надрукувати всі штрихкоди');
    }
  };

  return { styled, handleChecked, barcodeNew, newPrintFunc2, togle, printAll };
}
