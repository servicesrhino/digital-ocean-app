import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';
import './Inventorization.css';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const Inventorization = () => {
  const [data, setData] = useState([]);
  const [container, setContainer] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const getData = () => {
    const result = axios
      .get('https://rhino-api-dyq7j.ondigitalocean.app/Inventory/gelList')
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  };
  // console.log('some:', data);

  const data2 = (e, id) => {
    const result2 = axios
      .post(
        'https://rhino-api-dyq7j.ondigitalocean.app/GoogleSheet/get-last-documents-list'
      )
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((doc) => {
          return {
            ...doc,
            created: doc.created.slice(0, doc.created.indexOf('T')),
            test: doc.documentId,
            test2: id,
          };
        });
        setContainer(newData);
        ctxDispatch({ type: 'GET_INVENTORY_DETAILS2', payload: id });
      });
  };

  const some = (e, info) => {
    try {
      console.log(info);
      ctxDispatch({ type: 'GET_INVENTORY_DETAILS', payload: info });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!data) return;
  //   data2();
  // }, [data]);

  // console.log('container:', container);
  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <div>
            <button className="btn btn-primary" onClick={getData}>
              Переобліки
            </button>

            {data.status === 'open' ? (
              <button className="m-2">open</button>
            ) : (
              ''
            )}
            {/* <button>some</button> */}
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
                        <th>
                          <button onClick={(e) => data2(e, getData.id)}>
                            Отримати контейнери
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          {/* <button>Відкрити контейнери</button> */}
          <div>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Дата</th>
                      <th>Назва документу</th>
                    </tr>
                  </thead>

                  <tbody>
                    {container &&
                      container.map((getData, index) => (
                        <tr key={index}>
                          <td>{getData.created}</td>
                          <td onClick={(e) => some(e, getData.test)}>
                            <Link to="/inventorization-details">
                              {' '}
                              {getData.documentName}{' '}
                            </Link>
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
  );
};

export default Inventorization;
