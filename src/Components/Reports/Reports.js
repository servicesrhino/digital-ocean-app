import axios from 'axios';
import { useContext, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
// import { Button } from 'bootstrap';
import { Button } from 'react-bootstrap';

function Reports() {
  const [data, setData] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const getData = async () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-dyq7j.ondigitalocean.app/GoogleSheet/get-last-documents-list'
        )
        .then((res) => {
          console.log(res.data);
          const newData = res.data.map((row) => {
            return {
              ...row,
              created: row.created.slice(0, row.created.indexOf('T')),
            };
          });
          setData(newData);
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

  return (
    <div className="app2">
      <div className="app__body">
        <Sidebar />
        <div className="app__other mx-4">
          <h1>Отримати звіти</h1>
          <div>
            <Button onClick={getData}>Отримати останні дані</Button>
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
                        {/* <td
                          onClick={(e) =>
                            getDocumentsFromList(e, item.documentId)
                          }
                        >
                          <Link to="/get-reports">{item.created}</Link>
                        </td> */}

                        <td
                        // onClick={(e) =>
                        //   getDocumentsFromList(e, item.documentId)
                        // }
                        >
                          {item.created}
                          {/* <Link to="/get-last-documents-fromList">
                            
                          </Link> */}
                        </td>

                        {/* <td>{item.created}</td> */}

                        {/* <td>{item.documentId}</td> */}
                        {/* <td>{item.sheetId}</td> */}
                        <td
                          onClick={(e) =>
                            getDocumentsFromList(e, item.documentId)
                          }
                        >
                          <Link to="/get-reports">{item.documentName}</Link>
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

export default Reports;
