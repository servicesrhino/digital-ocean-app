import React, { useEffect, useState } from 'react';
import $api from '../../http';
import './GetLastRouteSheet.css';
import axios from 'axios';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';

function GetLastRouteSheet() {
  const [data, setData] = useState([]);
  const [final, setFinal] = useState([]);
  const [final2, setFinal2] = useState([]);
  const [final1, setFinal1] = useState([]);
  const [final4, setFinal4] = useState([]);
  const [final8, setFinal8] = useState([]);
  const [final9, setFinal9] = useState([]);
  const [final6, setFinal6] = useState([]);
  const [documentName, setDocumentName] = useState([]);
  const [targetDocName, setTargetDocName] = useState('');

  const getData = async (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-last-route-lists',
          {
            // documentId: 'BKOkLeHb-zF99JnZE8PtpTOa2UukgqpxjV6ske740qc',
            // sheetId: 'Sheet1',
            //documentId: documentID,
            // sheetId: sheetID,
          },
          {
            headers: {
              Accept: '/',
            },
          }
        )
        .then((res) => {
          const response = res.data;
          setData(res.data);
          // navigate('/get-route-sheet-data');
          console.log(res.data);

          console.log(res.data.id);
          console.log(res.data.map((item) => item.id));

          console.log(
            Object.values(res.data.map((item) => item.routeListItems))
          );
          console.log(res.data.map((item) => item.routeListItems));
          console.log(
            res.data.map((item) =>
              item.routeListItems.map((item) => item.managerName)
            )
          );

          console.log(res.data.map((item) => item.documentName)); // маршрутные листы здесь

          console.log(
            res.data.map((item) =>
              item.routeListItems.map((item) => item.routeItems)
            )
          );
          //console.log(res.data.routeListItems.routeItems);
          console.log(
            Object.values(res.data).map((item) => item.routeListItems)
          );

          //   setFinal(
          //     Object.values(res.data.routeListItems).map(
          //       (item) => item.managerName
          //     )
          //   );
          setDocumentName(res.data.map((item) => item.documentName));
          setFinal1(
            res.data.map((item) =>
              item.routeListItems
                .map((item) => ({
                  manager: item.managerName,
                  length: item.routeItems.length,
                  other: [item.managerName, ...item.routeItems],
                }))
                .flat()
            )
          );
          setFinal(
            res.data.map((item) =>
              item.routeListItems.map((item) => ({
                naman: item.managerName,
                other: { ...item.routeItems, adf: [item.managerName] },
                other2: {
                  manager: item.managerName,
                  partName: item.routeItems.map((item) => item.partName),
                  endPoint: item.endPoint,
                },
              }))
            )
          );

          //   setFinal2(
          //     Object.values(res.data.routeListItems).map(
          //       (item) => item.routeItems
          //     )
          //     //.flat()
          //   );

          setFinal2(
            res.data
              .map((item) => item.routeListItems.map((item) => item.routeItems))
              .flat(2)
          );

          //   setFinal4(
          //     Object.values(res.data.routeListItems).map((item) => ({
          //       length: item.routeItems.length,
          //       manager: item.managerName,
          //     }))
          //   );
          setFinal4(
            res.data.map((item) =>
              item.routeListItems.map((item) => ({
                length: item.routeItems.length,
                manager: item.managerName,
                partName: item.routeItems.map((item) => item.partName),
                vehicleName: item.routeItems.map((item) => item.vehicleName),
                endPoint: item.routeItems.map((item) => item.endPoint),
                startPoint: item.routeItems.map((item) => item.startPoint),
                originalId: item.routeItems.map((item) => item.originalId),
                qnt: item.routeItems.map((item) => item.qnt),
                originalPrice: item.routeItems.map(
                  (item) => item.originalPrice
                ),
                comments: item.routeItems.map((item) => item.comments),
              }))
            )
          );
          setFinal6(res.data.map((item) => item.routeListItems));
        });
      // dataShow(final2);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  console.log(documentName);

  console.log(final);
  console.log(final1);
  console.log(final2);
  console.log(final4);
  console.log(final6);

  useEffect(() => {
    mainTranform(final6);
  }, [final6]);

  let man;
  const newTest = final6.map((item) =>
    item.map((item2) => {
      man = item2.managerName;
      console.log(man);
      return item2.routeItems.map((item3) => ({
        endPoint: item3.endPoint,
        partName: item3.partName,
        startPoint: item3.startPoint,
        vehicleName: item3.vehicleName,
        qnt: item3.qnt,
        originalPrice: item3.originalPrice,
        originalId: item3.originalId,
        comments: item3.comments,
        managerName: man,
      }));
    })
  );
  console.log(newTest);

  const newTest2 = final6.map((list) => {
    list.map((item) => {
      return item;
    });
  });
  console.log(newTest2);

  //   const newTest3 = final6.array.forEach((element) => {
  //     element.map((item) => item.routeItems);
  //   });
  //   console.log(newTest3);

  //   const checkedValue = final.map(
  //     (row) => {
  //       return { ...row.map((item) => item.other), defect: false };
  //     }
  //     // row.id === name
  //     // ? { ...row, defect: checked }
  //   );
  //   console.log(checkedValue);

  const students = [
    {
      name: 'sonny',
      score: 15,
    },
    {
      name: 'jack',
      score: 34,
    },
    {
      name: 'sonny',
      score: 32,
    },
  ];

  //   const newStudents = students.reduce((acc, item) => {
  //     let name = item.name;
  //     if (acc[name]) {
  //       acc[name] += item.score;
  //     } else {
  //       acc[name] = item.score;
  //     }
  //     return acc;
  //   }, {});

  //   console.log(newStudents);

  const checkedValue = final2.map(
    (row, i) => {
      let raw = final1
        .map((item) => item.map((item) => [item.manager, item.length]))
        .flat();

      let raw2 = final1
        .map((item) =>
          item.map((item) => ({ name: item.manager, score: item.length }))
        )
        .flat();

      const newStudents = raw2.reduce((acc, item) => {
        let name = item.name;
        if (acc[name]) {
          acc[name] += item.score;
        } else {
          acc[name] = item.score;
        }
        return acc;
      }, {});

      console.log(newStudents);

      console.log(
        final1
          .map((item) =>
            item.map((item) => ({ man: item.manager, len: item.length }))
          )
          .flat()
      );
      console.log(raw[0][0]);
      console.log(raw[0][1]);
      console.log(raw[1]);
      console.log(raw);

      var myarray = [5, 10, 3, 2];
      var new_array = [];
      myarray.reduce(function (a, b, i) {
        return (new_array[i] = a + b);
      }, 0);
      console.log(new_array); //

      if (i < raw[0][1]) {
        console.log(raw[(0)[2]]);
        return { ...row, defect: raw[0][0] };
      }

      if (i < raw[1][1]) {
        return { ...row, defect: raw[1][0] };
      }
      return { ...row, defect: 'ecked' };
    }
    // row.id === name
  );
  console.log(checkedValue);

  useEffect(() => {
    // 👇️ some condition here
    // if (lastItems2) {
    //   setFinal8(lastItems2);
    // }
    mainTranform2(data);
  }, [data]);

  function mainTranform(final6) {
    let man;
    let newTest = final6.map((item) =>
      item.map((item2) => {
        man = item2.managerName;
        console.log(man);
        return item2.routeItems.map((item3) => ({
          endPoint: item3.endPoint,
          partName: item3.partName,
          startPoint: item3.startPoint,
          vehicleName: item3.vehicleName,
          qnt: item3.qnt,
          originalPrice: item3.originalPrice,
          originalId: item3.originalId,
          comments: item3.comments,
          managerName: man,
        }));
      })
    );
    console.log(newTest);
    //console.log(lastItems2);
    if (newTest) {
      setFinal9(newTest);
    }
  }

  console.log(final9);

  function mainTranform2(data) {
    let man2;
    let sheet;
    let newTest3 = data.map((item) => {
      sheet = item.documentName;
      return item.routeListItems.map((item2) => {
        man2 = item2.managerName;
        console.log(man2);
        return item2.routeItems.map((item3) => ({
          endPoint: item3.endPoint,
          partName: item3.partName,
          startPoint: item3.startPoint,
          vehicleName: item3.vehicleName,
          qnt: item3.qnt,
          originalPrice: item3.originalPrice,
          originalId: item3.originalId,
          comments: item3.comments,
          managerName: man2,
          documentName: sheet,
        }));
      });
    });
    console.log(newTest3);
    //console.log(lastItems2);
    if (newTest3) {
      setFinal9(newTest3);
    }
  }

  //   function dataShow() {
  //     for (let i = 0; i < final2.length; i++) {
  //       for (let j = 0; j < final4.length; j++) {
  //         console.log(final2[i]);
  //         console.log(final4[j].length);
  //         if (final2[i].length === final4[j].length) {
  //           let temp = final2.map((item) => item);
  //           console.log(temp);
  //           final3.push({ ...final2[i], endPoint: final4[j].manager });
  //         }
  //       }
  //     }

  //     console.log(Object.entries(final3));
  //     console.log(temp2);
  //     console.log(temp3);
  //     console.log(data);

  //     let lastItems2 = final4.map((item) => ({
  //       manager: item[0],
  //       vehicleName: item.map((item) => item.vehicleName), // item[1],
  //       partName: item.map((item) => item.partName), // item[2]
  //       originalId: item.map((item) => item.originalId), // item[3],
  //       qnt: item.map((item) => item.qnt), // item[4],
  //       startPoint: item.map((item) => item.startPoint), // item[5],
  //       endPoint: item.map((item) => item.endPoint), // item[6],
  //       originalPrice: item.map((item) => item.originalPrice), // item[7],
  //       comments: item.map((item) => item.comments), // item[8],
  //     }));

  //     console.log(lastItems2);
  //     if (lastItems2) {
  //       setFinal9(lastItems2);
  //     }
  //   }

  let testarr = [];
  console.log(
    final2.map((item) => {
      testarr.push(item.length);
      return testarr;
    })
  );
  console.log(testarr);
  let final3 = [];
  let temp2 = [];
  let temp3 = [];

  //   for (let i = 0; i < final2.length; i++) {
  //     for (let j = 0; j < final1.length; j++) {
  //       //   console.log(final2[i]);
  //       //   console.log(final1[j].length);
  //       //   console.log(final1.manager);

  //       if (final1.length < j) {
  //         final2.push(...final2, final1.manager);
  //       }
  //       //   if (final2[i].length === final4[j].length) {
  //       //     let temp = final2.map((item) => item);
  //       //     console.log(temp);
  //       //     final3.push({ ...final2[i], endPoint: final4[j].manager });
  //       //   }
  //     }
  //   }
  //   console.log(final2);

  //   for (let i = 0; i < final2.length; i++) {
  //     for (let j = 0; j < final4.length; j++) {
  //      // console.log(final2[i]);
  //       console.log(final4[j].length);
  //       if (final2[i].length === final4[j].length) {
  //         let temp = final2.map((item) => item);
  //         console.log(temp);
  //         final3.push({ ...final2[i], endPoint: final4[j].manager });
  //       }
  //     }
  //   }

  //   console.log(Object.entries(final3));
  //   console.log(final3);

  //   console.log(temp2);
  //   console.log(temp3);
  //   console.log(data);

  //console.table('This is final DATA', finalData);

  let lastItems2 = final4.map((item) => ({
    manager: item[0],
    vehicleName: item.map((item) => item.vehicleName), // item[1],
    partName: item.map((item) => item.partName), // item[2]
    originalId: item.map((item) => item.originalId), // item[3],
    qnt: item.map((item) => item.qnt), // item[4],
    startPoint: item.map((item) => item.startPoint), // item[5],
    endPoint: item.map((item) => item.endPoint), // item[6],
    originalPrice: item.map((item) => item.originalPrice), // item[7],
    comments: item.map((item) => item.comments), // item[8],
  }));

  console.log(lastItems2);
  console.log(final2.flat());
  console.log(final9.flat(2));

  //   if (lastItems2) {
  //     setFinal9(lastItems2);
  //   }

  //   let lastItems2 = final4.map((item) => ({
  //     manager: item[0],
  //     vehicleName: item.map((item) => item.vehicleName), // item[1],
  //     partName: item.map((item) => item.partName), // item[2]
  //     originalId: item[3],
  //     qnt: item[4],
  //     startPoint: item[5],
  //     endPoint: item[6],
  //     originalPrice: item[7],
  //     comments: item[8],
  //   }));

  //   console.log(lastItems2);
  const selectList = () => {
    let x = document.getElementById('list').value;
    //let x = document.getElementById('list');

    // var n = document.getElementsByTagName('div  ')[1];
    // getId(n); // returns "tempIdPrefix_1224697942198"

    document.getElementById('res').innerHTML = x;
    console.log(x);
    setTargetDocName(x);
  };

  let selectedValues;
  const selectList2 = () => {
    //e.preventDefault();
    const btn = document.querySelector('#btn');
    const sb = document.querySelector('#framework');
    btn.onclick = (event) => {
      event.preventDefault();
      // show the selected index
      selectedValues = [].filter
        .call(sb.options, (option) => option.selected)
        .map((option) => option.text);
      //alert(selectedValues);
      //alert(sb.selectedIndex);
      console.log(selectedValues);

      //setTargetDocName(selectedValues[0]);
      if (selectedValues) {
        setTargetDocName(selectedValues[0]);
      }
    };
    //console.log(selectedValues)
  };

  console.log(targetDocName);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати останні дані по листу</h1>
          <button onClick={getData}>Отримати останні данні</button>

          <p>
            {/* <form> */}
            <label for="framework">Маршрутні листи: {''}</label>
            {/* <select id="framework">
              <option value="1">Angular</option>
              <option value="2">React</option>
              <option value="3">Vue.js</option>
              <option value="4">Ember.js</option>
            </select> */}
            <select id="framework">
              {documentName.map((c, i) => (
                <option id="list" value={c}>
                  {c}
                </option>
              ))}
            </select>
            {'  '}
            <button onClick={selectList2} id="btn">
              Вибрати лист
            </button>
            {/* </form> */}
          </p>

          {/* {documentName.map((item) => (
            <p>{item}</p>
          ))} */}

          {/* <p>
            <select size="3">
              <option id="apple">Apple</option>
              <option id="orange">Orange</option>
              <option id="banana">Banana</option>
            </select>
          </p> */}

          {/* <p>
            Маршрутні листи :{' '}
            <select>
              {documentName.map((c, i) => (
                <option id="list" value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button onClick={selectList}>Try it</button>
            <br />
            <p id="res"></p>
          </p> */}

          <Row>
            <Col md={12}>
              <Table hover bordered className="border">
                <thead className="text-right table-header text-header">
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
                <tbody className="text-secondary table-body test-size">
                  {final9
                    .flat(2)
                    .filter((item) => {
                      if (targetDocName) {
                        console.log(targetDocName);
                        console.log(item.documentName);

                        return (
                          item.documentName.replaceAll('  ', ' ') ===
                          targetDocName
                        );
                      } else {
                        return item;
                      }
                    })
                    //.flat(2)
                    .map((getdata, index) => (
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
                        {/* <th>{getdata.map((item) => item.manager)}</th>
                  <th>{getdata.map((item) => item.partName + ' \n')}</th> */}
                        {/* <th>{index}</th> */}

                        <th>{getdata.managerName}</th>
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

export default GetLastRouteSheet;
