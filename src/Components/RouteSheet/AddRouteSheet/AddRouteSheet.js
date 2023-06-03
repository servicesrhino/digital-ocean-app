import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import $api from '../../http';
import Sidebar from '../../Sidebar/Sidebar';
import './AddRouteSheet.css';

function AddRouteSheet() {
  //const [data, setData] = useEffect([]);
  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/add-route-list',
          {
            documentID: documentID,
            sheetID: sheetID,
          }
        )
        .then((res) => {
          const response = res.data;
          //setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.status);
          if (error.response.status === 400) {
            alert('Document already exist');
          }
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
  //           'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/add-route-list',
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

  return (
    <div className="app">
      {/* <form className="form">
        <input type="text" placeholder="documentID" className="input" />
        <input type="text" placeholder="sheetID" />
        <button onClick={getData} className="button">
          Отправить
        </button>
      </form> */}
      <div className="app__body">
        <Sidebar />
        <Container className="small-container">
          <h1 className="my-3">Загрузити дані по маршрутному листу</h1>
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
              <Form.Label>sheetID</Form.Label>
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
      </div>
    </div>
  );
}

export default AddRouteSheet;
