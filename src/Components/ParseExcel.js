import React, { useState, useRef, useContext } from 'react';
import { Row, Table, Col, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import $api from './http';
import { Store } from '../Store';
import BarcodeGen from './BarcodeGen';
import { Link } from 'react-router-dom';
import CheckedService from '../services/CheckedService';
import KeyValueStreamlineService from '../services/KeyValueStreamlineService';
import ParseService from '../services/ParseService';
import SaveHelperService2 from '../services/SaveHelperService2';
import TransformService from '../services/TransformService';
import Sidebar from './Sidebar/Sidebar';
import './Sidebar/Sidebar.css';
import './ParseExcel.css';

const ParseExcel = () => {
  const acceptableFileName = ['xlsx', 'xls'];
  const navigate = useNavigate();

  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();

  const [sheetData2, setSheetData2] = useState([]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { category } = state;

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split('.')[1]);
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert('Invalid File Type');
      return;
    }

    let patternName = 'CH РЕАЛ Август #20 #21.xlsx';
    let patternName2 = 'БУ список.xlsx';

    setFileName(myFile.name);

    let jsonData2 = [];
    if (myFile.name === patternName) {
      jsonData2 = await ParseService.parse(myFile, 1);
    } else if (myFile.name === patternName2) {
      jsonData2 = await ParseService.parse(myFile, 1.1);
    } else {
      jsonData2 = await ParseService.parse(myFile, 2);
    }

    let mark = [];
    let mark2 = [];

    mark.push(jsonData2[0][0]);
    for (let i = 0; i < jsonData2.length; i++) {
      if (jsonData2[i][0]) {
        mark2.push(jsonData2[i][0]);
      }

      if (jsonData2[i][0] !== mark[0] && jsonData2[i][0] !== 0) {
        jsonData2[i].unshift([
          ...mark2.filter((item, i) => item[i] !== jsonData2[i][0]),
        ]);
      }
    }

    jsonData2.pop();
    jsonData2.pop();

    let testData = [];
    if (myFile.name === patternName2) {
      testData = TransformService.transform(jsonData2);
    }

    let items = jsonData2.map((item, i) => ({
      incomePrice: item[6] ? item[6] : item[7],
      priceWithDepreciation: item[11] ? item[11] : item[10], // previous variant: typeof item[10] != 'string' ? item[10] : item[11],
      stockPrice: 0,
      //name: item[2] ? item[2] : item[1] >= item[2] ? item[1] : item[2],
      name: item[1] ? (item[1] > item[2] ? item[1] : item[2]) : item[2],
      // name: item[0]
      //   ? item[1] > item[2]
      //     ? item[1]
      //     : item[2]
      //   : item[1]
      //   ? 'somephield'
      //   : 'somepjeilda',
      rhinoID: item[3]
        ? item[3]
        : item[2]
        ? item[3]
          ? item[3]
          : item[2]
        : 'someId',
      originalIDs: item[4] ? item[4] : 0,
      deliveryInfo: 'some',
      vehicle: Array.isArray(item[0])
        ? item.map((item) => item[item.length - 1]).find((item) => item[0])
        : item[0],
    }));

    let items2 = items.filter((user) => user.name !== undefined);
    items.splice(items.filter((user) => user.name === undefined));
    if (myFile.name === patternName) {
      // Ниже логика по изменению ключа/значения в нужный формат
      const finalData = KeyValueStreamlineService.stremline(jsonData2);

      // Ниже логика создания уникальных id и округления цены
      const newData = items2.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);
      setSheetData2(newData);
    } else {
      // Ниже логика по изменению ключа/значения в нужный формат
      const finalData = KeyValueStreamlineService.stremline(jsonData2);

      // Ниже логика создания уникальных id и округления цены
      const newData = finalData.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);
      setSheetData2(newData);
    }
    if (myFile.name === patternName2) {
      // Ниже логика создания уникальных id и округления цены
      const newData = testData.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);
      setSheetData2(newData);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    fileRef.current.value = '';
    setSheetData2([]);
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);

    const value = CheckedService.handleCheckedFunc(name, checked, sheetData2);
    setSheetData2(value);
  };

  const hangleBarcode = (getusers) => {
    console.log(getusers);
    ctxDispatch({ type: 'BARCODE_ID', payload: getusers.id });
    ctxDispatch({ type: 'BARCODE_RHINOID', payload: getusers.rhinoID });
    localStorage.setItem('id', getusers.id);
    localStorage.setItem('rhinoID', getusers.rhinoID);
    navigate('/barcode');
    return <BarcodeGen id={getusers} />;
  };

  const saveData5 = async () => {
    const items = SaveHelperService2.save(category, sheetData2);
    setSheetData2(items);

    try {
      await $api.post('/Parts/add-to-warehouse', {
        items,
      });
      toast.success('Data succesfully saved');
    } catch (error) {
      toast.error('Не вдалося зберегти дані');
    }
  };

  const handleParts = () => {
    navigate('/allparts');
  };

  console.log(sheetData2);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />

        <div className="app__other">
          <h1>Parse Excel</h1>
          {!fileName && (
            <div className="filename">Пожалуйста, загрузите файл.</div>
          )}
          {fileName && (
            <p>
              File name: <span className="filename">{fileName}</span>
            </p>
          )}
          <div className="row-rev">
            <div>
              <input
                className="filename"
                ref={fileRef}
                type="file"
                accept="xlsx, xls"
                multiple={false}
                onChange={(e) => handleFile(e)}
              />
            </div>

            <div>
              {fileName && (
                <i
                  className="now-ui-icon ui-1_simple-remove align-middle"
                  onClick={handleRemove}
                >
                  <div className="bg-gray   ">
                    <CloseButton />
                  </div>
                </i>
              )}
            </div>
          </div>
          <div className="my-3">
            <button onClick={saveData5}>Сохранить</button>
          </div>

          <div className="my-3">
            <button onClick={handleParts}>Get Parts</button>
          </div>

          <Row>
            <Col md={12}>
              <Table bordered className="border">
                <thead className="text-primary table-header">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name="allselect"
                        placeholder="some"
                        checked={!sheetData2.some((row) => row.defect !== true)}
                        onChange={handleChecked}
                      />
                    </th>
                    <th>Авто</th>
                    <th>Наименование</th>
                    <th>НомерRhino</th>
                    <th>оригинальный номер</th>
                    <th>цена со склада</th>
                    <th>цена входящая</th>
                    <th>цена с амортизацией</th>
                    <th>дата завоза</th>
                    <th>штрих код</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetData2.map((getusers, index) => (
                    <tr key={index}>
                      <th>
                        {' '}
                        <input
                          type="checkbox"
                          name={getusers.id}
                          checked={getusers?.defect || false}
                          onChange={handleChecked}
                        />
                      </th>

                      <td>{getusers.vehicle} </td>
                      <td>{getusers.name} </td>
                      <td>{getusers.rhinoID} </td>
                      <td>{getusers.originalIDs}</td>
                      <td>{getusers.stockPrice}</td>
                      <td>{getusers.incomePrice}</td>
                      <td>{getusers.priceWithDepreciation}</td>
                      <td>{getusers.deliveryInfo}</td>
                      <td>
                        {getusers ? (
                          <Link to="/barcode">
                            <button
                              onClick={(e) => hangleBarcode(getusers)}
                              className="btn btn-danger"
                            >
                              Barcode
                            </button>
                          </Link>
                        ) : (
                          <Link to="/barcode">
                            <button
                              onClick={(e) => hangleBarcode(getusers)}
                              className="btn btn-danger"
                            >
                              Barcode
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ParseExcel;
