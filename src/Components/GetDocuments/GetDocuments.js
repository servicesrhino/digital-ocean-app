import React, { useContext, useState } from 'react';
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

function GetDocuments() {
  const [data, setData] = useState([]);
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

  const getData2 = (item) => {
    try {
      const res = $api
        .get(
          `http://${printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getData3 = (item) => {
    try {
      const res = $api
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

  const barcodeNew = (e, item) => {
    e.preventDefault();
    try {
      const res = $api
        .get(
          `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          // setData(response);
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

  // let numbers = [1, 2, 3];
  // let result = numbers.reduce((total, item) => (total += item), 0);
  // console.log(result);
  // let finalRes = result / numbers.length;
  // console.log(numbers.length);
  // console.log(finalRes);

  // const func = (num) => {
  //   let arr = [];
  //   for (let i = 0; i < arr.length; i++) {}
  //   arr.push(num - 1);
  // };
  // let res = func(3);
  // console.log(res);

  // let testNum = Array.from(Array(8 + 1).keys());
  // console.log(testNum);
  // let nextNum = testNum.reduce((total, item) => (total += item), 0);
  // console.log(nextNum);
  // // let final = 1 + nextNum;
  // // console.log(final);

  // let text = 'world';
  // let text4 = 'hello world';
  // let text4new = text4.substring(1);
  // console.log(text4new);
  // let variable = text.charAt(0);
  // console.log(variable);
  // let arr = [];
  // let arr2 = [];
  // let arr4 = [];
  // for (let i = 0; i < text.length; i++) {
  //   arr.push(text.charAt(i));
  // }
  // for (let i = text.length - 1; i >= 0; i--) {
  //   arr2.push(text.charAt(i));
  // }
  // for (let i = text4.length - 1; i >= 0; i--) {
  //   arr4.push(text4[i]);
  // }

  // console.log(arr);
  // let arr3 = ['hello', 'world', 'this', 'is', 'great'];
  // const resTest = arr3.join(' ');
  // console.log(resTest);
  // console.log(arr);
  // console.log(arr2);
  // console.log(arr4);
  // //let newvartest = arr4
  // //console.log(newvartest);
  // let newTest4 = arr4.join(' ');
  // console.log(newTest4);
  // //let newTest5 = newTest4.reverse();
  // //console.log(newTest5);
  // let newtest = arr2.join('');
  // console.log(newtest);

  // let textTest = 'arrro';
  // let textTest2 = 'Arrro';

  // if (textTest.startsWith('a')) {
  //   console.log('you win');
  // }
  // if (textTest2.startsWith('A')) {
  //   console.log(textTest2 + ' you win');
  // }

  // //kata Sum of positive
  // let res5 = [];
  // let testarr5 = [1, -2, 3, 4, 5];
  // for (let i = 0; i < testarr5.length; i++) {
  //   if (testarr5[i] >= 0) {
  //     res5.push(testarr5[i]);
  //   }
  // }
  // console.log(res5);
  // let res6 = res5.reduce((total, item) => (total += item), 0);
  // console.log(res6);

  // var re = /([А-ЯЁа-яё]+)\s([А-ЯЁа-яё]+)/;
  // var str = 'Джон Смит';
  // var newstr = str.replace(re, '$2 $1');
  // console.log(newstr); // Смит, Джон

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
                <Col md={12}>
                  <Table bordered className="border">
                    <thead className="text-black table-header">
                      <tr>
                        <th>vehicle</th>
                        <th>name</th>
                        <th>rhinoID</th>
                        {/* <th>origonalID</th> */}
                        <th>stock price</th>
                        <th>income price</th>
                        <th>price with depreciation</th>
                        <th>delivery info</th>
                        <th>id</th>
                        <th>barcode</th>
                        {/* <th>марштрутный лист</th> */}
                      </tr>
                    </thead>
                    <tbody className="text-secondary table-body">
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.vehicle}</td>
                          <td>{item.name}</td>
                          <td>{item.rhinoID}</td>
                          {/* <th>{item.originalIDs.join(', ')}</th> */}
                          <td>{item.stockPrice}</td>
                          <td>{item.incomePrice}</td>
                          <td>{item.priceWithDepreciation}</td>
                          <td>{item.deliveryInfo}</td>
                          {/* <th>{item.id}</th> */}
                          {/* <Link to={`/get-documents/${'id'} =${item.id}`}> */}
                          <td>{item.id}</td>
                          {/* </Link> */}
                          <td>
                            {item ? (
                              // Чтобы страница открывалась в новой вкладке в <Link> нужно установить опцию target="_blank"
                              // target="_blank"

                              <button
                                onClick={(e) => barcodeNew(e, item)}
                                className="btn btn-danger"
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
