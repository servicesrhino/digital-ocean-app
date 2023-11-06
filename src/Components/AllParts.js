import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import $api from './http';
import Sidebar from './Sidebar/Sidebar';
// import { Button } from '@mui/material';

function AllParts() {
  const [allData, setAllData] = useState([]);
  const getParts = () => {
    try {
      const res = $api
        .get('https://rhino-api-alquo.ondigitalocean.app/Parts/all')
        .then((res) => {
          const response = res.data;
          setAllData(response);

          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getParts = () => {
      try {
        const res = $api
          .get('https://rhino-api-alquo.ondigitalocean.app/Parts/all')
          .then((res) => {
            const response = res.data;
            console.log(res.data);
            setAllData(response);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getParts();
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="my-3 mx-2">
            <Button onClick={getParts}>Get parts</Button>
          </div>

          <Row>
            <Col md={12}>
              <Table bordered className="border">
                <thead className="text-primary table-header">
                  <tr>
                    {/* <th>
                  <input
                    type="checkbox"
                    name="allselect"
                    placeholder="some"
                    //checked={!sheetData2.some((row) => row.defect !== true)}
                    //onChange={handleChange}
                  />
                </th> */}

                    <th>Авто</th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>НомерRhino</th>
                    <th>оригинальный номер</th>
                    <th>цена со склада</th>
                    <th>цена входящая</th>
                    <th>цена с амортизацией</th>
                    <th>дата завоза</th>

                    {/* {sheet.map(h => <td>{h}</td>)} */}
                  </tr>
                </thead>
                <tbody className="text-secondary table-body">
                  {allData.map((getdata, index) => (
                    <tr key={index}>
                      {/* <th>{getdata.id}</th> */}
                      <th>{getdata.vehicleItem.name}</th>
                      <th>{getdata.name}</th>
                      <th>{getdata.quantity}</th>
                      <th>{getdata.rhinoID}</th>
                      <th>{getdata.originalID}</th>
                      <th>{getdata.incomePrice}</th>
                      <th>{getdata.stockPrice}</th>
                      <th>{getdata.priceWithDepreciation}</th>
                      <th>{getdata.deliveryInfo}</th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AllParts;
