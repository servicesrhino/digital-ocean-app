import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import ParseExcel from './Components/ParseExcel';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect } from 'react';
import { Store } from './Store';
import BarcodeGen from './Components/BarcodeGen';
import AllParts from './Components/AllParts';
import axios from 'axios';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    //const newToken = token.replace(/['"«»]/g, '');

    const token2 = localStorage.getItem('refreshToken');
    //const newToken2 = token2.replace(/['"«»]/g, '');
    try {
      const response = await axios
        .post(
          `https://rhino-api-alquo.ondigitalocean.app/Users/refresh-token`,
          {
            token: token,
            //password,
            refreshToken: token2,
            udid: 'test67',
            //parentId: '',
          }
        )
        .then((res) => {
          const response = res.data;
          localStorage.setItem('token', response.jwtToken);
          ctxDispatch({ type: 'IS_AUTH' });
          console.log(isAuth);

          console.log(response);
        });
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    navigate('/');
  };

  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Rhino parse excel</Navbar.Brand>
            </LinkContainer>

            {userInfo ? (
              <div className="phone-header">{userInfo.phone}</div>
            ) : (
              <div className="phone-header">Пожалуйста, авторизуйтесь</div>
            )}

            {userInfo ? (
              <button onClick={signoutHandler} bg="dark">
                Sign out
              </button>
            ) : (
              <button disabled onClick={signoutHandler} bg="dark">
                Sign out
              </button>
            )}
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parse-excel" element={<ParseExcel />} />
            <Route path="/barcode" element={<BarcodeGen />} />
            <Route path="/allparts" element={<AllParts />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
