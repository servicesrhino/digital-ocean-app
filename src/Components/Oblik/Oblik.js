import React, { useContext, useState } from 'react';
import './Oblik.css';
import axios from 'axios';
import { Store } from '../../Store';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Oblik() {
  // const {state, dispatch} = useContext(Store)
  const [data, setData] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { jwtToken } = userInfo;
  const token = jwtToken;
  // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjYzZjI0YzE3Y2EyZWYxNWMxNjM4ZTJhMyIsInJvbGUiOiJVc2VyIiwianRpIjoiMTA3MWNmOGItMTAyMS00YmZiLTkwZTctYTU4YmJkYzJlYzU0IiwiaWQiOiI2M2YyNGMxN2NhMmVmMTVjMTYzOGUyYTMiLCJuYmYiOjE3NTkxNjM2NjUsImV4cCI6MTc1OTE2Mzk2NSwiaWF0IjoxNzU5MTYzNjY1fQ.S5JePvpav_qm9VrJUDq2FOlFmfAd0SZsD748T0MbXBE`;
  console.log(jwtToken);
  const getData = async () => {
    try {
      const res = await axios.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-manager-by-month',
        { mounth: 8 }, // request body (empty here, add data if needed)
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 EXACT format
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data);

  const getData2 = async (e, info) => {
    try {
      console.log(info);
      ctxDispatch({ type: 'GET_FOR_OBLIK', payload: info });
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
          <button onClick={getData}>Отримати дані</button>
          <div className="mt-3 ml-3">
            <Row>
              <Col>
                <Table hover bordered className="border">
                  <thead>
                    <tr>
                      <th>Менеджер</th>
                      {/* <th>12333</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td onClick={(e) => getData2(e, item)}>
                          <Link to="/oblik2">{item}</Link>
                        </td>
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

export default Oblik;
