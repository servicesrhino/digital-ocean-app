import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import Sidebar from '../../Sidebar/Sidebar';
import Getmodal from './Getmodal';
import './GetRouteSheet.css';

function GetRouteSheet() {
  const navigate = useNavigate();

  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const [data, setData] = useState([]);
  const [routeListItems, setRouteListItems] = useState([]);
  // const [managerName, setManagerName] = useState([]);
  const [final, setFinal] = useState([]);
  const [final2, setFinal2] = useState([]);
  const [final4, setFinal4] = useState([]);
  const [final8, setFinal8] = useState([]);

  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-route-list',
          {
            // documentId: 'BKOkLeHb-zF99JnZE8PtpTOa2UukgqpxjV6ske740qc',
            // sheetId: 'Sheet1',
            documentId: documentID,
            sheetId: sheetID,
          }
        )
        .then((res) => {
          const response = res.data;
          setData(res.data);
          // navigate('/get-route-sheet-data');
          console.log(res.data);
          console.log(res.data.id);
          console.log(res.data.routeListItems);
          //console.log(res.data.routeListItems.routeItems);

          // setRouteListItems(res.data.routeListItems);
          setFinal(
            Object.values(res.data.routeListItems).map(
              (item) => item.managerName
            )
          );
          setFinal2(
            Object.values(res.data.routeListItems).map(
              (item) => item.routeItems
            )
            //.flat()
          );
          setFinal4(
            Object.values(res.data.routeListItems).map((item) => ({
              length: item.routeItems.length,
              manager: item.managerName,
            }))
          );
        });
      dataShow(final2);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const getData = () => {
  //     try {
  //       const res = $api
  //         .post(
  //           'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-route-list',
  //           {
  //             documentId: '1BKOkLeHb-zF99JnZE8PtpTOa2UukgqpxjV6ske740qc',
  //             sheetId: 'Sheet1',
  //           }
  //         )
  //         .then((res) => {
  //           const response = res.data;
  //           console.log(res.data);
  //           //setAllData(response);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    // 👇️ some condition here
    // if (lastItems2) {
    //   setFinal8(lastItems2);
    // }
    dataShow(final2);
  }, [final2]);

  console.log(data.id);
  // const [routeListItems] = data;
  // console.log(routeListItems);
  // console.log(Object.entries(routeListItems));
  // console.log(routeListItems[0]);

  // const first = routeListItems;
  // console.log(first);
  // Object.values(first).map((item) => console.log(item.managerName));

  // console.log(routeListItems);
  // Object.values(first).map((item) => console.log(item.routeItems));

  console.log(final);
  console.log(final2);
  console.log(final4);

  let testarr = [];
  console.log(
    final2.map((item) => {
      testarr.push(item.length);
      return testarr;
    })
  );
  console.log(testarr);

  // console.log(
  //   final.map((item) => {
  //     testarr.push(item);
  //     return testarr;
  //   })
  // );
  // console.log(testarr);

  let final3 = [];
  let temp2 = [];
  let temp3 = [];

  // for (let i = 0; i < final2.length; i++) {
  //   for (let j = 0; j < testarr.length; j++) {
  //     console.log(final2[i]);
  //     console.log(testarr[j]);
  //     if (final2[i].length === testarr[j]) {
  //       let temp = final2.map((item) => item);
  //       console.log(temp);
  //       final3.push(testarr[j], ...final2[i]);
  //     }
  //   }
  //   // console.log(final2[i]);
  //   // final3.push(final2[i])
  // }

  for (let i = 0; i < final2.length; i++) {
    for (let j = 0; j < final4.length; j++) {
      console.log(final2[i]);
      console.log(final4[j].length);
      if (final2[i].length === final4[j].length) {
        let temp = final2.map((item) => item);
        console.log(temp);
        final3.push({ ...final2[i], endPoint: final4[j].manager });
      }
    }
  }

  // for (let i = 0; i < final2.length; i++) {
  //   for (let j = 0; j < final4.length; j++) {
  //     console.log(final2[i]);
  //     console.log(final4[j].length);
  //     if (final2[i].length === final4[j].length) {
  //       let temp = final2.map((item) => item);
  //       console.log(temp);
  //       final3.push({
  //         ...final2[i].map(
  //           (item) => (item = [{ endPoint: final4[j], ...final2[i] }])
  //         ),
  //       });
  //       temp2 = final2.map(
  //         (item) => (item = [{ endPoint: final4[j].manager, ...final2[i] }])
  //       );
  //       console.log(temp2);

  //       temp3 = final2.map((item) => [
  //         { endPoint: final4[j].manager, ...final2[i] },
  //       ]);
  //       console.log(temp2);
  //     }
  //   }

  // }

  console.log(Object.entries(final3));
  console.log(temp2);
  console.log(temp3);

  let final7 = final2.flat();
  console.log(Object.values(final7));

  var outputData = final7.map(Object.values);
  console.log(outputData);

  let lastItems = final3.map((item) => ({
    // rhinoID: item[2],
    // stelaj: item[3],
    // name: item[4],
    // Pl: item[5],
    // originalIDs: item[6],
    // incomePrice: item[8],
    // stockPrice: 0,
    // priceWithDepreciation: 0,
    // quantity: item[7],
    // deliveryInfo: 'some',
    endPoint: item.endPoint,
    partName: item.partName,
    vehicle: Array.isArray(item[0])
      ? item.map((item) => item[item.length - 1]).find((item) => item[0])
      : item[0],
    // vehicle: Array.isArray(item[0])
    //   ? item.findLast((element) => element[element.length] > 8)
    //   : item[0],
  }));
  console.log(lastItems);

  const data1 = [
    ['BMW', 'b1', 111, 112],
    ['b2', 113, 114],
    ['b3', 113, 114],
    ['Tesla', 'b4', 113, 114],
    ['b5', 113, 114],
    ['b6', 113, 114],
    ['Ford', 'b7', 113, 114],
    ['b8', 113, 114],
    ['b9', 113, 114],
  ];

  function dataShow(final2) {
    let final7 = final2.flat();
    var outputData = final7.map(Object.values);

    const finalData = [];

    for (let i = 0; i < outputData.length; i++) {
      switch (i) {
        case 0:
          finalData.push(['Вадимтел: 067-487-10030', ...outputData[i]]);
          break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          finalData.push(['Евгений тел: 098-755-58890', ...outputData[i]]);
          break;
        // case 16:
        // case 17:
        //   finalData.push(['Tesla', ...outputData[i]]);
        //   break;
        // case 18:
        // case 19:
        //   finalData.push(['Ford', ...outputData[i]]);
        //   break;
        default:
          finalData.push(['Макстел: 067-323-02450', ...outputData[i]]);
          break;
      }
    }

    console.table('This is final DATA', finalData);

    let lastItems2 = finalData.map((item) => ({
      manager: item[0],
      vehicleName: item[1],
      partName: item[2],
      originalId: item[3],
      qnt: item[4],
      startPoint: item[5],
      endPoint: item[6],
      originalPrice: item[7],
      comments: item[8],
    }));

    console.log(lastItems2);

    if (lastItems2) {
      setFinal8(lastItems2);
    }
  }

  const finalData = [];
  let names = ['vadim', 'eugen', 'max'];

  for (let i = 0; i < outputData.length; i++) {
    for (let j = 0; j < names.length; j++) {
      switch (i) {
        case 0:
          finalData.push([names[0], ...outputData[i]]);
          break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          finalData.push(['Евгений тел: 098-755-58890', ...outputData[i]]);
          break;
        // case 16:
        // case 17:
        //   finalData.push(['Tesla', ...outputData[i]]);
        //   break;
        // case 18:
        // case 19:
        //   finalData.push(['Ford', ...outputData[i]]);
        //   break;
        default:
          finalData.push(['Макстел: 067-323-02450', ...outputData[i]]);
          break;
      }
    }
  }

  console.table('This is final DATA', finalData);

  let lastItems2 = finalData.map((item) => ({
    manager: item[0],
    vehicleName: item[1],
    partName: item[2],
    originalId: item[3],
    qnt: item[4],
    startPoint: item[5],
    endPoint: item[6],
    originalPrice: item[7],
    comments: item[8],
  }));

  console.log(lastItems2);

  // if (lastItems2) {
  //   setFinal8(lastItems2)
  // }

  // useEffect(() => {
  //   // 👇️ some condition here
  //   if (lastItems2) {
  //     setFinal8(lastItems2);
  //   }
  // }, []);
  //setFinal8(lastItems2);

  // routeListItems.map((item) => {
  //   console.log(item.managerName);
  //   setManagerName(item.managerName);
  // });

  // console.log(managerName);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="form">
            <Container className="small-container">
              <h2 className="my-1">Отримати дані по маршрутному листу</h2>
              <Form onSubmit={getData}>
                <FormGroup className="mb-1" controlId="documentID">
                  <Form.Label>urlID</Form.Label>
                  <Form.Control
                    // type="phone"
                    required
                    onChange={(e) => setDocumentID(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-2" controlId="sheetID">
                  <Form.Label>SheetID</Form.Label>
                  <Form.Control
                    // type="password"
                    onChange={(e) => setSheetID(e.target.value)}
                  />
                </FormGroup>
                <div className="mb-2">
                  <Button type="submit">Відправити</Button>
                </div>
              </Form>
            </Container>
          </div>

          {/* <Getmodal /> */}
          {/* <form className="form">
        <input
          type="text"
          placeholde  r="documentID"
          className="input"
          value={documentID}
        />
        <input type="text" placeholder="sheetID" />
        <button onClick={getData} className="button">
          Отправить
        </button>
      </form> */}

          <Row>
            <Col>
              <Table>
                <thead className="text-small">
                  {/* <tc> */}
                  <tr>
                    <th>id</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody className=" text-small">
                  {/* {data.map((item, index) => {
                <tr>
                  <td>{item.id}</td>
                </tr>;
              })} */}
                  <tr>
                    <td className="text-small">{data.id}</td>
                    {/* {final.map((item) => (
                  <div>{item}</div>
                ))} */}

                    {/* <td>{data.updateTimeDate}</td>
                <td>{data.documentId}</td> */}

                    {/* {data.id} */}

                    <td className="text-small">{data.date}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* { final2.map((item) => (
        <div> {item.vehicleName}</div>
      ))} */}

          {/* {final[0]} */}
          <Row>
            <Col>
              <Table hover className="border">
                <thead className="text-small">
                  {/* <tr>
                    <th>Name</th>
                    <th>vehicleName</th>
                    <th>endPoint</th>
                    <th>startPoint</th>
                    <th>comments</th>
                    <th>originalId</th>
                    <th>originalPrice</th>
                    <th>partName</th>
                    <th>qnt</th>
                  </tr> */}
                </thead>
                <tbody className="text-small table-body">
                  {routeListItems?.map((item) => (
                    <tr>
                      <tr
                        style={{ fontSize: 14, margin: '10px' }}
                        className="table-header  text-lg align-center"
                      >
                        {item.managerName}
                      </tr>

                      {/* <td>{item.managerName}</td> */}
                      {/* <tr> */}
                      {/* <td> */}
                      {item.routeItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.vehicleName ? item.vehicleName : ''}</td>

                          <td>{item.endPoint ? item.endPoint : ''}</td>
                          <td>{item.startPoint ? item.startPoint : '  '}</td>
                          <td>{item.comments ? item.comments : ''}</td>
                          <td>{item.originalId ? item.originalId : ''}</td>
                          <td>
                            {item.originalPrice ? item.originalPrice : ''}
                          </td>
                          <td>{item.partName ? item.partName : ''}</td>
                          <td>{item.qnt ? item.qnt : ''}</td>
                        </tr>
                      ))}
                      {/* </td> */}
                      {/* <td>
                        {item.routeItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.endPoint ? item.endPoint : 'n/a'}</td>
                          </tr>
                        ))}
                      </td> */}
                      {/* </tr> */}
                    </tr>
                  ))}
                  {/* {final2.map(({ vehicleName }) => (
                <tr>
                  <td>{vehicleName}</td>
                </tr>
              ))} */}
                  {/* {Object.values(final2).map((item) => <td>{item}</td>))} */}
                  {/* {Object.keys(final2).map((item) => (
                <tr>
                  <td>{item}</td>
                </tr>
              ))} */}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Table hover bordered className="border">
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
                    {/* <th>№</th> */}

                    <th>Менеджер</th>

                    <th>Наименование</th>
                    <th>Авто</th>

                    <th>Количество</th>
                    {/* <th>НомерRhino</th> */}
                    <th>Оригинальный номер</th>
                    <th>Оригинальная цена</th>
                    <th>Начальная точка</th>
                    <th>Конечная точка</th>

                    <th>Комментарии</th>
                    {/* <th>цена с амортизацией</th> */}
                    {/* <th>дата завоза</th> */}

                    {/* {sheet.map(h => <td>{h}</td>)} */}
                  </tr>
                </thead>
                <tbody className="text-secondary table-body">
                  {final8.map((getdata, index) => (
                    <tr key={index}>
                      {/* <th>{getdata.id}</th> */}
                      {/* <th>{getdata.map((item) => item.vehicleName)}</th> */}

                      {/* <th>{index === 0 ? final[0] : index}</th> */}

                      {/* <th>{index === 0 ? index + 1 : index + 1}</th> */}

                      {/* <th>
                        {routeListItems.map((item, i) => {
                          if (item.routeItems.length > 15) {
                            let value = item.routeItems.length;
                            return value;
                          }
                        })}
                      </th> */}

                      {/* <th>
                        {Object.values(
                          routeListItems.map((item, i) => item.managerName)
                        )}
                      </th> */}
                      <th>{getdata.manager}</th>
                      <th>{getdata.partName}</th>
                      <th>{getdata.vehicleName}</th>
                      <th className="align-center">{getdata.qnt}</th>
                      <th>{getdata.originalId}</th>
                      <th>{getdata.originalPrice}</th>
                      <th>{getdata.startPoint}</th>
                      <th>{getdata.endPoint}</th>
                      <th>{getdata.comments}</th>

                      {/* <th>{getdata[0].qnt}</th>
                      <th>{getdata[0].startPoint}</th>
                      <th>{getdata[0].comments}</th>
                      <th>{getdata[0].originalId}</th>
                      <th>{getdata[0].originalPrice}</th>
                      <th>{getdata[0].partName}</th> */}
                      {/* <th>{getdata.deliveryInfo}</th> */}
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

export default GetRouteSheet;
