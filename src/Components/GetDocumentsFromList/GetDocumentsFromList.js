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
  const [data2, setData2] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [name, setName] = useState([]);

  const tes2 =
    'https://docs.google.com/spreadsheets/d/1_j-WNAwx21E6XFeE2gs62eH5P2YdYASQmouMaR7dvmM';
  const tes3 = '2020';

  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  let { printerUrl } = userInfo;

  const [styled, setStyled] = useState(false);

  const togle = (e, item) => {
    e.preventDefault();
    console.log(item);
    console.log(data);
    console.log(data.filter((el) => el.id === item.id));
    const newVal = data.map((el) =>
      el.id === item.id ? { ...el, togle: true } : { ...el }
    );
    console.log(newVal);
    setStyled(!styled);
    console.log(styled);
    return newVal;
  };
  const OnToggleMeHandler2 = () => {
    console.log('handler');
    //setStyled (styled => !styled);
    //setStyled(!styled);
    setStyled((styled) => (styled === 'true' ? 'false' : ''));
    console.log('handler3');
  };

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
          console.log(res.data);
          setData(res.data);
          setData2(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getDocumentsFromList();
  }, []);

  // useEffect(() => {
  //   document.addEventListener('click', commit);

  //   // return () => {
  //   //   document.removeEventListener('click', commit);
  //   // };
  // }, [data]);

  const commit = (event) => {
    const { name, checked } = event.target;
    console.log(name);
    console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);

    const printed = data.map((row) =>
      row.id === name ? { ...row, printed: checked } : { ...row }
    );
    setData(printed);
    console.log(printed);
    console.log(name);
    console.log(checked);
    console.log(data);
    console.log(value);

    if (event.key === 'a') {
      console.log('Enter key pressed', event.key);
    }
  };

  const barcodeNew = async (e, item) => {
    e.preventDefault();
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);

    const value = PrintedService.handlePrinted(name, checked, data);
    console.log(name);
    console.log(checked);
    console.log(data);
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
    console.log(name);
    console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);
    console.log(name);
    console.log(checked);
    console.log(data);
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

  // useEffect(() => {
  //   filtration();
  // }, [vehicle]);

  const filtration = (e) => {
    e.preventDefault();
    console.log(vehicle.length);
    let res = [];
    // console.log(
    //   data.filter((item) => {
    //     console.log(item.vehicle.toLowerCase());
    //     if (item.vehicle === vehicle) {
    //       res.push(item);
    //     }
    //     return item.vehicle === vehicle;
    //   })
    // );
    const oldData = [...data];
    console.log(oldData);
    console.log(
      data.filter((item) => {
        console.log(item.vehicle.toLowerCase());
        if (item.vehicle.toLowerCase().includes(vehicle.toLowerCase())) {
          res.push(item);
        }
        return item.vehicle === vehicle;
      })
    );
    console.log(data2);
    if (res) {
      setData(res);
    } else if (vehicle.length === 0) {
      res = [];
      setData(data2);
    }
    if (!vehicle) {
      getDocumentsFromList();
    }

    console.log(vehicle.length);
    console.log(res);

    // console.log(
    //   data.map((item) =>
    //     item.map((item2) => (item2.startsWith(vehicle) ? item : '123'))
    //   )
    // );

    console.log(
      data
        .map((item) => item.vehicle)
        .filter((item2) =>
          item2.toLowerCase().startsWith(vehicle.toLowerCase())
        )
    );
  };

  const filtration2 = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(name.length);
    let res2 = [];

    console.log(
      data.filter((item) => {
        console.log(item.name.toLowerCase());
        if (item.name.toLowerCase().includes(name.toLowerCase())) {
          res2.push(item);
        }
        //return res2;
      })
    );
    console.log(res2);
    if (res2) {
      setData(res2);
    }
    if (!name) {
      getDocumentsFromList();
    }
  };

  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати дані з листа</h1>
          {/* <button onClick={getDocumentsFromList}>helo</button> */}
          <div className="mb-3">
            <Button type="printAll" onClick={printAll}>
              Надрукувати все
            </Button>
            <div className="d-flex">
              <form onSubmit={filtration}>
                <input
                  id="vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="mt-2"
                />
              </form>
              <form onSubmit={filtration2}>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" mt-2 mx-2 "
                />
              </form>
            </div>
          </div>
          <div>
            <Row>
              <Col>
                <Table bordered className="border">
                  <thead className="text-black table-header">
                    <tr>
                      <th>printed</th>
                      <th>машина</th>
                      <th>назва </th>
                      <th>rhinoID</th>
                      <th>stock price</th>
                      <th>income price</th>
                      <th>price with depreciation</th>
                      <th>кількість</th>
                      <th>id</th>
                      <th>дефекти</th>
                      <th>баркод</th>

                      {/* <th>оригінальний id</th> */}
                      {/* <th>доставка</th> */}
                    </tr>
                  </thead>
                  <tbody className="text-primarily table-body">
                    {data.map((item, index) => (
                      // <div className={`post card ${styled ? 'styled' : ''}`}>

                      <tr
                        className={`${item.togle ? 'styled' : ''}`}
                        key={index}
                      >
                        <th
                          className="checkbox-style"
                          style={{
                            // display: 'flex',
                            // //flexDirection: 'column',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            backgroundColor: item.printed
                              ? 'gray checkbox-style'
                              : 'text-secondary checkbox-style ',
                          }}
                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary d-flex justify-content-center text-center my-auto',
                          // }}
                        >
                          <input
                            type="checkbox"
                            name={item.id}
                            checked={item.printed || false}
                            onChange={handleChecked}
                          />
                          {/* <Checkbox
                              label=""
                              //checked={true}
                              name={item.id}
                              checked={item.printed || false}
                              onChange={handleChecked}
                            /> */}
                        </th>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}
                          style={{
                            backgroundColor:
                              item.printed && item.togle
                                ? 'gray'
                                : 'text-secondary',
                          }}
                        >
                          {item.vehicle}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}

                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.name}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}

                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.rhinoID}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}

                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.stockPrice}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}

                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.incomePrice}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}
                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.priceWithDepreciation}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}
                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.barCodePrintQnt}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}
                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.id}
                        </td>
                        <td
                          className={`${item.printed ? 'styled' : ''}`}

                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
                        >
                          {item.defect}
                        </td>
                        {/* <div> */}
                        <td
                          className={`${item.printed ? 'styled' : ''}`}
                          // style={{
                          //   backgroundColor: item.printed
                          //     ? 'gray'
                          //     : 'text-secondary',
                          // }}
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
                                togle(e, item);
                                //handleClick();
                              }}
                              // className="btn btn-danger"
                              // style={{
                              //   backgroundColor:
                              //     item.printed && styled
                              //       ? 'styled'
                              //       : 'btn btn-danger',
                              // }}
                              className={`btn btn-danger${
                                item.printed ? 'styled' : 'btn btn-danger'
                              }`}
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
                        {/* </div> */}
                        {/* <td>
                          <button onClick={OnToggleMeHandler2}>delete</button>
                        </td> */}
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
