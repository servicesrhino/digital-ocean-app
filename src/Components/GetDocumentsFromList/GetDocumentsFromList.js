import React, { useState, useContext, useEffect } from 'react';
import './GetDocumentsFromList.css';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import PrintedService from '../../services/PrintedService';
import $api from '../http';
import RemoveCheckService from '../../services/RemoveCheckService';

function GetDocumentsFromList() {
  const [data, setData] = useState([]);

  const tes2 =
    'https://docs.google.com/spreadsheets/d/1_j-WNAwx21E6XFeE2gs62eH5P2YdYASQmouMaR7dvmM';
  const tes3 = '2020';

  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
//  console.log(lastDocumentsFromList);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  let { printerUrl } = userInfo;

  const getDocumentsFromList = () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-documents-fromlist',
          {
            documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
            sheetId: '2020',
          }
        )
        .then((res) => {
   //       console.log(res.data);
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
//  console.log(data);
  useEffect(() => {
    getDocumentsFromList();
  }, []);

  useEffect(() => {
    document.addEventListener('click', commit);

    // return () => {
    //   document.removeEventListener('click', commit);
    // };
  }, [data]);

  const commit = (event) => {
    const { name, checked } = event.target;
    console.log(name);
    console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);

    const printed = data.map((row) =>
      row.id === name ? { ...row, printed: checked } : { ...row }
    );
    setData(printed);
//    console.log(printed);
//    console.log(name);
//    console.log(checked);
//    console.log(data);
//    console.log(value);

    if (event.key === 'a') {
      console.log('Enter key pressed', event.key);
    }
  };

  const barcodeNew = async (e, item) => {
    e.preventDefault();
    const { name, checked } = e.target;
//    console.log(name);
//    console.log(checked);

    const value = PrintedService.handlePrinted(name, checked, data);
//    console.log(name);
//    console.log(checked);
//    console.log(data);
    //setSheetData2(value);

    // const checkedValue = data.map((row) =>
    //   row.id === name ? { ...row, printed: true } : { ...row, printed: false }
    // );
    // console.log(checkedValue);

    setData(value);

    try {
      console.log(
        '${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name+item.rhinoID}'
      );

      await fetch(
        `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${
          item.name + ' ' + item.rhinoID
        }`
      ).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    //newPrintFunc2();
  };

  const newPrintFunc2 = async (e, item) => {
    e.preventDefault();
    try {
      const res = $api
        .post('https://rhino-api-alquo.ondigitalocean.app/Parts/print', {
          documentId: tes2, // '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
          sheetId: '2020', // '2020',
          barCode: item.id,
        })
        .then((res) => {
          const response = res.data;
          //setData(response);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleChecked(e) {
    //e.preventDefault();
    const { name, checked } = e.target;
 //   console.log(name);
 //   console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);
 //   console.log(name);
 //   console.log(checked);
 //   console.log(data);
    //setSheetData2(value);

    // const checkedValue = data.map((row) =>
    //   row.id === name ? { ...row, printed: true } : { ...row, printed: false }
    // );
    // console.log(checkedValue);

    setData(value);
    //return value;
  }

  const printAll = async (e) => {
    e.preventDefault();

    // data.forEach(item => {
    for (const item of data) {
      //   const contents = await fs.readFile(file, 'utf8');
      //     console.log(contents);

      try {
        console.log(
          '${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name+item.rhinoID}'
        );

        await fetch(
          `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${
            item.name + ' ' + item.rhinoID
          }`
        ).then((res) => {
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }

      await timer(1000);
    }
    // });

    //newPrintFunc2();
  };

  function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати дані з листа</h1>
          {/* <button onClick={getDocumentsFromList}>helo</button> */}
          <div className="mb-3">
            <Button type="printAll" onClick={printAll}>
              Надрукувати все
            </Button>
          </div>
          <div>
            <Row>
              <Col>
                <Table bordered className="border">
                  <thead className="text-black table-header">
                    <tr>
                      <th>машина</th>
                      <th>назва </th>
                      <th>rhinoID</th>
                      <th>stock price</th>
                      <th>income price</th>
                      <th>price with depreciation</th>
                      <th>кіл-сть стікерів</th>
                      <th>id</th>
                      <th>дефекти</th>
                      <th>баркод</th>

                      {/* <th>оригінальний id</th> */}
                      {/* <th>доставка</th> */}
                    </tr>
                  </thead>
                  <tbody className="text-primarily table-body">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.vehicle}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.rhinoID}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.stockPrice}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.incomePrice}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.priceWithDepreciation}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.barCodePrintQnt}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item.defect}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.printed
                              ? 'gray'
                              : 'text-secondary',
                          }}
                        >
                          {item ? (
                            // Чтобы страница открывалась в новой вкладке в <Link> нужно установить опцию target="_blank"
                            // target="_blank"

                            <button
                              name={item.id}
                              checked={item.printed || false}
                              onChange={handleChecked}
                              onClick={(e) => {
                                barcodeNew(e, item);
                                newPrintFunc2(e, item);
                                //handleClick();
                              }}
                              className="btn btn-danger"
                              style={{
                                backgroundColor: item.printed
                                  ? 'gray'
                                  : 'btn btn-danger',
                              }}
                            >
                              Barcode
                            </button>
                          ) : (
                            // <Link to="/barcode">
                            <button
                              onClick={(e) => barcodeNew(e, item)}
                              className="btn btn-danger"
                            >
                              Barcode
                            </button>
                            // </Link>
                          )}
                        </td>
                        {/* <td>{item.stock}</td> */}
                        {/* <td>{item.originaID}</td> */}
                        {/* <td>{item.deliveryInfo}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetDocumentsFromList;
