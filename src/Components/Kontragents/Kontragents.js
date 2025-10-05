import React, { useState } from 'react';
import './Kontragents.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Container, Form } from 'react-bootstrap';
import $api from '../http';

function Kontragents() {
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
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                  <Form.Label>details</Form.Label>
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
        </div>
      </div>
    </div>
  );
}

export default Kontragents;
