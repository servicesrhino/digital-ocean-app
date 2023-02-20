import React from 'react';
import { Button, Container, Form, FormGroup, Navbar } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
     <Container className='small-container'>
      <h1 className='my-3'>Логин</h1>
      <Form>
        <FormGroup className='mb-3' controlId='email' >
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control type='email' required />
        </FormGroup>

        <FormGroup className='mb-3' controlId='password' >
          <Form.Label>Пароль</Form.Label>
          <Form.Control type='password' required />
        </FormGroup>
        <div className='mb-3'>
          <Button type='submit' >Логин</Button>
        </div>
      </Form>
      </Container>
    </div>
  )
}

export default Home
