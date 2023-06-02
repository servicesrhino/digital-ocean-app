import React, { useContext, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './GetDocuments.css';
import BarcodeGen from '../BarcodeGen';
import { Store } from '../../Store';

function GetDocuments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  console.log(userInfo.printerUrl);

  const getDocument = () => {
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-documents',
          {
            documentId: '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
            sheetId: '2020',
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

  const newID = localStorage.getItem('id');
  const newRhinoID = localStorage.getItem('rhinoID');
  console.log(newID);
  console.log(newRhinoID);

  const [text, setText] = useState(`${newID}`);
  const [barcode, setBarcode] = useState(`${newID}`);

  const generateBarcode = () => {
    //e.preventDefault();
    setBarcode(text);
  };
  console.log(barcode);

  const getData2 = (item) => {
    try {
      const res = $api
        .get(
          `http://${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const hangleBarcode = (item) => {
    console.log(item);
    ctxDispatch({ type: 'BARCODE_ID', payload: item.id });
    ctxDispatch({ type: 'BARCODE_RHINOID', payload: item.rhinoID });
    localStorage.setItem('id', item.id);
    localStorage.setItem('rhinoID', item.rhinoID);
    //navigate('/barcode');
    getData2(item);
    // http://localhost:5000?id={код баркода}&veh={имя авто}&name={наименование товара}

    //return <BarcodeGen id={item} />;
  };

  return (
    <div>
      {/* <Sidebar /> */}
      <div>
        {/* Get documents is here */}
        <div className="button">
          <button className="btn btn-primary" onClick={getDocument}>
            Отримати дані по документу
          </button>
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
                            onClick={(e) => hangleBarcode(item)}
                            className="btn btn-danger"
                          >
                            Barcode
                          </button>
                        ) : (
                          // <Link to="/barcode">
                          <button
                            onClick={(e) => hangleBarcode(item)}
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
  );
}

export default GetDocuments;
