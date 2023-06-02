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
    <div>
      <Container className="small-container">
        <h1 className="my-3">Отримати дані по маршрутному листу</h1>
        <Form onSubmit={getData}>
          <FormGroup className="mb-3" controlId="documentID">
            <Form.Label>documentID</Form.Label>
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
            <Button type="submit">Відправити</Button>
          </div>
        </Form>
      </Container>
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
              <tr>
                <th>id</th>
                <th>date</th>
                {/* <th>updateTimeDate</th>
                <th>documentId</th> */}
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
                <td>{data.date}</td>
                {/* {final.map((item) => (
                  <div>{item}</div>
                ))} */}

                {/* <td>{data.updateTimeDate}</td>
                <td>{data.documentId}</td> */}

                {/* {data.id} */}
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

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>New phields2</th>
                <th>New phields3</th>
              </tr>
            </thead>
            <tbody>
              {/* {routeListItems.map((item, index) => {
                <tr>
                  <td>{item.managerName}</td>
                </tr>;
              })} */}
              <tr>
                {final.map((item) => (
                  <tr key={item}>
                    <td>{item}</td>
                    {final2.map((item) => (
                      <tr key={item}>
                        <td>{item[0].vehicleName}</td>
                        <td>{item[0].endPoint}</td>
                        <td>{item[0].partName}</td>
                        <td>{item[0].originalId}</td>
                        <td>{item[0].qnt}</td>
                      </tr>
                    ))}
                  </tr>
                ))}
              </tr>
              some words
              {/* {
                // Object.values(first).map((item) => console.log(item.managerName))
                Object.values(final).map((item) => {
                  <tr>
                    <td>{item.managerName}</td>
                  </tr>;
                })
              } */}
              {/* {data &&
                data.routeListItems.map((item, index) => {
                  <tr>
                    <td>{item}</td>
                  </tr>;
                })} */}
              {/* {routeListItems.map((item, index) => {
                <tr>
                  <th>{item.managerName}</th>
                </tr>;
              })} */}
              {final2.map((item) => (
                <tr key={item}>
                  <td>{item[0].vehicleName}</td>
                  <td>{item[0].endPoint}</td>
                  <td>{item[0].partName}</td>
                  <td>{item[0].originalId}</td>
                  <td>{item[0].qnt}</td>
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
  );
}

export default GetRouteSheet;
