import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import BarcodeGen from './Components/BarcodeGen';
import AllParts from './Components/AllParts';
import $api, { cleanToken } from './Components/http';
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
import Inventorization from './Inventorization/Inventorization';
import InventorizationDetails from './Inventorization/InventorizationDetails';
import Modal from './Components/Modal/Modal';
import Oblik from './Components/Oblik/Oblik';
import Kontragents from './Components/Kontragents/Kontragents';
import Oblik2 from './Components/Oblik2/Oblik2';
import EditIncomeList from './Components/EditIncome/EditIncomeList';
import EditIncomeItems from './Components/EditIncome/EditIncomeItems';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  const [modalActive, setModalActive] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await $api.post('/Users/refresh-token', {
        token: cleanToken(localStorage.getItem('token')),
        refreshToken: cleanToken(localStorage.getItem('refreshToken')),
        udid: 'test67',
      });
      localStorage.setItem('token', data.jwtToken);
      ctxDispatch({ type: 'IS_AUTH' });
    } catch (e) {
      // refresh failed — leave the user as-is, the next authenticated request will 401 normally
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Route path="inventorization" element={<Inventorization />} />
            <Route
              path="inventorization-details"
              element={<InventorizationDetails />}
            />
            <Route path="oblik" element={<Oblik />} />
            <Route path="kontragents" element={<Kontragents />} />
            <Route path="oblik2" element={<Oblik2 />} />
            <Route path="/edit-income" element={<EditIncomeList />} />
            <Route path="/edit-income-items" element={<EditIncomeItems />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
