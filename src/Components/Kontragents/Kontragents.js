import React, { useEffect, useState } from 'react';
import './Kontragents.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import $api from '../http';

function Kontragents() {
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  const addKontragents = async (e) => {
    try {
      const res = $api
        .post(`https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/add`, {
          name: name,
          phone: phone,
          email: email,
          details: details,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getKontragents();
  }, []);

  const getKontragents = async (e) => {
    try {
      const res = $api
        .post(
          `https://rhino-api-dyq7j.ondigitalocean.app/Сounterparty/get-all`,
          {
            page: 0,
            pageSize: 0,
          }
        )
        .then((response) => {
          console.log(response);
          setData(response.data);
        });
    } catch (error) {}
  };
  console.log(data);

  return (
    <div className="app4">
      <div className="app__body4">
        <Sidebar />
        <div className="form">
          <Container className="small-conteiner mx-4">
            <h1 className="my-4 test2">Koнтрагенти</h1>
            <div className="small-container">
              <Form onSubmit={addKontragents} className="test2">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Ім'я</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                  <Form.Label>Деталі</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setDetails(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <div className="mb-3">
                  <Button type="submit">Відправити</Button>
                </div>
              </Form>
            </div>
          </Container>
          <div>{/* <button onClick={getKontragents}>dfd</button> */}</div>
          <div>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Ім'я</th>
                      <th>Телефон</th>
                      <th>Email</th>
                      <th>Деталі</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.details}</td>
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

export default Kontragents;
