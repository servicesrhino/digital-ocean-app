import React, { useContext, useState } from 'react';
import './TableBootstrap.css';
import { Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import { usePrintableTable } from '../../hooks/usePrintableTable';

function TableBootstrap(props) {
  const [data, setData] = useState([]);

  const tes2 =
    'https://docs.google.com/spreadsheets/d/1_j-WNAwx21E6XFeE2gs62eH5P2YdYASQmouMaR7dvmM';

  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);

  const { userInfo } = state;

  const { handleChecked, barcodeNew, newPrintFunc2, togle } =
    usePrintableTable({
      data,
      setData,
      printerUrl: userInfo.printerUrl,
      documentId: tes2,
    });

  return (
    <div>
      <Row>
        <Col>
          <Table bordered className="border">
            <thead className="text-black table-header">
              <tr>
                <th>printed</th>
                <th>машина</th>
                <th>назва </th>
                <th>rhinoID</th>
                <th>stock price</th>
                <th>income price</th>
                <th>price with depreciation</th>
                <th>кількість</th>
                <th>id</th>
                <th>дефекти</th>
                <th>баркод</th>

                {/* <th>оригінальний id</th> */}
                {/* <th>доставка</th> */}
              </tr>
            </thead>
            <tbody className="text-primarily table-body">
              {props.data.map((item, index) => (
                // <div className={`post card ${styled ? 'styled' : ''}`}>

                <tr className={`${item.togle ? 'styled' : ''}`} key={index}>
                  <th
                    className="checkbox-style"
                    style={{
                      // display: 'flex',
                      // //flexDirection: 'column',
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      backgroundColor: item.printed
                        ? 'gray checkbox-style'
                        : 'text-secondary checkbox-style ',
                    }}
                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary d-flex justify-content-center text-center my-auto',
                    // }}
                  >
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={item.printed || false}
                      onChange={handleChecked}
                    />
                    {/* <Checkbox
                              label=""
                              //checked={true}
                              name={item.id}
                              checked={item.printed || false}
                              onChange={handleChecked}
                            /> */}
                  </th>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}
                    style={{
                      backgroundColor:
                        item.printed && item.togle ? 'gray' : 'text-secondary',
                    }}
                  >
                    {item.vehicle}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}

                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}

                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.rhinoID}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}

                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.stockPrice}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}

                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.incomePrice}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}
                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.priceWithDepreciation}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}
                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.barCodePrintQnt}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}
                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.id}
                  </td>
                  <td
                    className={`${item.printed ? 'styled' : ''}`}

                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item.defect}
                  </td>
                  {/* <div> */}
                  <td
                    className={`${item.printed ? 'styled' : ''}`}
                    // style={{
                    //   backgroundColor: item.printed
                    //     ? 'gray'
                    //     : 'text-secondary',
                    // }}
                  >
                    {item ? (
                      // Чтобы страница открывалась в новой вкладке в <Link> нужно установить опцию target="_blank"
                      // target="_blank"

                      <button
                        name={item.id}
                        checked={item.printed || false}
                        onChange={handleChecked}
                        onClick={(e) => {
                          barcodeNew(e, item);
                          newPrintFunc2(e, item);
                          togle(e, item);
                          //handleClick();
                        }}
                        // className="btn btn-danger"
                        // style={{
                        //   backgroundColor:
                        //     item.printed && styled
                        //       ? 'styled'
                        //       : 'btn btn-danger',
                        // }}
                        className={`btn btn-danger${
                          item.printed ? 'styled' : 'btn btn-danger'
                        }`}
                      >
                        Barcode
                      </button>
                    ) : (
                      // <Link to="/barcode">
                      <button
                        onClick={(e) => barcodeNew(e, item)}
                        className="btn btn-danger"
                      >
                        Barcode
                      </button>
                      // </Link>
                    )}
                  </td>
                  {/* </div> */}
                  {/* <td>
                          <button onClick={OnToggleMeHandler2}>delete</button>
                        </td> */}
                  {/* <td>{item.stock}</td> */}
                  {/* <td>{item.originaID}</td> */}
                  {/* <td>{item.deliveryInfo}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default TableBootstrap;
