import React, { useContext, useEffect, useState } from 'react';
import './GetLastDocuments.css';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';

function GetLastDocuments() {
  const [data, setData] = useState([]);
  // const [documentId, setDocumentID] = useState('');
  // const [sheetId, setSheetID] = useState('');
  const documentId = '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0';
  const sheetId = '2020';
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const getData = async () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-last-documents-list'
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  const getDocumentsFromList = async (e, info) => {
    try {
      // const result = axios.post(
      //   'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-documents-fromlist',
      //   {
      //     documentId: documentId,
      //     sheetId: sheetId,
      //   }
      // );
      console.log(info);
      ctxDispatch({ type: 'GET_LAST_DOCUMENTS_FROM_LIST', payload: info });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (info) {
  //     getDocumentsFromList()
  //   }
  // },)

  return (
    <div className="app2">
      <div className="app__body">
        <Sidebar />
        <div className="app__other mx-4">
          <h1>Отримати останні дані по документу</h1>
          <div>
            <button onClick={getData}>Отримати останні дані</button>
          </div>
          <div className="mt-3 ml-3">
            <Row>
              <Col>
                <Table hover bordered className="border">
                  <thead className="text-right ">
                    <tr>
                      <th>created</th>
                      <th>documentId</th>
                      <th>sheetId</th>
                    </tr>
                  </thead>
                  <tbody className="text-primarily table-body ">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td
                          onClick={(e) =>
                            getDocumentsFromList(e, item.documentId)
                          }
                        >
                          <Link to="/get-last-documents-fromList">
                            {item.created}
                          </Link>
                        </td>

                        <td>{item.documentId}</td>
                        <td>{item.sheetId}</td>
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

export default GetLastDocuments;
