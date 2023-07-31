import React, { useContext, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import './GetDocuments.css';
import BarcodeGen from '../BarcodeGen';
import { Store } from '../../Store';
import axios from 'axios';

function GetDocuments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;
  let { printerUrl } = userInfo;
  // printerUrl =
  //   'http://desktop-an879b6/Integration/WebServiceIntegration/Execute';

  // let userInfo.printerUrl = 'http://desktop-an879b6/Integration/WebServiceIntegration/Execute'
  console.log(userInfo.printerUrl);

  const [documentID, setDocumentID] = useState('');
  const [sheetID, setSheetID] = useState('');

  const getDocument = async (e) => {
    e.preventDefault();
    try {
      const res = $api
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/GoogleSheet/get-documents',
          {
            documentId: documentID, // '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
            sheetId: sheetID, // '2020',
          }
        )
        .then((res) => {
          const response = res.data;
          setData(response);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const newID = localStorage.getItem('id');
  // const newRhinoID = localStorage.getItem('rhinoID');
  // console.log(newID);
  // console.log(newRhinoID);

  // const [text, setText] = useState(`${newID}`);
  // const [barcode, setBarcode] = useState(`${newID}`);

  // const generateBarcode = () => {
  //   //e.preventDefault();
  //   setBarcode(text);
  // };
  // console.log(barcode);

  const getData2 = (item) => {
    try {
      const res = $api
        .get(
          `http://${printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getData3 = (item) => {
    try {
      const res = $api
        .get(
          `http://desktop-an879b6/Integration/WebServiceIntegration/Execute?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getData4 = (item) => {
    try {
      const res = axios
        .get(
          `http://desktop-an879b6/Integration/WebServiceIntegration/Execute?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const barcodeNew = async (e, item) => {
  e.preventDefault();
  try {
    console.log(${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name});
    await fetch(`${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name}`).then(res => {
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};


  const barcodeNew2 = async (e, item) => {
    const response = await axios.get(
      `http://desktop-an879b6/Integration/WebServiceIntegration/Execute?id=${item.id}&veh=${item.vehicle}&name=${item.name}`
    );
  };

  let tests2 = 'hello';

  let arro = [];
  let arr = [];
  let res;
  for (let i = 0; i < tests2.length; i++) {
    console.log(tests2[i]);
    arro.push(tests2[i]);

    //res += str[i].toUpperCase() + str[i].toLowerCase()

    arr.push([tests2[i].toUpperCase(), ...tests2]);
  }
  console.log(arr);
  let arr4 = arr.map((item) => item.join(''));
  console.log(arr4);

  let arr5 = arr4.map((item, i) => item.replace(item[i + 1], item[0]));
  console.log(arr5);

  const array1 = [1, 4, 9, 16];
  let array1Test = array1.map((item, index, arr) => arr[index]);
  console.log(array1Test);

  let testSme = 'fooba999';
  console.log(testSme.split(''));
  let testSme2 = testSme.split('');
  console.log(testSme2);
  let la = testSme[testSme.length - 1];
  console.log(la);
  let numb = /\d/.test(testSme);
  console.log(numb);

  let last = testSme2[testSme2.length - 1];
  console.log(last);

  let prelast = testSme2[testSme2.length - 2];
  console.log(prelast);
  if (last === '9' && prelast === '9') {
    let newresoinit = testSme2.slice(-2).splice(testSme2.length - 1, 2, 100);
    console.log(testSme2);

    console.log(newresoinit);
    let newreso = testSme2.splice(testSme2.length - 1, 2, 100);
    console.log(newreso);
    console.log(testSme2);
  }

  let sow = testSme2.splice(testSme2.length - 1, 1, 9);
  console.log(sow);
  console.log(testSme2.join(''));
  console.log(testSme.match(/\d/));

  // str = str.replaceAt(5, '_');
  //let string11 = '8 j 8   mBliB8g  imjB8B8  jl  B';
  let string11 = '8aaaaa dddd r ';

  let string12 = string11.replace(/\s/g, '');
  console.log(string12.s);

  let someArr = ['Telescopes', 'Glasses', 'Eyes', 'Monocles'];
  let someArr2 = someArr.sort();
  console.log(someArr2);
  let arr10 = [2, 3, 1];
  let sum10 = 4;
  let test10;

  for (let i = 0; i <= arr10.length; i++) {
    console.log(arr10[i]);
    for (let j = arr10.length - 1; j > 0; j--) {
      console.log(arr10[j]);
      test10 = arr10[i] + arr10[j];
      console.log(test10);
      console.log(sum10);
      if (sum10 === test10) {
        console.log([i, j]);
      }
    }
  }

  const arr7 = ['Hello', 'Alcohol', 'Conquer', 'RockyRoad'];
  const arr8 = ['Hello'];

  const counts7 = arr7.map((item) =>
    item.split('').reduce((count, char) => {
      return char === 'l' ? ++count : count;
    }, 0)
  );

  const counts8 = arr8.reduce((acc, { char }) => acc + (char ? 1 : 0), 0);

  console.log(counts7);
  console.log(counts8);

  let string = 'hello';

  var result = [],
    i;

  for (i = 0; i < string.length; i++) {
    if (string[i] === ' ') continue;
    result.push(
      Array.from(string, (c, j) => (i === j ? c.toUpperCase() : c)).join('')
    );
  }
  console.log(result);

  let custo = [1, 2, 3, 4];
  let arr6 = [];

  for (let i = 0; i < custo.length; i += 2) {
    arr6.push(custo[i]);
  }
  console.log(arr6);

  // two sum
  let sum = 4;
  let array = [1, 2, 3];
  let array2 = [];
  let secval;

  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    console.log(sum - array[i]);
    let temp = sum - array[i];
    // console.log(beasts.indexOf('bison'));
    console.log(array.indexOf(temp));
    secval = array.indexOf(temp);

    array2.push([secval]);

    // if (array.includes(temp)) {
    //   console.log('ojdfj');
    // }
    console.log(array2);
  }

  // other tasks

  let stro = 'is2 Thi1s T4est 3a';
  let stro2 = stro.split(' ');
  console.log(stro2);
  let arrro = [];
  for (let i = 0; i < stro2.length; i++) {
    //const element = stro2[i];
    if (stro2[i].includes(i)) {
      console.log(stro2[i]);
      arrro.push(stro2[i]);
    }
  }
  console.log(arrro);

  let numbers = [-1, 2, -3, 4, 5];
  let numbers2 = numbers.map((item) => item * -1);
  console.log(numbers2);

  let number = 1234;
  let re = Array.from(String(number), Number);
  console.log(re);
  let re2 = re.map((item, i) => Math.pow(item, 2));
  console.log(re2);
  let re3 = re2.reduce((total, item) => (total += item), 0);
  console.log(re3);

  // camelcase
  let val = 'camease';
  console.log(/[A-Z]/.test(val));
  let val2 = val.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  console.log(val2);

  let dob2 = 'camelCasing'.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  let dob3 = 'cameCase';

  let dob = 'MyCamelCaseString'.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  console.log(dob);
  console.log(dob2);

  console.log(/[A-Z]/.test(dob3));

  // let numbers = [1, 2, 3];
  // let result = numbers.reduce((total, item) => (total += item), 0);
  // console.log(result);
  // let finalRes = result / numbers.length;
  // console.log(numbers.length);
  // console.log(finalRes);

  // const func = (num) => {
  //   let arr = [];
  //   for (let i = 0; i < arr.length; i++) {}
  //   arr.push(num - 1);
  // };
  // let res = func(3);
  // console.log(res);

  // let testNum = Array.from(Array(8 + 1).keys());
  // console.log(testNum);
  // let nextNum = testNum.reduce((total, item) => (total += item), 0);
  // console.log(nextNum);
  // // let final = 1 + nextNum;
  // // console.log(final);

  // let text = 'world';
  // let text4 = 'hello world';
  // let text4new = text4.substring(1);
  // console.log(text4new);
  // let variable = text.charAt(0);
  // console.log(variable);
  // let arr = [];
  // let arr2 = [];
  // let arr4 = [];
  // for (let i = 0; i < text.length; i++) {
  //   arr.push(text.charAt(i));
  // }
  // for (let i = text.length - 1; i >= 0; i--) {
  //   arr2.push(text.charAt(i));
  // }
  // for (let i = text4.length - 1; i >= 0; i--) {
  //   arr4.push(text4[i]);
  // }

  // console.log(arr);
  // let arr3 = ['hello', 'world', 'this', 'is', 'great'];
  // const resTest = arr3.join(' ');
  // console.log(resTest);
  // console.log(arr);
  // console.log(arr2);
  // console.log(arr4);
  // //let newvartest = arr4
  // //console.log(newvartest);
  // let newTest4 = arr4.join(' ');
  // console.log(newTest4);
  // //let newTest5 = newTest4.reverse();
  // //console.log(newTest5);
  // let newtest = arr2.join('');
  // console.log(newtest);

  // let textTest = 'arrro';
  // let textTest2 = 'Arrro';

  // if (textTest.startsWith('a')) {
  //   console.log('you win');
  // }
  // if (textTest2.startsWith('A')) {
  //   console.log(textTest2 + ' you win');
  // }

  // //kata Sum of positive
  // let res5 = [];
  // let testarr5 = [1, -2, 3, 4, 5];
  // for (let i = 0; i < testarr5.length; i++) {
  //   if (testarr5[i] >= 0) {
  //     res5.push(testarr5[i]);
  //   }
  // }
  // console.log(res5);
  // let res6 = res5.reduce((total, item) => (total += item), 0);
  // console.log(res6);

  // var re = /([А-ЯЁа-яё]+)\s([А-ЯЁа-яё]+)/;
  // var str = 'Джон Смит';
  // var newstr = str.replace(re, '$2 $1');
  // console.log(newstr); // Смит, Джон

  // new task from codewars
  const teststr = 'cwAt';

  let restes = teststr.repeat(2);
  console.log(restes);
  console.log(teststr.length);

  let test2 = teststr.toLocaleLowerCase().split('');
  console.log(test2);

  let arrhere = [];
  for (let i = 0; i < test2.length; i++) {
    //const element = test2[i];
    if (teststr.length) {
      arrhere.push(test2[i].repeat(i + 1));
      console.log(test2[i]);
      //arrhere.push(test2[i].charAt(0).toUpperCase());
    }
    console.log(teststr.length);
    console.log(test2[i].repeat(2));
  }
  console.log(arrhere);

  let capitalized2;
  let capitalized3;
  capitalized2 = arrhere[0];
  console.log(capitalized2);

  for (let i = 0; i < arrhere.length; i++) {
    //const element = array[i];
    console.log(arrhere[i]);
    // const word = "freecodecamp"

    //capitalized2 += arrhere[0];
    capitalized2 +=
      `${arrhere[i].charAt(0).toUpperCase()}` + `${arrhere[i].slice(1)}-`;
    //capitalized3.push(capitalized2);
  }
  console.log(capitalized2);
  let wors = capitalized2.slice(1, capitalized2.length - 1);
  console.log(wors);

  // kata next

  let test = 'abcd';
  let tests = 'cd';

  let testrev = test.split('').reverse();
  console.log(testrev);
  let value = [];
  console.log(tests.length);
  for (let i = 0; i < testrev.length; i++) {
    console.log(testrev[i]);
    value.push(testrev[i].charAt(tests.length - i));
  }
  console.log(value);

  for (let i = test.length - 1; i >= 0; i--) {
    console.log(test[i]);
    value.push(test[i].charAt(tests.length - i));
  }
  console.log(value);

  let resu = test.slice(-`${tests.length}`);
  console.log(resu);
  if (tests === resu) {
    console.log(true);
  } else {
    console.log(false);
  }

  // kata
  let input = [1, 2, 'a', 'b'];
  let reso = input.filter((item) => typeof item === 'number');
  console.log(reso);

  // kata
  let input2 = '1, 5, 22, 3';
  let resso = input2.split(' ');
  console.log(resso);
  let tess = resso.map((item) => parseInt(item));
  console.log(tess);
  let tesss = tess.sort((a, b) => a - b);
  console.log(tesss);

  let max = tesss[tesss.length - 1];
  let min = tesss[0];
  // for (let i = 0; i < tesss.length; i++) {
  //   console.log(tesss[i]);
  //   max = 0;
  //   if (tesss[i] >= max) {
  //     max = tesss[i];
  //   } else if (tesss[i] <= tesss[i + 1]) {
  //     max = tesss[i + 1];
  //   }
  //   min = tesss[0];
  //   // if (tesss[i] <= min) {
  //   //   min = tesss[i];
  //   // } else if (tesss[i] >= tesss[i + 1]) {
  //   //   min = tesss[i + 1];
  //   // }
  // }
  console.log(max);
  console.log(min);

  for (let i = 0; i < capitalized2.length; i++) {
    // const element = array[i];
    console.log(capitalized2[i]);
    // if (capitalized2[i] === capitalized2[i - 1]) {

    // }
  }

  let arrhere4 = [];
  for (let i = 0; i < arrhere.length; i++) {
    //const element = arrayhere[i];
    console.log(arrhere[i]);
    if (arrhere[i] !== arrhere[i + 1]) {
      let tes = arrhere[i] + arrhere[i + 1];
      //tes += arrhere4[i];
      console.log(tes);
      arrhere4.push(tes);
    }
  }
  console.log(arrhere4);

  let res4 = [];
  for (let i = 0; i < arrhere.length; i++) {
    //const element = arrhere[i];
    console.log(arrhere[i]);

    res4.push(arrhere[i].toUpperCase());

    //res4.push(arrhere[i][0].toUpperCase());
  }
  console.log(res4);

  const word = 'freecodecamp';

  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  console.log(capitalized);

  const hangleBarcode = (e, item) => {
    e.preventDefault();
    console.log(item);
    ctxDispatch({ type: 'BARCODE_ID', payload: item.id });
    ctxDispatch({ type: 'BARCODE_RHINOID', payload: item.rhinoID });
    localStorage.setItem('id', item.id);
    localStorage.setItem('rhinoID', item.rhinoID);
    //navigate('/barcode');
    // getData2(item);
    //getData3(item);
    getData4(item);

    // http://localhost:5000?id={код баркода}&veh={имя авто}&name={наименование товара}

    //return <BarcodeGen id={item} />;
  };

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <Container className="small-container">
            <h1 className="my-3">Отримати дані по документу</h1>
            <Form onSubmit={getDocument}>
              <FormGroup className="mb-3" controlId="documentID">
                <Form.Label>urlID</Form.Label>
                <Form.Control
                  // type="phone"
                  required
                  onChange={(e) => setDocumentID(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="mb-3" controlId="sheetID">
                <Form.Label>SheetID</Form.Label>
                <Form.Control
                  // type="password"
                  onChange={(e) => setSheetID(e.target.value)}
                />
              </FormGroup>
              <div className="mb-3">
                <Button type="submit">Отримати дані по документу</Button>
              </div>
            </Form>
          </Container>
          <div>
            {/* Get documents is here */}
            <div className="button">
              {/* <button className="btn btn-primary" onClick={getDocument}>
            Отримати дані по документу
          </button> */}
            </div>
            <div>
              <Row>
                <Col>
                  <Table bordered className="border">
                    <thead className="text-black table-header">
                      <tr>
                        <th>vehicle</th>
                        <th>name</th>
                        <th>rhinoID</th>
                        {/* <th>origonalID</th> */}
                        <th>stock price</th>
                        <th>income price</th>
                        <th>price with depreciation</th>
                        <th>delivery info</th>
                        <th>id</th>
                        <th>barcode</th>
                        {/* <th>марштрутный лист</th> */}
                      </tr>
                    </thead>
                    <tbody className="text-secondary table-body">
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.vehicle}</td>
                          <td>{item.name}</td>
                          <td>{item.rhinoID}</td>
                          {/* <th>{item.originalIDs.join(', ')}</th> */}
                          <td>{item.stockPrice}</td>
                          <td>{item.incomePrice}</td>
                          <td>{item.priceWithDepreciation}</td>
                          <td>{item.deliveryInfo}</td>
                          {/* <th>{item.id}</th> */}
                          {/* <Link to={`/get-documents/${'id'} =${item.id}`}> */}
                          <td>{item.id}</td>
                          {/* </Link> */}
                          <td>
                            {item ? (
                              // Чтобы страница открывалась в новой вкладке в <Link> нужно установить опцию target="_blank"
                              // target="_blank"

                              <button
                                onClick={(e) => barcodeNew(e, item)}
                                className="btn btn-danger"
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
    </div>
  );
}

export default GetDocuments;
