import React, { useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './AddDocuments.css';

function AddDocuments() {
  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  let items = [];
  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/add-to-warehouse',
          {
            documentID: documentID,
            sheetID: sheetID,
          }
        )
        .then((response) => {
          //const response = res.data;
          //setData(res.data);
          console.log(response.data.message);
          //console.log(res);
          if (response.data.message) {
            items.push(res.data.message);
            console.log(items);
          }
        })
        .catch((error) => {
          console.log(error.response.status);

          if (error.response.status === 400) {
            alert('Document already exist');
          }
        });
    } catch (response) {
      console.log(response.data);
      alert(response);
    }
    console.log(items);

    // if (items) {
    //   alert('Document already exist');
    // }
  };

  return (
    <div className="app4">
      <div className="app__body4">
        <Sidebar />
        <div className="form">
          <Container className="small-container mx-4">
            <h1 className=" my-4 test2">Загрузити дані по документу</h1>
            <Form onSubmit={getData} className="test2">
              <FormGroup className="mb-3" controlId="documentID">
                <Form.Label>urlID</Form.Label>
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
    </div>
  );
}

export default AddDocuments;
