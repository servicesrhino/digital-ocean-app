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
import GetDocuments from './Components/GetDocuments/GetDocuments';

import GetDocumentsPrint from './Components/GetDocumentsPrint/GetDocumentsPrint';
import GetRouteSheet from './Components/RouteSheet/GetRouteSheet/GetRouteSheet';
import AddRouteSheet from './Components/RouteSheet/AddRouteSheet/AddRouteSheet';
import GetRouteSheetData from './Components/RouteSheet/GetRouteSheet/data/GetRouteSheetData';
import AddDocuments from './Components/AddDocuments/AddDocuments';
import Header from './Components/Header/Header';
import GetLastRouteSheet from './Components/RouteSheet/GetLastRouteSheet/GetLastRouteSheet';
import GetLastDocuments from './Components/GetLastDocuments/GetLastDocuments';
import GetDocumentsFromList from './Components/GetDocumentsFromList/GetDocumentsFromList';
import Reports from './Components/Reports/Reports';
import GetReports from './Components/GetReports/GetReports';

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

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     checkAuth();
  //   }
  // }, []);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    navigate('/');
  };

  // setTimeout(function () {
  //   localStorage.removeItem('userInfo');
  // }, 480 * 1000);

  return (
    <div className="app">
      <ToastContainer position="bottom-center" limit={1} />
      {/* <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Rhino</Navbar.Brand>
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
      </header> */}
      <Header />
      <main className="app__body">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/parse-excel" element={<ParseExcel />} /> */}
            <Route path="/barcode" element={<BarcodeGen />} />
            <Route path="/allparts" element={<AllParts />} />
            {/* <Route path="/get-documents" element={<GetDocuments />} /> */}
            <Route path="/add-documents" element={<AddDocuments />} />
            <Route path="get-documents/:id" element={<GetDocumentsPrint />} />
            <Route path="/get-route-sheet" element={<GetRouteSheet />} />
            <Route path="/add-route-sheet" element={<AddRouteSheet />} />
            <Route
              path="get-route-sheet-data"
              element={<GetRouteSheetData />}
            />
            <Route
              path="get-last-route-sheet"
              element={<GetLastRouteSheet />}
            />
            <Route path="/get-last-documents" element={<GetLastDocuments />} />
            <Route
              path="/get-last-documents-fromList"
              element={<GetDocumentsFromList />}
            />
            <Route path="reports" element={<Reports />} />
            <Route path="get-reports" element={<GetReports />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
