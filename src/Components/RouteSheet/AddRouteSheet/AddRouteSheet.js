import React, { useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
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
      await $api.post('/GoogleSheet/add-route-list', {
        documentID: documentID,
        sheetID: sheetID,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Document already exist');
      } else {
        toast.error('Не вдалося завантажити маршрутний лист');
      }
    }
  };

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
          <h1 className="my-3 test2">Загрузити дані по маршрутному листу</h1>
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
  );
}

export default AddRouteSheet;
