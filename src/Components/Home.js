import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import $api from './http';

const Home = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+380970698133');
  const [password, setPassword] = useState('');

  const [category, setCategory] = useState([]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://rhino-api-alquo.ondigitalocean.app/Users/sendPinCodeViaPhone',
        {
          phone,
          password,
          udid: 'test',
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/parse-excel');
      console.log(data);
    } catch (err) {
      //alert('Invalid email or password')
      toast.error('Invalid email or password');
    }
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://rhino-api-alquo.ondigitalocean.app/Users/authenticate',
        {
          phone,
          password,
          udid: 'test',
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', JSON.stringify(data.jwtToken));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));

      navigate('/parse-excel');
      console.log(data);

      if (data) {
        getCatalog();
      }
    } catch (err) {
      //alert('Invalid email or password')
      toast.error('Invalid email or password');
    }
  };

  const getCatalog = async (e) => {
    //e.preventDefault();
    try {
      const res = await $api
        .post(
          '/Catalog/get-parts-catalog',
          {
            //phone,
            //password,
            //udid: 'test',
            parentId: '',
          }
          //   {
          //     headers: {
          //       Authorization:
          //         'Bearer ' +
          //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0MDFmZWI3NDcxMzIwNDIwNjA2YTU2ZCIsInJvbGUiOiJVc2VyIiwianRpIjoiMjQyYjRhMTUtM2FiMS00NTc4LThhY2EtNzBkZTlhYzBiNjk2IiwiaWQiOiI2NDAxZmViNzQ3MTMyMDQyMDYwNmE1NmQiLCJuYmYiOjE2Nzc5NjMzNTQsImV4cCI6MTY3Nzk2MzY1NCwiaWF0IjoxNjc3OTYzMzU0fQ.L6-XANKSu8nLoEAUQVKHbbyGDH6DKGb_ZZdjh_wyvoI',
          //     },
          //   }
        )
        .then((res) => {
          const parts = res;
          console.log(parts.data);
          setCategory(parts.data);
          ctxDispatch({ type: 'GET_CATALOG', payload: res.data });
        });
      //console.log(category);
      //ctxDispatch({type: 'USER_SIGNIN', payload: data});
      const token = localStorage.getItem('token');
      //navigate('/parse-excel');
      console.log(token);
    } catch (e) {
      // console.log(e);
    }
  };

  //   useEffect(() => {
  //     if (userInfo) {
  //       getCatalog();
  //     }
  //   }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      //getCatalog();
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <Container className="small-container">
        <h1 className="my-3">Логин</h1>
        <Form onSubmit={submitHandler2}>
          <FormGroup className="mb-3" controlId="phone">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
              type="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <div className="mb-3">
            <Button type="submit">Логин</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Home;
