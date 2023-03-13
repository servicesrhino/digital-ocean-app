import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import ParseExcel from './Components/ParseExcel';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import BarcodeGen from './Components/BarcodeGen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

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
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
