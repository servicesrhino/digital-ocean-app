import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import Sidebar from '../../Sidebar/Sidebar';
import './GetRouteSheet.css';

function GetRouteSheet() {
  const navigate = useNavigate();

  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const [data, setData] = useState([]);
  const [routeListItems, setRouteListItems] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [final, setFinal] = useState([]);
  const [final2, setFinal2] = useState([]);

  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-route-list',
          {
            // documentId: 'BKOkLeHb-zF99JnZE8PtpTOa2UukgqpxjV6ske740qc',
            // sheetId: 'Sheet1',
            documentId: documentID,
            sheetId: sheetID,
          }
        )
        .then((res) => {
          const response = res.data;
          setData(res.data);
          // navigate('/get-route-sheet-data');
          console.log(res.data);
          console.log(res.data.id);
          console.log(res.data.routeListItems);
          console.log(res.data.routeListItems.routeItems);

          setRouteListItems(res.data.routeListItems);
          setFinal(
            Object.values(res.data.routeListItems).map(
              (item) => item.managerName
            )
          );
          setFinal2(
            Object.values(res.data.routeListItems).map(
              (item) => item.routeItems
            )
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const getData = () => {
  //     try {
  //       const res = $api
  //         .post(
  //           'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-route-list',
  //           {
  //             documentId: '1BKOkLeHb-zF99JnZE8PtpTOa2UukgqpxjV6ske740qc',
  //             sheetId: 'Sheet1',
  //           }
  //         )
  //         .then((res) => {
  //           const response = res.data;
  //           console.log(res.data);
  //           //setAllData(response);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  console.log(data.id);
  // const [routeListItems] = data;
  // console.log(routeListItems);
  console.log(Object.entries(routeListItems));
  console.log(routeListItems[0]);

  const first = routeListItems;
  console.log(first);
  Object.values(first).map((item) => console.log(item.managerName));

  console.log(routeListItems);
  Object.values(first).map((item) => console.log(item.routeItems));

  console.log(final);
  console.log(final2);
  console.log(final2.map((item) => console.log(item)));

  // routeListItems.map((item) => {
  //   console.log(item.managerName);
  //   setManagerName(item.managerName);
  // });

  // console.log(managerName);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="form">
            <Container className="small-container">
              <h4 className="my-1">Отримати дані по маршрутному листу</h4>
              <Form onSubmit={getData}>
                <FormGroup className="mb-1" controlId="documentID">
                  <Form.Label>urlID</Form.Label>
                  <Form.Control
                    // type="phone"
                    required
                    onChange={(e) => setDocumentID(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-2" controlId="sheetID">
                  <Form.Label>SheetID</Form.Label>
                  <Form.Control
                    // type="password"
                    onChange={(e) => setSheetID(e.target.value)}
                  />
                </FormGroup>
                <div className="mb-2">
                  <Button type="submit">Відправити</Button>
                </div>
              </Form>
            </Container>
          </div>
          {/* <form className="form">
        <input
          type="text"
          placeholde  r="documentID"
          className="input"
          value={documentID}
        />
        <input type="text" placeholder="sheetID" />
        <button onClick={getData} className="button">
          Отправить
        </button>
      </form> */}

          <Row>
            <Col>
              <Table>
                <thead>
                  {/* <tc> */}
                  <tr>
                    <th>id</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.map((item, index) => {
                <tr>
                  <td>{item.id}</td>
                </tr>;
              })} */}
                  <tr>
                    <td>{data.id}</td>
                    {/* {final.map((item) => (
                  <div>{item}</div>
                ))} */}

                    {/* <td>{data.updateTimeDate}</td>
                <td>{data.documentId}</td> */}

                    {/* {data.id} */}

                    <td>{data.date}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* {final.map((item) => (
        <div>
          <p>{item}</p>
        </div>
      ))} */}

          {/* { final2.map((item) => (
        <div> {item.vehicleName}</div>
      ))} */}
          {final[0]}
          <Row>
            <Col>
              <Table>
                <thead className="text-small">
                  {/* <tr>
                    <th>Name</th>
                    <th>vehicleName</th>
                    <th>endPoint</th>
                    <th>startPoint</th>
                    <th>comments</th>
                    <th>originalId</th>
                    <th>originalPrice</th>
                    <th>partName</th>
                    <th>qnt</th>
                  </tr> */}
                </thead>
                <tbody className="text-small table-body">
                  {routeListItems.map((item) => (
                    <tr>
                      {/* <td>{item.managerName}</td> */}
                      {/* <tr> */}
                      <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.vehicleName ? item.vehicleName : 'n/a'}
                            </td>
                            <td>{item.endPoint ? item.endPoint : 'n/a'}</td>
                            <td>{item.startPoint ? item.startPoint : 'n/a'}</td>
                            <td>{item.comments ? item.comments : 'n/a'}</td>
                            <td>{item.originalId ? item.originalId : 'n/a'}</td>
                            <td>
                              {item.originalPrice ? item.originalPrice : 'n/a'}
                            </td>
                            <td>{item.partName ? item.partName : 'n/a'}</td>
                            <td>{item.qnt ? item.qnt : 'n/a'}</td>
                          </tr>
                        ))}
                      </td>
                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.endPoint ? item.endPoint : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}
                      {/* </tr> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.startPoint ? item.startPoint : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.comments ? item.comments : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.originalId ? item.originalId : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.originalPrice ? item.originalPrice : 'n/a'}
                            </td>
                          </tr>
                        ))}
                      </td> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.partName ? item.partName : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}

                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.qnt ? item.qnt : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}
                    </tr>
                  ))}
                  {/* {final2.map(({ vehicleName }) => (
                <tr>
                  <td>{vehicleName}</td>
                </tr>
              ))} */}
                  {/* {Object.values(final2).map((item) => <td>{item}</td>))} */}
                  {/* {Object.keys(final2).map((item) => (
                <tr>
                  <td>{item}</td>
                </tr>
              ))} */}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default GetRouteSheet;
