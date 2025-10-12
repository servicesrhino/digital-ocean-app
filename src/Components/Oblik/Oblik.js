// import React, { useContext, useState } from 'react';
// import './Oblik.css';
// import axios from 'axios';
// import { Store } from '../../Store';
// import Sidebar from '../Sidebar/Sidebar';
// import { Col, Row, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function Oblik() {
//   // const {state, dispatch} = useContext(Store)
//   const [data, setData] = useState([]);
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const { jwtToken } = userInfo;
//   const token = jwtToken;
//   // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjYzZjI0YzE3Y2EyZWYxNWMxNjM4ZTJhMyIsInJvbGUiOiJVc2VyIiwianRpIjoiMTA3MWNmOGItMTAyMS00YmZiLTkwZTctYTU4YmJkYzJlYzU0IiwiaWQiOiI2M2YyNGMxN2NhMmVmMTVjMTYzOGUyYTMiLCJuYmYiOjE3NTkxNjM2NjUsImV4cCI6MTc1OTE2Mzk2NSwiaWF0IjoxNzU5MTYzNjY1fQ.S5JePvpav_qm9VrJUDq2FOlFmfAd0SZsD748T0MbXBE`;
//   console.log(jwtToken);
//   const getData = async () => {
//     try {
//       const res = await axios.post(
//         'https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-manager-by-month',
//         { mounth: 8 }, // request body (empty here, add data if needed)
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // 👈 EXACT format
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log(res.data);
//       setData(res.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   console.log(data);

//   const getData2 = async (e, info) => {
//     try {
//       console.log(info);
//       ctxDispatch({ type: 'GET_FOR_OBLIK', payload: info });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="app2">
//       <div className="app__body">
//         <Sidebar />
//         <div className="app__other mx-4">
//           <h1>Облік</h1>
//           <button onClick={getData}>Отримати дані</button>
//           <div className="mt-3 ml-3">
//             <Row>
//               <Col>
//                 <Table hover bordered className="border">
//                   <thead>
//                     <tr>
//                       <th>Менеджер</th>
//                       {/* <th>12333</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((item, index) => (
//                       <tr key={index}>
//                         <td onClick={(e) => getData2(e, item)}>
//                           <Link to="/oblik2">{item}</Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Oblik;

import React, { useContext, useState } from 'react';
import './Oblik.css';
import axios from 'axios';
import { Store } from '../../Store';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Oblik() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date().getMonth() + 1
  ); // 1–12
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state || {};
  const token = userInfo?.jwtToken;

  const monthNames = [
    { value: 1, label: 'Січень' },
    { value: 2, label: 'Лютий' },
    { value: 3, label: 'Березень' },
    { value: 4, label: 'Квітень' },
    { value: 5, label: 'Травень' },
    { value: 6, label: 'Червень' },
    { value: 7, label: 'Липень' },
    { value: 8, label: 'Серпень' },
    { value: 9, label: 'Вересень' },
    { value: 10, label: 'Жовтень' },
    { value: 11, label: 'Листопад' },
    { value: 12, label: 'Грудень' },
  ];

  const getData = async () => {
    if (!token) {
      setErrorMsg('Ви не авторизовані. Будь ласка, увійдіть у систему.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await axios.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-manager-by-month',
        { mounth: Number(selectedMonth) }, // NOTE: API expects "mounth"
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(res.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Try to surface a useful message
      const apiMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Невідома помилка';
      setErrorMsg(`Помилка отримання даних: ${apiMsg}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getData2 = (e, info) => {
    try {
      ctxDispatch({ type: 'GET_FOR_OBLIK', payload: info });
      ctxDispatch({ type: 'GET_MONTH', payload: Number(selectedMonth) });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app2">
      <div className="app__body">
        <Sidebar />
        <div className="app__other mx-4">
          <h1>Облік</h1>

          {/* Controls */}
          <div className="d-flex align-items-end gap-3 mb-3">
            <Form.Group controlId="monthSelect" className="mb-0">
              <Form.Label>Місяць</Form.Label>
              <Form.Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {monthNames.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="mb-0">
              <Form.Label className="invisible d-block">.</Form.Label>
              <Button variant="primary" onClick={getData} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Завантаження…
                  </>
                ) : (
                  'Отримати дані'
                )}
              </Button>
            </div>
          </div>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          {/* Results */}
          <div className="mt-3 ml-3">
            <Row>
              <Col>
                <Table hover bordered className="border">
                  <thead>
                    <tr>
                      <th>Менеджер</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td className="text-muted">
                          {loading
                            ? 'Завантаження…'
                            : 'Дані відсутні. Оберіть місяць і натисніть "Отримати дані".'}
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td onClick={(e) => getData2(e, item)}>
                            <Link to="/oblik2">{String(item)}</Link>
                          </td>
                        </tr>
                      ))
                    )}
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

export default Oblik;
