import React, { useState, useContext, useEffect } from 'react';
import './GetDocumentsFromList.css';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';

function GetDocumentsFromList() {
  const [data, setData] = useState([]);

  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);

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
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getDocumentsFromList();
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати дані з листа</h1>
          {/* <button onClick={getDocumentsFromList}>helo</button> */}
          <div>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>машина</th>
                      <th>назва </th>
                      <th>rhinoID</th>
                      <th>id</th>
                      <th>stock price</th>
                      <th>stock with depreciation</th>
                      <th>оригінальний id</th>
                      <th>доставка</th>
                      <th>кількість</th>
                      <th>дефекти</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.vehicle}</td>
                        <td>{item.name}</td>
                        <td>{item.rhinoID}</td>
                        <td>{item.id}</td>
                        <td>{item.stockPrice}</td>
                        <td>{item.stock}</td>
                        <td>{item.originaID}</td>
                        <td>{item.deliveryInfo}</td>
                        <td>{item.barCodePrintQnt}</td>
                        <td>{item.defect}</td>
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
