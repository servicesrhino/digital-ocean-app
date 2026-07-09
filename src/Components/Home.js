import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import $api, { cleanToken } from './http';
import './Home.css';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+380970698133');
  const [password, setPassword] = useState('');

  const [category, setCategory] = useState([]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Users/authenticate',
        {
          phone,
          password,
          udid: 'test67',
        }
      );
      const token = data.jwtToken;
      console.log(token);
      ctxDispatch({ type: 'IS_AUTH' });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      ctxDispatch({ type: 'JWT', payload: data.jwtToken });
      ctxDispatch({ type: 'REFRESH_TOKEN', payload: data.refreshToken });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.jwtToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('time', data.serverTime);

      navigate('/reports');
      console.log(data);

      if (data) {
        getCatalog();
        // checkAuth();
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
      checkAuth();
    }
  };

  const checkAuth = async () => {
    const newToken = cleanToken(localStorage.getItem('token'));
    const newToken2 = cleanToken(localStorage.getItem('refreshToken'));
    const response2 = await $api
      .post(`/Users/refresh-token`, {
        token: newToken,
        //password,
        refreshToken: newToken2,
        udid: 'test',
        //parentId: '',
      })
      .then((res) => {
        const response = res.data;
        localStorage.setItem('token', response.jwtToken);
        ctxDispatch({ type: 'IS_AUTH' });

        console.log(response);
      });
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
    <div className="apps">
      <div className="app__body">
        {/* <Sidebar /> */}
        <div className="app__other">
          <div className="small-container">
            <h1 className=" my-3 test1">Логин</h1>

            <Form onSubmit={submitHandler2} className="test1">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter email"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Логин
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
