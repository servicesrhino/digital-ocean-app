import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './AddDocuments.css';
import { Store } from '../../Store';
import axios from 'axios';

function AddDocuments() {
  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { jwtToken, refreshToken } = state;
  console.log('jwt token:', jwtToken);
  console.log('refresh token:', refreshToken);

  // let newJWT = jwtToken
  let newJWT = jwtToken.replace(/['"«»]/g, '');
  const newRefresh = refreshToken.replace(/['"«»]/g, '');

  // let time = new Date()

  const token = localStorage.getItem('token');
  const newToken = token.replace(/['"«»]/g, '');

  const token2 = localStorage.getItem('refreshToken');
  const newToken2 = token2.replace(/['"«»]/g, '');

  const myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    '__cf_bm=elZ2RmQdcoPH4wkd8gU9542Crt0BrBtrdu9DjhP5g98-1715221667-1.0.1.1-y161k5eoP969ghIWCyKlZ_GTOBsyRfwGe9IA53BKuglROBoNLev0hT0rghN3y7TN75oa0sZRo_yTTbQCc37FFw'
  );

  const raw = JSON.stringify({
    token: `${newJWT}`,
    refreshToken: `${newRefresh}`,
    udid: 'test',
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://rhino-api-alquo.ondigitalocean.app/Users/refresh-token',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const newToken = token.replace(/['"«»]/g, '');
    // const test = localStorage.removeItem('token');

    const token2 = localStorage.getItem('refreshToken');
    const newToken2 = token2.replace(/['"«»]/g, '');
    const response2 = await axios
      .post(`https://rhino-api-alquo.ondigitalocean.app/Users/refresh-token`, {
        token: newJWT,
        //password,
        refreshToken: newRefresh,
        udid: 'test',
        //parentId: '',
      })
      .then((res) => {
        const response = res.data;
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // ctxDispatch({ type: 'IS_AUTH' });

        console.log(response);
      });
  };

  let items = [];
  let newVAr = localStorage.getItem('token');
  let time = localStorage.getItem('time');
  console.log('server time var:', time);
  let time2 = new Date(time);
  console.log(time2);
  let time3 = time2.getMinutes();
  console.log('minutes from server time:', time3);

  let date_now = new Date();
  console.log(date_now.getMinutes());
  console.log(date_now.getMinutes() - time3);

  if (date_now.getMinutes() - time3 > 4) {
    checkAuth();
  }

  const config = {
    headers: { Authorization: `Bearer ${newVAr}` },
  };
  console.log(newVAr);
  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse',
          {
            documentID: documentID,
            sheetID: sheetID,
            page: 0,
          },
          {
            config,
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

  // useEffect(() => {
  //   if (date_now.getMinutes() - time3 > 2) {
  //     checkAuth();
  //   }
  // }, [date_now.getMinutes(), time3]);

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
