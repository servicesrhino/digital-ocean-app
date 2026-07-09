import React, { useContext, useEffect, useState } from 'react';
import './GetLastDocuments.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Store } from '../../Store';
import $api from '../http';

function GetLastDocuments() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [documentId, setDocumentID] = useState('');
  // const [sheetId, setSheetID] = useState('');
  const documentId = '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0';
  const sheetId = '2020';
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const getData = async () => {
    setLoading(true);
    try {
      const { data: rows } = await $api.post(
        '/GoogleSheet/get-last-documents-list'
      );
      setData(
        rows.map((row) => ({
          ...row,
          created: row.created.slice(0, row.created.indexOf('T')),
        }))
      );
    } catch (error) {
      toast.error('Не вдалося отримати останні документи');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentsFromList = async (e, info) => {
    try {
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
            <Button onClick={getData} disabled={loading}>
              Отримати останні дані
            </Button>
            {loading && (
              <ReactLoading
                className="d-inline-block ms-2"
                type="spin"
                color="green"
                height={24}
                width={24}
              />
            )}
          </div>
          <div className="mt-3 ml-3">
            <Row>
              <Col>
                <Table hover bordered className="border">
                  <thead className="text-right ">
                    <tr>
                      <th>created</th>
                      {/* <th>documentId</th> */}
                      {/* <th>sheetId</th> */}
                      <th>Назва документу</th>
                    </tr>
                  </thead>
                  <tbody className="text-primarily table-body ">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td
                        // onClick={(e) =>
                        //   getDocumentsFromList(e, item.documentId)
                        // }
                        >
                          {item.created}
                          {/* <Link to="/get-last-documents-fromList">
                            
                          </Link> */}
                        </td>

                        {/* <td>{item.documentId}</td> */}
                        {/* <td>{item.sheetId}</td> */}
                        <td
                          onClick={(e) =>
                            getDocumentsFromList(e, item.documentId)
                          }
                        >
                          <Link to="/get-last-documents-fromList">
                            {item.documentName}
                          </Link>
                          {/* {item.documentName} */}
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

export default GetLastDocuments;
