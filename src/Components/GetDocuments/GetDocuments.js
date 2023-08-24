import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './GetDocuments.css';
import BarcodeGen from '../BarcodeGen';
import { Store } from '../../Store';
import axios from 'axios';
import CheckedService from '../../services/CheckedService';
import PrintedService from '../../services/PrintedService';

function GetDocuments() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  let { printerUrl } = userInfo;
  // printerUrl =
  //   'http://desktop-an879b6/Integration/WebServiceIntegration/Execute';

  // let userInfo.printerUrl = 'http://desktop-an879b6/Integration/WebServiceIntegration/Execute'
  console.log(userInfo.printerUrl);

  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');
  const [active, setActive] = useState('');

  const getDocument = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-documents',
          {
            documentId: documentID, // '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
            sheetId: sheetID, // '2020',
          }
        )
        .then((res) => {
          const response = res.data;
          setData(response);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const newID = localStorage.getItem('id');
  // const newRhinoID = localStorage.getItem('rhinoID');
  // console.log(newID);
  // console.log(newRhinoID);

  // const [text, setText] = useState(`${newID}`);
  // const [barcode, setBarcode] = useState(`${newID}`);

  // const generateBarcode = () => {
  //   //e.preventDefault();
  //   setBarcode(text);
  // };
  // console.log(barcode);

  // useEffect(() => {
  //   handleChecked( e);
  // }, [, e]);

  const getData4 = (item) => {
    try {
      const res = axios
        .get(
          `http://desktop-an879b6/Integration/WebServiceIntegration/Execute?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const barcodeNew = async (e, item) => {
    e.preventDefault();
    try {
      console.log(
        '${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}'
      );

      await fetch(
        `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
      ).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    //newPrintFunc2();
  };

  const newPrintFunc2 = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post('https://rhino-api-alquo.ondigitalocean.app/Parts/print', {
          documentId:
            'https://docs.google.com/spreadsheets/d/1muyRQSoOxxeweyX5ONvAhKX0JQAA0q6jiKiLAhM62-A', // '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
          sheetId: '2020', // '2020',
          barCode: 'vV7DAICGkg',
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

  const barcodeNew2 = async (e, item) => {
    const response = await axios.get(
      `http://desktop-an879b6/Integration/WebServiceIntegration/Execute?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
    );
  };

  // two sum
  // let sum = 4;
  // let array = [1, 2, 3];
  // let array2 = [];
  // let secval;

  // for (let i = 0; i < array.length; i++) {
  //   console.log(array[i]);
  //   console.log(sum - array[i]);
  //   let temp = sum - array[i];
  //   // console.log(beasts.indexOf('bison'));
  //   console.log(array.indexOf(temp));
  //   secval = array.indexOf(temp);

  //   array2.push([secval]);

  //   // if (array.includes(temp)) {
  //   //   console.log('ojdfj');
  //   // }
  //   console.log(array2);
  // }

  // new task

  const hangleBarcode = (e, item) => {
    e.preventDefault();
    console.log(item);
    ctxDispatch({ type: 'BARCODE_ID', payload: item.id });
    ctxDispatch({ type: 'BARCODE_RHINOID', payload: item.rhinoID });
    localStorage.setItem('id', item.id);
    localStorage.setItem('rhinoID', item.rhinoID);
    //navigate('/barcode');
    // getData2(item);
    //getData3(item);
    getData4(item);

    // http://localhost:5000?id={код баркода}&veh={имя авто}&name={наименование товара}

    //return <BarcodeGen id={item} />;
  };

  function handleChecked(e) {
    //e.preventDefault();
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
    //return value;
  }
  console.log(data);
  // console.log(handleChecked);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <Container className="small-container">
            <h1 className="my-3">Отримати дані по документу</h1>
            <Form onSubmit={getDocument}>
              <FormGroup className="mb-3" controlId="documentID">
                <Form.Label>urlID</Form.Label>
                <Form.Control
                  // type="phone"
                  required
                  onChange={(e) => setDocumentID(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="mb-3" controlId="sheetID">
                <Form.Label>SheetID</Form.Label>
                <Form.Control
                  // type="password"
                  onChange={(e) => setSheetID(e.target.value)}
                />
              </FormGroup>
              <div className="mb-3">
                <Button type="submit">Отримати дані по документу</Button>
              </div>
            </Form>
          </Container>

          <div>
            {/* Get documents is here */}
            <div className="button">
              {/* <button className="btn btn-primary" onClick={getDocument}>
            Отримати дані по документу
          </button> */}
            </div>
            <div>
              <Row>
                <Col>
                  <Table bordered className="border">
                    <thead className="text-black table-header">
                      <tr>
                        {/* <th>
                          <input
                            type="checkbox"
                            name="allselect"
                            placeholder="some"
                            checked={!data.some((row) => row.defect !== true)}
                            onChange={handleChecked}
                          />
                        </th> */}
                        <th>printed</th>
                        <th>vehicle</th>
                        <th>name</th>
                        <th>rhinoID</th>
                        {/* <th>origonalID</th> */}
                        <th>stock price</th>
                        <th>income price</th>
                        <th>price with depreciation</th>
                        <th>delivery info</th>
                        <th>quantity</th>
                        <th>id</th>
                        <th>barcode</th>
                        {/* <th>марштрутный лист</th> */}
                      </tr>
                    </thead>
                    <tbody
                      // style={{
                      //   backgroundColor: data.map((item) => item.printed)
                      //     ? 'black'
                      //     : 'blue',
                      // }}
                      className="text-primarily table-body"
                    >
                      {data.map((item, index) => (
                        <tr key={index}>
                          {/* <td>
                            {' '}
                            <input
                              type="checkbox"
                              name={item?.id || false}
                              checked={item.defect || false}
                              onChange={handleChecked}
                            />
                          </td> */}

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
                          </th>
                          <td
                            style={{
                              backgroundColor: item.printed
                                ? 'gray'
                                : 'text-secondary no-wrap',
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
                          {/* <th>{item.originalIDs.join(', ')}</th> */}
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
                            {item.deliveryInfo}
                          </td>
                          {/* <th>{item.id}</th> */}
                          {/* <Link to={`/get-documents/${'id'} =${item.id}`}> */}
                          <td>{item.qnt}</td>
                          <td
                            style={{
                              backgroundColor: item.printed
                                ? 'gray'
                                : 'text-secondary',
                            }}
                          >
                            {item.id}
                          </td>
                          {/* </Link> */}
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
                                onClick={(e) => {
                                  barcodeNew(e, item);
                                  newPrintFunc2(e);
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
    </div>
  );
}

export default GetDocuments;
