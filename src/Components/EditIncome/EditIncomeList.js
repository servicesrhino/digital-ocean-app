import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Store } from '../../Store';
import $api from '../http';

function EditIncomeList() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);
  const { dispatch: ctxDispatch } = useContext(Store);

  const getData = async () => {
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
      toast.error('Не вдалося отримати список приходів');
    } finally {
      setDone(true);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDocument = (e, documentId) => {
    ctxDispatch({ type: 'GET_LAST_DOCUMENTS_FROM_LIST', payload: documentId });
  };

  if (!done) {
    return (
      <ReactLoading
        className="flex justify-content-center align-items-center"
        type="bars"
        color="green"
        height={200}
        width={200}
      />
    );
  }

  return (
    <div className="app2">
      <div className="app__body">
        <Sidebar />
        <div className="app__other mx-4">
          <h1>Редагувати приходи</h1>
          <div className="mt-3 ml-3">
            <Row>
              <Col>
                <Table hover bordered className="border">
                  <thead className="text-right">
                    <tr>
                      <th>created</th>
                      <th>Назва документу</th>
                    </tr>
                  </thead>
                  <tbody className="text-primarily table-body">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.created}</td>
                        <td onClick={(e) => selectDocument(e, item.documentId)}>
                          <Link to="/edit-income-items">
                            {item.documentName}
                          </Link>
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

export default EditIncomeList;
