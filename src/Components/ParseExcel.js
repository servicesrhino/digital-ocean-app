import React, { useState, useRef, useEffect, useContext } from 'react';
import { Row, Table, Col, Label, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { json, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import $api from './http';
import { Store } from '../Store';
import BarcodeGen from './BarcodeGen';
import { Link } from 'react-router-dom';
import CheckedService from '../services/CheckedService';
import KeyValueStreamlineService from '../services/KeyValueStreamlineService';
import ParseService from '../services/ParseService';
import SaveHelperService from '../services/SaveHelperService';
import SaveService from '../services/SaveService';
import SaveHelperService2 from '../services/SaveHelperService2';
import TransformService from '../services/TransformService';
import Sidebar from './Sidebar/Sidebar';
import './Sidebar/Sidebar.css';
import './ParseExcel.css';

const ParseExcel = () => {
  const acceptableFileName = ['xlsx', 'xls'];
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();
  const [allFile, setAllFile] = useState(null);
  const [other, setOther] = useState(null);

  const [inputVal, setInputVal] = useState('');
  const [inputVal2, setInputVal2] = useState('');
  const [inputVal3, setInputVal3] = useState('');
  const [inputVal4, setInputVal4] = useState('');

  const [sheetData, setSheetData] = useState([]);
  const [sheetData2, setSheetData2] = useState([]);

  const [sheet, setSheet] = useState(null);
  const [columns, setColumns] = useState([]);
  const [body, setBody] = useState([]);

  //const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCategory1, setSearchCategory1] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { category } = state;

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split('.')[1]);
  };

  function startsWithNumber(str) {
    return /^\d/.test(str);
  }
  console.log(startsWithNumber('avocado 123')); // 👉️ false
  console.log(startsWithNumber('456 avocado')); // 👉️ true
  console.log(startsWithNumber('0.3 abc')); // 👉️ true

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert('Invalid File Type');
      return;
    }

    let patternName = 'CH РЕАЛ Август #20 #21.xlsx';
    let patternName2 = 'БУ список.xlsx';
    if (myFile.name.includes(patternName2)) {
      console.log('working');
    }

    setFile(myFile);
    setFileName(myFile.name);
    setAllFile(myFile);

    let jsonData2 = [];
    if (myFile.name === patternName) {
      console.log('yes');
      jsonData2 = await ParseService.parse(myFile, 1);
      console.log(jsonData2);
    } else if (myFile.name === patternName2) {
      console.log('бу файл');
      jsonData2 = await ParseService.parse(myFile, 1.1);
      console.log(jsonData2);
    } else {
      jsonData2 = await ParseService.parse(myFile, 2);
      console.log(jsonData2);
    }

    // const jsonData2 = await ParseService.parse(myFile);
    // console.log(jsonData2);

    // new stuf testing

    function Uniq(arr = []) {
      return arr.reduce(
        (accumulator, currentValue, _, array) =>
          accumulator.includes(currentValue[0])
            ? accumulator
            : [...accumulator, currentValue[0]],

        //array.push(accumulator)
        []
      );
    }

    const arr2 = Uniq(jsonData2);
    console.log(arr2);

    // for (let i = 0; i < array.length; i++) {
    //   //const element = array i];
    // }

    // jsonData2.map((item) => {
    //   item.includes(arr2) ? item.push : item;
    // });

    let mark = [];
    let mark2 = [];
    let mark3 = [];

    mark.push(jsonData2[0][0]);
    let jsonData3 = [];
    for (let i = 0; i < jsonData2.length; i++) {
      // if (data[i][0] === null) {
      //   //console.log(data[i][0]);
      // }

      // if (!jsonData2[i][0]) {
      //   //mark2.push(jsonData2[i][0]);
      //   jsonData3[i].unshift(
      //     jsonData2[i][0],
      //     jsonData2[i]
      //     // .find((item, i) => item[i][-1] !== jsonData2[i][0])
      //     //.find((item, i) => item.pop())
      //   );
      // }

      if (jsonData2[i][0]) {
        mark2.push(jsonData2[i][0]);
      }
      //const element = array[i];

      // let filteredBrand = [];
      // if (mark2.filter((item) => item === jsonData2[i][0])) {
      //   filteredBrand = mark2.filter((item) => item === jsonData2[i][0]);
      // }

      //console.log(filteredBrand);
      //console.log(data[i][0]);
      let abc = [];
      if (
        jsonData2[i][0] !== mark[0] &&
        jsonData2[i][0] !== 0
        // jsonData2[i][0] !== mark2.filter((item) => item === jsonData2[i][0])
        //!jsonData2[i][0]
      ) {
        jsonData2[i].unshift(
          [...mark2.filter((item, i) => item[i] !== jsonData2[i][0])]
          // .find((item, i) => item[i][-1] !== jsonData2[i][0])
          //.find((item, i) => item.pop())
        );

        abc = jsonData2[i][0];
        //jsonData3.push([mark2[i - 1], ...jsonData2[i]]);
      } else if (jsonData2[i][0]) {
        // mark.push(jsonData2[i][0]);
        //jsonData2[i].unshift(jsonData2[i - 1][0]);
        //mark2.shift(jsonData2[0][0]);
        // console.log(mark);
        // jsonData2[i].shift(
        //   mark2.filter((item, i) => item[i] !== jsonData2[i][0])
        // );
      }
      // if (jsonData2[i][0].length > 1) {
      //   jsonData2[i].unshift(jsonData2[i][0], ...jsonData2[i]);
      // }
    }
    console.log(mark);
    console.log(mark2);

    console.log(jsonData2.pop()); // the most correct way right now
    console.log(jsonData2.pop()); // the most correct way right now
    console.log(jsonData2); // the most correct way right now

    console.log(jsonData3);
    let testData = [];
    if (myFile.name === patternName2) {
      testData = TransformService.transform(jsonData2);
      console.log(testData);
    }

    let lastItemsTest3 = [];

    // раскоментировать здесь для разборки
    // let marks = [];
    // for (let i = 0; i < jsonData2.length; i++) {
    //   //const element = array[i];
    //   if (jsonData2[i][0].length === 1) {
    //     marks.push(jsonData2[i][0]);
    //   }

    //   if (jsonData2[i][1] && jsonData2[i][1].length >= 18) {
    //     marks.push(jsonData2[i][1]);
    //   }
    //   if (
    //     jsonData2[i][1] &&
    //     jsonData2[i][1].includes('BMW') &&
    //     jsonData2[i][1].length >= 5
    //   ) {
    //     marks.push(jsonData2[i][1]);
    //   }
    //   if (marks) {
    //     marks.flat();
    //   }

    //   if (
    //     jsonData2[i][0] !== marks[0] &&
    //     jsonData2[i][0] !== 0
    //     // jsonData2[i][0] !== mark2.filter((item) => item === jsonData2[i][0])
    //     //!jsonData2[i][0]
    //   ) {
    //     jsonData2[i].unshift(
    //       [...marks.flat().filter((item, i) => item[i] !== jsonData2[i][0])]
    //       // .find((item, i) => item[i][-1] !== jsonData2[i][0])
    //       //.find((item, i) => item.pop())
    //     );

    //     // abc = jsonData2[i][0];
    //     //jsonData3.push([mark2[i - 1], ...jsonData2[i]]);
    //   }
    // }
    // console.log(marks.flat());
    // console.log(jsonData2);
    // jsonData2.shift();
    // console.log(jsonData2);

    // let marks2 = marks.filter((item) => {
    //   return item.length > 10;
    // });
    // console.log(marks2);
    // //раскоментировать здесь для разборки

    // //раскоментировать здесь

    // let lastItems = jsonData2.map((item) => ({
    //   cod: item[2],
    //   stelaj: item[3],
    //   name: item[4],
    //   Pl: item[5],
    //   On: item[6],
    //   price: item[8],
    //   quantity: item[7],
    //   vehicle: Array.isArray(item[0])
    //     ? item.map((item) => item[item.length - 1]).find((item) => item[0])
    //     : item[0],
    //   // vehicle: Array.isArray(item[0])
    //   //   ? item.findLast((element) => element[element.length] > 8)
    //   //   : item[0],
    // }));
    // console.log(lastItems);

    // let lastItemsTest = [];
    // let lastItemsTest2 = [];
    // let lastItemsTest3 = [];

    // lastItemsTest = lastItems.filter((item) => item.name !== undefined);
    // console.log(lastItemsTest);
    // lastItemsTest2 = lastItemsTest.filter(
    //   (item) => item.name !== 'Наименование'
    // );
    // console.log(lastItemsTest2);

    // lastItemsTest3 = lastItemsTest2.filter((item) => item.name !== 'Деталь');
    // console.log(lastItemsTest3);

    // console.log(lastItems);

    //раскоментировать здесь

    let jsonData4 = [];
    for (let i = 0; i < jsonData3.length; i++) {
      //const element = array[i];
      if (jsonData3[i][1].length > 1) {
        jsonData4.push([jsonData3[i][1].splice(-1), ...jsonData3[i]]);
      }
      //console.log(jsonData3[i]);
      //jsonData3 ? jsonData4.push(jsonData3[i][jsonData4.length]) : 'yes';
      // jsonData4 = jsonData3.map((item) => item[0]);
    }
    console.log(jsonData4);

    var stored = jsonData2.reduce(function (acc, val, i, arr) {
      // console.log('pv: ', pV[0]);
      // console.log('cv: ', cV[0]);

      // console.log('arr: ', arr);
      //console.log(val[0]);
      if (val[0] !== arr[i - 1]) {
        acc.push(val[0]);
        return [...acc, val[0]];
      } else {
        return acc;
      }

      // if (!pV) {
      //   console.log(pV);
      //   return pV.push(cV[0]);
      //   //return pV;
      // }
      // if (cV[0] !== pV) {
      //   //arr.push(cV[0]);
      //   arr = [cV[0], ...arr];
      //   console.log(arr);
      //   //cV.some(pV)
      //   return arr;

      //   //return arr.push(pV)V
      // }
      // if (pV[0] !== cV[0]) {
      //   //pV.push(cV[0]);
      //   arr.push(cV[0]);
      // }

      // pV.push(cV);
      //return arr; // *********  Important ******
    }, []);
    console.log(stored);

    const myarr = [10, 15, 4, 40];
    // let arrayTotal = myarr.reduce((previousValue, currentValue) => {
    //   return {
    //      previousValue += currentValue)]
    //   };
    // });
    // console.log(arrayTotal);
    let testNew2 = [];
    let testNew = myarr.reduce((previousValue, currentValue, array) => {
      console.log(previousValue);
      console.log(array);

      // if (!previousValue) {
      //   return array.push(previousValue);
      // }
    });

    let vehicle2 = jsonData2.map((item, index) => {
      let vehicle = item[0];

      if (!vehicle) {
        return item[index - 1];
      }
      return jsonData2;
    });
    console.log(vehicle2);

    // let jsonData2_1 = [];
    // for (let i = 0; i < jsonData2.length; i++) {
    //   // const element = array[i];
    //   jsonData2_1.push(jsonData2[i][0]);
    //   // if (jsonData2[i][0]) {
    //   //   jsonData2_1.push(
    //   //     jsonData2[i][0].findLast((item) => item >= item.length)
    //   //   );
    //   // }
    // }
    // console.log(jsonData2_1);
    // let jsonData2_2 = [];
    // for (let i = 0; i < jsonData2_1.length; i++) {
    //   //const element = array[i];
    //   console.log(jsonData2_1.findLast((item) => item.length > 10));
    //   jsonData2_2.push(jsonData2_1.findLast((item) => item > 10));
    // }
    // console.log(jsonData2_2);

    //раскоментировать здесь

    //раскоментировать здесь

    let test = [
      ['one', 'two'],
      ['three', 'four'],
      ['five', 'six'],
    ];

    let finalRes = [];
    function checkElement(array, str) {
      var item;
      for (var i = 0; i < array.length; i++) {
        item = array[i];

        if (
          item.includes(str) ||
          (Array.isArray(item) && checkElement(item, str))
        ) {
          //return item; //.map((item) => item);
          //filter((item) => item === str);
          finalRes.push(item);
        }
      }

      return false;
    }

    //console.log(checkElement(jsonData2_1, 'Honda')); // true
    //console.log(checkElement(test, 'seven')); // false
    console.log('finalRes: ' + finalRes);

    // let cat = [];
    // const checkElement = (array, str) =>
    //   (cat = array.find((item) =>
    //     Array.isArray(item) ? checkElement(item, str) : item === str
    //   ));

    // const arr = [
    //   ['one', 'two'],
    //   ['three', 'four'],
    //   ['five', 'six'],
    // ];

    // console.log(checkElement(arr, 'four')); // true
    // console.log(cat);
    //console.log(checkElement(arr, 'seven'));

    let items = [];
    items = jsonData2.map((item, i) => ({
      //items: [
      //{
      incomePrice: item[6] ? item[6] : item[7],
      priceWithDepreciation: item[11] ? item[11] : item[10], // previous variant: typeof item[10] != 'string' ? item[10] : item[11],
      stockPrice: 0,
      //name: item[2] ? item[2] : item[1] >= item[2] ? item[1] : item[2],
      name: item[1] ? (item[1] > item[2] ? item[1] : item[2]) : item[2],
      // name: item[0]
      //   ? item[1] > item[2]
      //     ? item[1]
      //     : item[2]
      //   : item[1]
      //   ? 'somephield'
      //   : 'somepjeilda',
      rhinoID: item[3]
        ? item[3]
        : item[2]
        ? item[3]
          ? item[3]
          : item[2]
        : 'someId',
      originalIDs: item[4] ? item[4] : 0,
      deliveryInfo: 'some',
      vehicle: Array.isArray(item[0])
        ? item.map((item) => item[item.length - 1]).find((item) => item[0])
        : item[0],
      //}
      //],
    }));
    console.log(items);

    let items2 = [];
    items2 = items.filter((user) => user.name !== undefined);
    items.splice(items.filter((user) => user.name === undefined));
    console.log(items);
    console.log(items2);
    //let vehicle = ''

    // let { vehicle } = items;
    // console.log(vehicle);
    // let [a, ...b] = vehicle;
    // console.log(a);

    // for (const car of items) {
    //   let { vehicle } = items;
    //   console.log(vehicle);
    //   let [a, ...b] = vehicle;
    //   console.log(a);
    //   //console.log(car[])
    // }

    // items2 = items.map((item, i) => {
    //   let { vehicle } = items;
    //   console.log(vehicle[i]);
    //   // console.log(
    //   //   items.filter((item) => item.vehicle !== item.vehicle[item.length - 1])
    //   // );
    // });

    // const test1 = jsonData2.flat(1);
    // console.log(test1);
    // let test2 = [];
    // let test3 = [];
    // console.log(jsonData2.flatMap((element) => element).flat(5));

    // const helpArray = Object.values(jsonData2[0]);
    // console.log(helpArray);

    // const helpArray2 = Object.entries(jsonData2);
    // console.log(helpArray2);
    // const helpArray2_1 = jsonData2.map((element) => [Object.entries(element)]);
    // console.log(helpArray2_1.flat(1));
    // const helpArray2_2 = helpArray2_1.flat(1);

    // let newArr2Other = jsonData2.map((element, index) => [
    //   Object.values(element),
    // ]);
    // console.log(newArr2Other);
    // const newArr3Other = newArr2Other.flat(1);

    // const helpArray3 = Object.values(jsonData2[1]);
    // console.log(helpArray3);

    // let newArr2 = [];
    // let newArr2afterFlat = [];
    // let newArr3 = jsonData2.map((item, index) => [
    //   helpArray
    //     .filter((item) => item !== item[0])
    //     .find((item) => item !== item[0]),

    //   helpArray
    //     .filter((item) => item !== item[1])
    //     .find((item) => item !== item[1]),
    // ]);
    // console.log(newArr3);

    // let newArrTest = [];
    // for (let i = 0; i < newArr3Other.length; i++) {
    //   if (newArr3Other[i].length > 5) {
    //     //console.log(newArr3Other[i]);
    //     newArrTest.push([newArr3Other[i][2], i]);
    //   }
    // }
    // console.log(newArrTest);

    // newArr2 = jsonData2.map((element, index) => [Object.values(element)]);
    // console.log(newArr2.flat(1));
    // newArr2afterFlat = newArr2.flat(1);
    // console.log(newArr2afterFlat);

    // let newArr2improved = [];
    // newArr2improved = newArr2.flat(6);
    // console.log(newArr2improved);

    // newArr3 = jsonData2.map((element) => [Object.keys(element)]);
    // console.log(newArr3);

    // let keyArr = [];
    // let newArr2afterFlat2 = [];
    // newArr2afterFlat2 = newArr3.flat(1);
    // for (let i = 0; i < newArr2afterFlat2.length; i++) {
    //   if (/^\d/.test(newArr2afterFlat2[i]) && newArr2afterFlat2[i].length > 5) {
    //     //console.log(newArr2afterFlat2[i]);
    //     keyArr.push([newArr2afterFlat2[i][2], i]);
    //   }
    // }
    // console.log(keyArr);

    // // const newArr4 = newArr2afterFlat.map((el) => {
    // //   if (el.length > 4) {
    // //     return el;
    // //   }
    // // });
    // // console.log(newArr4);

    // let newArr5 = [];
    // for (let i = 0; i < newArr2afterFlat.length; i++) {
    //   if (newArr2afterFlat[i].length > 5) {
    //     //console.log(newArr2afterFlat[i]);
    //     newArr5.push([newArr2afterFlat[i][2], i]);
    //   }
    // }
    // console.log(newArr5);

    // let newArr6 = [];
    // for (let i = 0; i < newArr5.length; i++) {
    //   //const element = array[index];
    //   if (/^\d/.test(newArr5[i])) {
    //     newArr6.push(newArr5[i]);
    //   }
    // }
    // console.log(newArr6);

    // //let newArr7 = [];
    // newArr6.unshift(keyArr[0]);
    // console.log(newArr6);
    // newArr6[0].pop();
    // newArr6[0].push(0);
    // console.log(newArr6);

    // let newArr7 = [];
    // const aaa = () => {
    //   for (let i = 0; i < helpArray2_2.length; i++) {
    //     const element = helpArray2_2[i];
    //     newArr7.push(helpArray2_2[i]);
    //     //console.log(element);
    //     for (let j = 0; j < newArr6.length; j++) {
    //       //console.log(object);
    //       if (newArr6[j].includes(i)) {
    //         newArr7[i].push(newArr6[j][0]);
    //       }
    //       //let prevIter = newArr7[j - 1]

    //       // if (/^\d/.test(newArr6[j - 1])) {
    //       //   newArr7.push(newArr6[i]);
    //       // }
    //     }

    //     // for (let i = newArr7.length; i > 0; i--) {
    //     //   //const element = array[i];
    //     // }

    //     let lastElement = newArr7[newArr7.length - 1];
    //     if (/\d+$/.test(lastElement) || newArr6.includes(lastElement)) {
    //       newArr7.push(newArr7[newArr7.length - 1]);
    //       newArr7.push(newArr7[newArr7.length - 2]);
    //       newArr7.push(newArr7[newArr7.length - 3]);
    //     }
    //   }
    // };
    // const ret = aaa();
    // console.log(ret);
    // console.log(newArr7);

    // // let arr8 = [];
    // // for (let i = 0; i < newArr7.length; i++) {
    // //   let lastElement = newArr7[newArr7.length - 1];
    // //   if (/^\d/.test(lastElement)) {
    // //     arr8[i].push(lastElement);
    // //   }
    // // }
    // // console.log(arr8);

    // const goaalArrayRaw = jsonData2.map((item, index) => {
    //   return {
    //     incomePrice: helpArray
    //       .filter((item) => item !== item[0])
    //       .find((item) => item !== item[0]),
    //     // stockPrice: helpArray
    //     //   .filter((item) => item !== item[1])
    //     //   .find((item) => item !== newArr2[1][1]),
    //     // stockPrice2: newArr2
    //     //   .filter((item) => item !== item[0])
    //     //   .find((item) => item !== item[0])
    //     //   .find((item) => item !== item[0]),
    //     stockPrice: helpArray[1],
    //     name: helpArray[2],
    //     rhinoID: helpArray[3],
    //     originalID: helpArray[4],
    //     vehicle: newArr6[0].filter((item) => item !== helpArray[0]),
    //     vehicleTest: newArr6[0].includes(helpArray[0])
    //       ? newArr6.includes(helpArray)
    //       : '10',
    //     vehicle2: index < 10 ? '$2' : '$10.00',
    //     vehicle3: index < newArr6[1][index] ? newArr6[0][index] : '$10.00',
    //     vehicle3_1_1: index > newArr6[1][index] ? newArr6[0][index] : '$10.00',

    //     vehicle3_1: index === newArr6[1] ? newArr6[1][index] : '$10.00',
    //     vehicle3_2:
    //       index === newArr6[1][index] ? newArr6[1][index] : newArr6[0][0],

    //     vehicle4: newArr6[1][index],
    //     vehicle5: newArr6.map((item, index) =>
    //       index !== item[1]
    //         ? item[1] !== index
    //           ? item[1][1]
    //           : 'lol'
    //         : item[0][1]
    //     ),
    //     vehicle6: newArr6.map((item, index) => {
    //       return {
    //         vig:
    //           index <= item[1][index]
    //             ? item[0] !== index
    //               ? item[1][0]
    //               : 'lol'
    //             : item[0][1],
    //       };
    //     }),
    //   };
    // });
    // console.log(goaalArrayRaw);
    // console.log(newArr6[1][1]);

    // const vehicleFound = [];
    // const goalArray = jsonData2.map((item, index) => {
    //   //   if (item[helpArray[0]] !== helpArray[0]) {
    //   //     vehicleFound.push(item[0]);
    //   //   }

    //   //   if (!item[index].toString().includes(helpArray)) {
    //   //     vehicleFound.push(item[index]);
    //   //   }

    //   //console.log(vehicleFound);
    //   return {
    //     incomePrice: item[210],
    //     stockPrice: item[240],
    //     name: item['фара левая LED'],
    //     vehicle:
    //       item[0] !==
    //       helpArray
    //         .filter((item) => item !== item[0])
    //         .find((item) => item !== item[0])
    //         ? item[0] !==
    //           helpArray
    //             .filter((item) => item !== item[0])
    //             .find((item) => item !== item[0])
    //         : item[0],

    //     rhinoID: item['KFR001029AL'],
    //     other: helpArray.filter((item) => item === helpArray[0]),

    //     other2: helpArray.filter(
    //       (item) => item !== item.toString().includes(helpArray)
    //     ),
    //     other3: item.toString().includes(!helpArray),
    //     vehicle2: newArr2
    //       .filter((item) => item !== helpArray[0])
    //       .find((item) => item !== helpArray[0]),
    //     other4: helpArray
    //       .filter((item) => item !== item[0])
    //       .find((item) => item !== item[0]),
    //     other5: helpArray
    //       .filter((item) => item !== item[0])
    //       .find((item) => item !== item[2]),
    //   };
    // });

    // console.log(vehicleFound);

    // console.log(goalArray);

    // const newarr = jsonData2.map((item) => {
    //     return {
    //         item[0],
    //     }
    // })

    // new stuf testing end

    if (myFile.name === patternName) {
      // Ниже логика по изменению ключа/значения в нужный формат
      const finalData = KeyValueStreamlineService.stremline(jsonData2);

      // Ниже логика создания уникальных id и округления цены
      const newData = items2.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);
      setSheetData2(newData);
    } else {
      // Ниже логика по изменению ключа/значения в нужный формат
      const finalData = KeyValueStreamlineService.stremline(jsonData2);

      // Ниже логика создания уникальных id и округления цены
      const newData = finalData.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);

      let newDataTest = [];
      // for (let i = 0; i < newData.length; i++) {
      //   //const element = array[i];
      //   console.log(newData[i][0]);
      //   if (newData[i][0].length > 10) {
      //     newDataTest.push(newData[i][0]);
      //   }
      // }
      // console.log(newDataTest);
      setSheetData2(newData);
    }
    if (myFile.name === patternName2) {
      // Ниже логика создания уникальных id и округления цены
      const newData = testData.map((row) => {
        return {
          ...row,
          //incomePrice: row.incomePrice?.toFixed(2),
          id: nanoid(10),
        };
      });
      console.log(newData);
      setSheetData2(newData);
    }

    // Ниже логика по изменению ключа/значения в нужный формат
    // const finalData = KeyValueStreamlineService.stremline(jsonData2);

    // // Ниже логика создания уникальных id и округления цены
    // const newData = items2.map((row) => {
    //   return {
    //     ...row,
    //     //incomePrice: row.incomePrice?.toFixed(2),
    //     id: nanoid(10),
    //   };
    // });
    // console.log(newData);
    // setSheetData2(newData);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = '';
    setSheetData([]);
    setSheetData2([]);
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);

    const value = CheckedService.handleCheckedFunc(name, checked, sheetData2);
    setSheetData2(value);
  };

  const hangleBarcode = (getusers) => {
    console.log(getusers);
    ctxDispatch({ type: 'BARCODE_ID', payload: getusers.id });
    ctxDispatch({ type: 'BARCODE_RHINOID', payload: getusers.rhinoID });
    localStorage.setItem('id', getusers.id);
    localStorage.setItem('rhinoID', getusers.rhinoID);
    navigate('/barcode');
    return <BarcodeGen id={getusers} />;
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      const res = await $api
        .post('/Catalog/get-parts-catalog', {
          parentId: '',
        })
        .then((res) => {
          const parts = res;
          console.log(parts.data);
          //setCategory(parts.data);
        });
      //ctxDispatch({type: 'USER_SIGNIN', payload: data});
      const token = localStorage.getItem('token');
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  const setCategory2 = () => {
    // const searchTerm = 'bumper';

    // if (catalogData) {
    //   setCategory(catalogData);
    // }

    console.log(searchCategory);
    console.log(category);

    const valu = document.getElementById(0).value;
    //e.preventDefault;
    console.log(valu);
    setSearchCategory1(valu);
    if (searchCategory1) {
      // let cityId = category.find(
      //   (category) => category.name === searchCategory
      // ).id;
      // console.log(cityId);

      // code to add
      // main logic of extracting all values from localized names in one array of names
      let allCategoriesObject = category.map(
        (category) => category.localizedName
      );
      console.log(allCategoriesObject);
      console.log(Object.keys(allCategoriesObject));
      const arrayofarray = Object.values(allCategoriesObject);

      console.log(Object.values(allCategoriesObject));
      const finalarr = arrayofarray.flat();
      console.log(finalarr);

      // first approach

      // let newVarFinished = [];
      // const newVar = category.splice(0, 1);
      // console.log(newVar);
      // newVarFinished = newVar.map((val) => val.localizedName);
      // console.log(newVarFinished);

      // получить все ключи
      //console.log(Object.keys(newVarFinished));

      // получить все значения
      //console.log(Object.values(newVarFinished));

      // const newVarnew = category.filter(function (part) {
      //   return part.localizedName == 'localizedName';
      // });

      // const newVarnew = newVar.filter(
      //   (val) => val.localizedName === localizedName
      // );
      //console.log(newVarnew);

      // const newVar2 = category.splice(1, 1);
      // console.log(newVar2);
      // const newvarnewnew = newVar2.map((val) => val.localizedName);
      // console.log(newvarnewnew);

      // let finalArray = [];
      // // finalArray = { ...newVarFinished, ...newvarnewnew };
      // finalArray.concat(newVarFinished);
      // console.log(finalArray);

      // здесь начинается кусок кода, который позволяет брать с инпута значение на любом языке
      const testCool = category.filter((i) =>
        i.localizedName.includes(searchCategory1)
      );
      console.log(testCool);
      let testCool2 = testCool.find(function (part) {
        return part.localizedName.includes(searchCategory1);
      });
      console.log(testCool2);
      let testCool3 = testCool2.localizedName;
      console.log(testCool3);
      // здесь заканчивается кусок кода, который позволяет брать с инпута значение на любом языке

      if (testCool3.includes('Двигатель')) {
        console.log('ok1');
        const correctData2 = category.filter(function (part) {
          return part.localizedName.includes(searchCategory1);
        });
        console.log(correctData2);

        const newData = sheetData2.map((row) => {
          //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
          return {
            ...row,
            catalogPart: {
              id: correctData2[0].id,
              Name: correctData2[0].name,
              Parents: correctData2[0].parents,
              LocalizedName: correctData2[0].localizedName,
            },
          };
        });
        console.log(newData);
        setSheetData2(newData);
      }
      if (testCool3.includes('Бампер')) {
        console.log('ok12');

        const correctData2 = category.filter(function (part) {
          return part.localizedName.includes(searchCategory1);
        });
        console.log(correctData2);

        const newData = sheetData2.map((row) => {
          //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
          return {
            ...row,
            catalogPart: {
              id: correctData2[0].id,
              Name: correctData2[0].name,
              Parents: correctData2[0].parents,
              LocalizedName: correctData2[0].localizedName,
            },
          };
        });
        console.log(newData);
        setSheetData2(newData);
      }
      if (testCool3.includes('Электрика')) {
        console.log('ok123');

        const correctData2 = category.filter(function (part) {
          return part.localizedName.includes(searchCategory);
        });
        console.log(correctData2);

        const newData = sheetData2.map((row) => {
          //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
          return {
            ...row,
            catalogPart: {
              id: correctData2[0].id,
              Name: correctData2[0].name,
              Parents: correctData2[0].parents,
              LocalizedName: correctData2[0].localizedName,
            },
          };
        });
        console.log(newData);
        setSheetData2(newData);
      }
      if (testCool3.includes('Трансмиссия')) {
        console.log('ok1234');

        const correctData2 = category.filter(function (part) {
          return part.localizedName.includes(searchCategory);
        });
        console.log(correctData2);

        const newData = sheetData2.map((row) => {
          //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
          return {
            ...row,
            catalogPart: {
              id: correctData2[0].id,
              Name: correctData2[0].name,
              Parents: correctData2[0].parents,
              LocalizedName: correctData2[0].localizedName,
            },
          };
        });
        console.log(newData);
        setSheetData2(newData);
      }

      if (testCool3.includes('Кузов')) {
        console.log('ok12345');

        const correctData2 = category.filter(function (part) {
          return part.localizedName.includes(searchCategory);
        });
        console.log(correctData2);

        const newData = sheetData2.map((row) => {
          //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
          return {
            ...row,
            catalogPart: {
              id: correctData2[0].id,
              Name: correctData2[0].name,
              Parents: correctData2[0].parents,
              LocalizedName: correctData2[0].localizedName,
            },
          };
        });
        console.log(newData);
        setSheetData2(newData);
      }
      console.log(inputVal);

      // // extracting of value from search category values
      // const tempvar = category.find(
      //   (category) => category.name === searchCategory
      // ).localizedName;
      // console.log(tempvar);

      // let value = tempvar.includes('Двигатель');
      // console.log(value);
      // if (tempvar.includes('Двигатель')) {
      //   console.log('ok');
      // }
      // if (tempvar.includes('Бампер')) {
      //   console.log('ok2');
      // }
      // if (tempvar.includes('Электрика')) {
      //   console.log('ok3');
      // }

      // const tempvarOther = category.find((category) =>
      //   category.localizedName.includes('Двигатель')
      // );
      // console.log(tempvarOther);

      // let res = finalarr.find((category) => category.indexOf(tempvar[0]));
      // let res2_1 = finalarr.indexOf(tempvar[0], tempvar[1], tempvar[2]);
      // console.log(res2_1); // logic here is working

      // console.log(res);
      // const tempvar2 = `${tempvar}`.toUpperCase();
      // console.log(tempvar2);
      // //console.log('алфавит'.toUpperCase()); // 'АЛФАВИТ'

      // let res2 = finalarr.indexOf('Двигатель', 'Бампер');
      // let res3 = finalarr.indexOf(tempvar.join(','));
      // const res3_1 = tempvar.join(" '' ");
      // console.log(res3_1);

      // let res4 = finalarr.indexOf(tempvar[0], tempvar[1]);
      // console.log(res4);

      // console.log(res2);
      // console.log(res3);

      //console.log(finalarr.find((val) => val.includes(tempvar)));
      // if (finalarr.(tempvar)) {
      //   console.log('yes');
      // }

      // let cityId = category.find(
      //   (category) => category.name === searchCategory
      // ).id;

      // for (const iterator of allCategories) {
      //   console.log(allCategories[0]);
      // }

      // let allCategories3 = [];
      // allCategories3 = allCategoriesObject[0].pop();
      // console.log(allCategories3);

      const allCategoriesArray = [];
      allCategoriesArray.concat(allCategoriesObject);
      console.log(allCategoriesArray);

      // for (let category of allCategories) {

      // }

      // let local = category.find(
      //   (category) => category.name === searchCategory
      // ).localizedName;
      // console.log(local);

      // const correctData = category.filter(function (part) {
      //   return part.name == searchCategory;
      // });
      // console.log(correctData);

      // const newData = sheetData2.map((row) => {
      //   //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
      //   return {
      //     ...row,
      //     catalogPart: {
      //       id: correctData[0].id,
      //       Name: correctData[0].name,
      //       Parents: correctData[0].parents,
      //       LocalizedName: correctData[0].localizedName,
      //     },
      //   };
      // });
      // console.log(newData);
      // const token = localStorage.getItem('token');
      // const newToken = token.replace(/['"«»]/g, '');
      // console.log(newToken);
      // setSheetData2(newData);
    }
  };

  const hangleInput = (e) => {
    const valu = document.getElementById(0).value;
    //e.preventDefault;
    console.log(valu);
    setSearchCategory1(valu);
  };

  const saveData4 = () => {
    const newData = SaveHelperService.save(category, sheetData2);
    let items = [];

    if (newData) {
      console.log(newData);
      SaveService.mainSave(newData);
    }

    const final = items.every(function (e) {
      return e === true;
    });
    console.log(final);

    if (final) {
      alert('Data succesfully saved');
    }
  };

  const saveData5 = () => {
    const items = SaveHelperService2.save(category, sheetData2);
    console.log(items);
    setSheetData2(items);

    if (items) {
      console.log(items);

      let items2 = [];
      const response = $api
        .post(
          `https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse`,
          {
            items,
          }
        )
        .then((res) => {
          console.log(res);
          const response = res.data;
          items2.push(res.data.success);
        });

      if (items2) {
        alert('Data succesfully saved');
      }
    }
  };

  const refresh = async () => {
    const token = localStorage.getItem('token');
    const newToken = token.replace(/['"«»]/g, '');

    const token2 = localStorage.getItem('refreshToken');
    const newToken2 = token2.replace(/['"«»]/g, '');
    const response2 = await $api
      .post(`/Users/refresh-token`, {
        token: newToken,
        refreshToken: newToken2,
        udid: 'test67',
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
      });
  };

  const handleParts = () => {
    navigate('/allparts');
  };

  console.log(sheetData2);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />

        <div className="app__other">
          <h1>Parse Excel</h1>
          {!fileName && (
            <div className="filename">Пожалуйста, загрузите файл.</div>
          )}
          {fileName && (
            <p>
              File name: <span className="filename">{fileName}</span>
            </p>
          )}
          <div className="row-rev">
            <div>
              <input
                className="filename"
                ref={fileRef}
                type="file"
                accept="xlsx, xls"
                multiple={false}
                onChange={(e) => handleFile(e)}
              />
            </div>

            <div>
              {fileName && (
                <i
                  className="now-ui-icon ui-1_simple-remove align-middle"
                  onClick={handleRemove}
                >
                  <div className="bg-gray   ">
                    <CloseButton />
                  </div>
                </i>
              )}
            </div>
          </div>
          {/* <input type="checkbox" onChange={hangleInput} /> */}

          {/* <Form onSubmit={submitHandler2}> */}
          {/* <div className="mb-3"> */}
          {/* <Button type="submit">Получить категорию</Button> */}
          {/* <Button className="mx-2" onClick={setCategory2} type="submit">
            Установить категорию
          </Button> */}
          {/* </div> */}
          {/* </Form> */}

          <div className="my-3">
            <button onClick={saveData5}>Сохранить</button>
          </div>

          <div className="my-3">
            <button onClick={handleParts}>Get Parts</button>
          </div>

          <Row>
            <Col md={12}>
              <Table bordered className="border">
                <thead className="text-primary table-header">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name="allselect"
                        placeholder="some"
                        checked={!sheetData2.some((row) => row.defect !== true)}
                        onChange={handleChecked}
                      />
                    </th>
                    <th>Авто</th>
                    <th>Наименование</th>
                    <th>НомерRhino</th>
                    <th>оригинальный номер</th>
                    <th>цена со склада</th>
                    <th>цена входящая</th>
                    <th>цена с амортизацией</th>
                    <th>дата завоза</th>
                    {/* <th>
                  категория
                </th> */}
                    <th>штрих код</th>

                    {/* {sheetData[0].map(h => <td>{h}</td>)} */}
                    {/* comented to check */}

                    {/* {columns.map(c => (
          // <div key={c}>{c}</div>
          <td key={c}>{c}</td>
        ))} */}

                    {/* {sheetData} */}
                    {/* {sheet.map(h => <td>{h}</td>)} */}
                  </tr>
                </thead>
                <tbody>
                  {sheetData2.map((getusers, index) => (
                    <tr key={index}>
                      <th>
                        {' '}
                        <input
                          type="checkbox"
                          name={getusers.id}
                          checked={getusers?.defect || false}
                          onChange={handleChecked}
                        />
                      </th>

                      {/* <th>
                    {' '}
                    <form>
                      <input
                        type="text"
                        id={index}
                        value={inputVal}
                        name={getusers.id}
                        // checked={getusers?.defect || false}
                        onChange={(e) => setInputVal(e.target.value)}
                      />
                    </form>
                  </th> */}

                      {/* <td>{ index+1} </td> */}

                      {/* <td>{getusers.Авто2} </td>
                  <td>{getusers.Наименование} </td>
                  <td>{getusers.номерRhino} </td>
                  <td>{getusers.оригинальныйномер}</td>
                  <td>{getusers.ценаCоCклада}</td>
                  <td>{getusers.ценаВходящая}</td>
                  <td>{getusers.ценаСамотизацией}</td>
                  <td>{getusers.ДатаЗавоза}</td> */}

                      <td>{getusers.vehicle} </td>
                      <td>{getusers.name} </td>
                      <td>{getusers.rhinoID} </td>
                      <td>{getusers.originalIDs}</td>
                      <td>{getusers.stockPrice}</td>
                      <td>{getusers.incomePrice}</td>
                      <td>{getusers.priceWithDepreciation}</td>
                      <td>{getusers.deliveryInfo}</td>
                      {/* <td>
                    <form>
                      <input
                        type="text"
                        id={index}
                        key={index}
                        value={
                          index == 0
                            ? inputVal
                            : inputVal4 || index == 1
                            ? inputVal2
                            : inputVal4 || index == 2
                            ? inputVal3
                            : inputVal4
                        }
                        name={getusers.id}
                        // checked={getusers?.defect || false}
                        onChange={(e) => {
                          if (index === 0) {
                            setInputVal(e.target.value);
                          }

                          if (index == 1) {
                            setInputVal2(e.target.value);
                          }

                          if (index == 2) {
                            setInputVal3(e.target.value);
                          }
                        }}
                      />
                    </form>
                  </td> */}

                      <td>
                        {getusers ? (
                          // Чтобы страница открывалась в новой вкладке в <Link> нужно установить опцию target="_blank"
                          // target="_blank"
                          <Link to="/barcode">
                            <button
                              onClick={(e) => hangleBarcode(getusers)}
                              className="btn btn-danger"
                            >
                              Barcode
                            </button>
                          </Link>
                        ) : (
                          <Link to="/barcode">
                            <button
                              onClick={(e) => hangleBarcode(getusers)}
                              className="btn btn-danger"
                            >
                              Barcode
                            </button>
                          </Link>
                        )}
                        {/* <div>
                      <BarcodeGen id={getusers.id} />
                    </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* <tbody className='table-body'> */}
                {/* <tr> */}
                {/* {sheetData.slice(1).map((row) => ( */}
                {/* <div key={c}>{c}</div> */}
                {/* <tr > */}
                {/* <th> <input type='checkbox'   onChange={handleChange}/> </th> */}
                {/* {row.map(c => <td>{c} </td> )} */}
                {/* </tr> */}
                {/* ))} */}

                {/* </tr> */}
                {/* </tbody> */}
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ParseExcel;
