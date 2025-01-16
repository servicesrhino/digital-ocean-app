import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';
import './Inventorization.css';

const Inventorization = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    const result = axios
      .get('https://rhino-api-dyq7j.ondigitalocean.app/Inventory/gelList')
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  };
  console.log('some:', data);
  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <button className="btn btn-primary" onClick={getData}>
            Переобліки
          </button>

          {data.status === 'open' ? <button className="m-2">open</button> : ''}
          {/* <button>Создать переучет</button> */}

          <Row>
            <Col>
              <Table hover>
                <thead className="text-right table-header text-header">
                  <tr>
                    <th>Дата</th>
                    {/* <tfewxxh>ID</tfewh> */}
                    <th>Nомер</th>
                    <th>Статус</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="text-secondary table-body">
                  {data.map((getData, index) => (
                    <tr key={index}>
                      <th>{getData.date.slice(0, 10)}</th>
                      {/* <th>{getData.id}</th> */}
                      <th>{getData.number}</th>
                      <th>{getData.status}</th>
                      <th>
                        {data.status === 'open' ? (
                          <button disabled>закрыть переучет</button>
                        ) : (
                          <button className="btn btn-danger">
                            закрыть переучет
                          </button>
                        )}
                        {/* if (data.status === 'open')
                        {<button>Закрыть переучет</button>} */}
                      </th>
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

export default Inventorization;
