import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import $api, { cleanToken } from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './AddDocuments.css';
import { Store } from '../../Store';

function AddDocuments() {
  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const { state } = useContext(Store);
  const { jwtToken, refreshToken } = state;

  const checkAuth = async () => {
    try {
      const { data } = await $api.post('/Users/refresh-token', {
        token: cleanToken(jwtToken),
        refreshToken: cleanToken(refreshToken),
        udid: 'test',
      });
      localStorage.setItem('token', data.jwtToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
      toast.error('Не вдалося оновити токен');
    }
  };

  useEffect(() => {
    const serverTime = new Date(localStorage.getItem('time')).getMinutes();
    const minutesNow = new Date().getMinutes();
    if (minutesNow - serverTime > 4) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (e) => {
    e.preventDefault();
    try {
      await $api.post('/Parts/add-to-warehouse', {
        documentID: documentID,
        sheetID: sheetID,
        page: 0,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Document already exist');
      } else {
        toast.error('Не вдалося завантажити документ');
      }
    }
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
              <div>{/* <button onClick={checkAuth}>token</button> */}</div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AddDocuments;
