import { useContext, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Button } from 'react-bootstrap';
import $api from '../http';

function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      toast.error('Не вдалося отримати звіти');
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

  return (
    <div className="app4">
      <div className="app__body4">
        <Sidebar />
        <div className="app__other mx-4">
          <h1>Отримати звіти</h1>
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
