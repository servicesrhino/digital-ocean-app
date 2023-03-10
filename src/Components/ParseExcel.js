import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Row,
  Table,
  Col,
  Label,
  Form,
  FormGroup,
  Button,
} from 'react-bootstrap';
import { read, utils, writeFileXLSX } from 'xlsx';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';
import $api from './http';
import { Store } from '../Store';
//import $api from '../http';

// /* load the codepage support library for extended support with older formats  */
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
// set_cptable(cptable);

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
  const [sheetData3, setSheetData3] = useState([]);

  const [sheet, setSheet] = useState(null);

  const [columns, setColumns] = useState([]);
  const [body, setBody] = useState([]);

  //const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCategory1, setSearchCategory1] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { category } = state;

  //   useEffect(() => {
  //     if (setSheetData2) {
  //       const newData = sheetData2.map((row) => {
  //         return { ...row, id: uuid() };
  //       });
  //       console.log(newData);
  //       setSheetData2(newData);
  //     }
  //   }, [setSheetData2]);

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split('.')[1]);
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert('Invalid File Type');
      return;
    }

    setFile(myFile);

    setFileName(myFile.name);
    setAllFile(myFile);
    console.log(myFile);

    const data = await myFile.arrayBuffer();
    console.log(data);
    const workbook = read(data);
    setOther(workbook.Sheet);
    console.log(workbook.Sheet);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log(worksheet);
    const jsonData = utils.sheet_to_json(worksheet, {
      blankrows: '',
      header: 1,
    });

    const jsonData2 = utils.sheet_to_json(worksheet);

    setSheet(Object.keys(e)[0]);
    setSheetData(jsonData);
    //setSheetData2(jsonData2);

    setColumns(jsonData[0]);
    setBody(jsonData.shift());

    // e.stopPropagation(); e.preventDefault();
    // const f = e.dataTransfer.files[0];
    // /* f is a File */
    // const data = await f.arrayBuffer();
    // /* data is an ArrayBuffer */
    // const workbook = utils.sheet_to_json(data);

    console.log(jsonData);
    console.log(jsonData2);

    const finalData = JSON.parse(
      JSON.stringify(jsonData2)
        .replaceAll('"????????"', '"vehicle"')
        .replaceAll('"????????????????????????"', '"name"')
        .replaceAll('"???????? ????????????????"', '"incomePrice"')
        .replaceAll('"???????? ???? ????????????"', '"stockPrice"')
        .replaceAll('"???????? ?? ??????????????????????"', '"priceWithDepreciation"')
        .replaceAll('"?????????? Rhino"', '"rhinoID"')
        .replaceAll('"???????????????????????? ??????????"', '"originalID"')
        .replaceAll('"???????? ????????????"', '"deliveryInfo"')
    );

    // ???????? ???????????? ???????????????? ???????????????????? id
    const newData = finalData.map((row) => {
      //return { ...row, someCategory, id: uuid() };
      return { ...row, id: uuid() };
    });
    console.log(newData);
    setSheetData2(newData);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = '';
    setSheetData([]);
    setSheetData2([]);

    setColumns([]);
  };

  const newFunc = () => {
    //const data = sheetData2
    // const newData = sheetData2.map((row) => {
    //   if (row.value === '?????????? Rhino') {
    //     row.value = row.??????????Rhino;
    //   }
    //   return { ...row };
    // });
    //console.log('newfunc ' + newData);

    // const newData = JSON.parse(
    //   JSON.stringify(sheetData2).replaceAll('"????????"', '"????????2"')
    // );

    // setSheetData2(newData);

    const newDat = sheetData2.map(function (obj) {
      return { auto: obj.????????, name: obj.???????????????????????? };
    });
    console.log(newDat);
  };

  //   const newFunc2 = () => {
  //     setSheetData2(
  //       JSON.parse(
  //         JSON.stringify(sheetData2)
  //           .replaceAll('"????????"', '"????????2"')
  //           .replaceAll('"???????? ????????????????"', '"????????????????????????"')
  //           .replaceAll('"???????? ???? ????????????"', '"????????C??C??????????"')
  //           .replaceAll('"???????? ?? ??????????????????????"', '"????????????????????????????????"')
  //           .replaceAll('"?????????? Rhino"', '"??????????Rhino"')
  //           .replaceAll('"???????????????????????? ??????????"', '"??????????????????????????????????"')
  //           .replaceAll('"???????? ????????????"', '"????????????????????"')
  //       )
  //     );
  //   };

  const newFunc2 = () => {
    setSheetData2(
      JSON.parse(
        JSON.stringify(sheetData2)
          .replaceAll('"????????"', '"vehicle"')
          .replaceAll('"????????????????????????"', '"name"')
          .replaceAll('"???????? ????????????????"', '"incomePrice"')
          .replaceAll('"???????? ???? ????????????"', '"stockPrice"')
          .replaceAll('"???????? ?? ??????????????????????"', '"priceWithDepreciation"')
          .replaceAll('"?????????? Rhino"', '"rhinoID"')
          .replaceAll('"???????????????????????? ??????????"', '"originalID"')
          .replaceAll('"???????? ????????????"', '"deliveryInfo"')
      )
    );
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    //uniqueId()
    //alert('hello selected');
    console.log(name);
    if (name === 'allselect') {
      const checkedValue = sheetData2.map((row) => {
        return { ...row, defect: true };
      });
      console.log(checkedValue);
      setSheetData2(checkedValue);
    } else {
      console.log(name);
      const checkedValue = sheetData2.map((row) =>
        row.id === name
          ? { ...row, defect: checked }
          : { ...row, defect: false }
      );
      console.log(checkedValue);
      setSheetData2(checkedValue);
    }
  };

  const handleChangeInputCategory = (e) => {};

  const handleCategory = () => {
    const someCategory = 'car';
    //console.log(category)
    const newData = sheetData2.map((row) => {
      //return { ...row, someCategory, id: uuid() };
      return { ...row, id: uuid() };
    });
    console.log(newData);
    setSheetData2(newData);
  };

  const uniqueId = () => {
    const newData = sheetData2.map((row) => {
      return { ...row, id: uuid() };
    });
    console.log(newData);
    setSheetData2(newData);
  };

  const hangleBarcode = () => {
    //alert('barcode clik');
    navigate('/barcode');
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      const res = await $api
        .post(
          '/Catalog/get-parts-catalog',
          {
            //phone,
            //password,
            //udid: 'test',
            parentId: '',
          }
          //   {
          //     headers: {
          //       Authorization:
          //         'Bearer ' +
          //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0MDFmZWI3NDcxMzIwNDIwNjA2YTU2ZCIsInJvbGUiOiJVc2VyIiwianRpIjoiMjQyYjRhMTUtM2FiMS00NTc4LThhY2EtNzBkZTlhYzBiNjk2IiwiaWQiOiI2NDAxZmViNzQ3MTMyMDQyMDYwNmE1NmQiLCJuYmYiOjE2Nzc5NjMzNTQsImV4cCI6MTY3Nzk2MzY1NCwiaWF0IjoxNjc3OTYzMzU0fQ.L6-XANKSu8nLoEAUQVKHbbyGDH6DKGb_ZZdjh_wyvoI',
          //     },
          //   }
        )
        .then((res) => {
          const parts = res;
          console.log(parts.data);
          //setCategory(parts.data);
        });
      //console.log(category);
      //ctxDispatch({type: 'USER_SIGNIN', payload: data});
      const token = localStorage.getItem('token');
      //navigate('/parse-excel');
      console.log(token);

      //console.table(data);
      //console.log(data[0].id);

      //   for (var value of data) {
      //     console.log(value);
      //   }

      // const result = data.map((item) => ({ id: item.id }));
      // console.log(result);
      //   data.forEach((element) => {
      //     console.log(element);
      //   });
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

    // ???????????????? ?????? ??????????
    //console.log(Object.keys(newVarFinished));

    // ???????????????? ?????? ????????????????
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

    // ?????????? ???????????????????? ?????????? ????????, ?????????????? ?????????????????? ?????????? ?? ???????????? ???????????????? ???? ?????????? ??????????
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
    // ?????????? ?????????????????????????? ?????????? ????????, ?????????????? ?????????????????? ?????????? ?? ???????????? ???????????????? ???? ?????????? ??????????

    if (testCool3.includes('??????????????????')) {
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
    if (testCool3.includes('????????????')) {
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
    if (testCool3.includes('??????????????????')) {
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
    if (testCool3.includes('??????????????????????')) {
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

    if (testCool3.includes('??????????')) {
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

    // let value = tempvar.includes('??????????????????');
    // console.log(value);
    // if (tempvar.includes('??????????????????')) {
    //   console.log('ok');
    // }
    // if (tempvar.includes('????????????')) {
    //   console.log('ok2');
    // }
    // if (tempvar.includes('??????????????????')) {
    //   console.log('ok3');
    // }

    // const tempvarOther = category.find((category) =>
    //   category.localizedName.includes('??????????????????')
    // );
    // console.log(tempvarOther);

    // let res = finalarr.find((category) => category.indexOf(tempvar[0]));
    // let res2_1 = finalarr.indexOf(tempvar[0], tempvar[1], tempvar[2]);
    // console.log(res2_1); // logic here is working

    // console.log(res);
    // const tempvar2 = `${tempvar}`.toUpperCase();
    // console.log(tempvar2);
    // //console.log('??????????????'.toUpperCase()); // '??????????????'

    // let res2 = finalarr.indexOf('??????????????????', '????????????');
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
    // const newToken = token.replace(/['"????]/g, '');
    // console.log(newToken);
    // setSheetData2(newData);
  };

  const hangleInput = (e) => {
    const valu = document.getElementById(0).value;
    //e.preventDefault;
    console.log(valu);
    setSearchCategory1(valu);
    if (searchCategory1) {
    }

    const newPhield = document.createElement('input');
    newPhield.type = 'text';
    //newPhield.setAttribute('name', )
  };

  const saveData = async () => {
    console.log(sheetData2);
    const response = await $api
      .post(
        `https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse`,
        {
          items: [
            //{
            //sheetData2,

            //   id: sheetData2[0].id,
            //   vehicle: sheetData2[0].vehicle,
            //   name: sheetData2[0].name,
            //   rhinoID: sheetData2[0].rhinoID,
            //   originalID: sheetData2[0].originalID,
            //   stockPrice: sheetData2[0].stockPrice,
            //   incomePrice: sheetData2[0].incomePrice,
            //   priceWithDepreciation: sheetData2[0].priceWithDepreciation,
            //   deliveryInfo: sheetData2[0].deliveryInfo,
            //   defect: sheetData2[0].defect,
            //   catalogPart: {
            //     id: sheetData2[0].catalogParts.id2,
            //     Name: sheetData2[0].catalogParts.Name,
            //     Parents: sheetData2[0].catalogParts.Parents,
            //     LocalizedName: sheetData2[0].catalogParts.LocalizedName,
            {
              id: sheetData2[0].id,
              vehicle: sheetData2[0].vehicle,
              name: sheetData2[0].name,
              rhinoID: sheetData2[0].rhinoID,
              originalID: `${sheetData2[0].originalID}`,
              stockPrice: sheetData2[0].stockPrice,
              incomePrice: sheetData2[0].incomePrice,
              priceWithDepreciation: sheetData2[0].priceWithDepreciation,
              deliveryInfo: sheetData2[0].deliveryInfo,
              defect: sheetData2[0].defect,
              catalogPart: {
                id: sheetData2[0].catalogPart.id,
                Name: sheetData2[0].catalogPart.Name,
                Parents: sheetData2[0].catalogPart.Parents,
                LocalizedName: sheetData2[0].catalogPart.LocalizedName,
              },
            },
          ],
          // id: sheetData2.id,
          // vehicle: sheetData2.vehicle,
          // name: sheetData2.name,
          // rhinoID: sheetData2.rhinoID,
          // originalID: sheetData2.originalID,
          // stockPrice: sheetData2.stockPrice,
          // incomePrice: sheetData2.incomePrice,
          // priceWithDepreciation: sheetData2.priceWithDepreciation,
          // deliveryInfo: sheetData2.deliveryInfo,
          // defect: sheetData2.defect,
          // catalogPart: {
          //   id: sheetData2.catalogParts.id2,
          //   Name: sheetData2.catalogParts.Name,
          //   Parents: sheetData2.catalogParts.Parents,
          //   LocalizedName: sheetData2.catalogParts.LocalizedName,
          // },
        }
      )
      .then((res) => console.log(res.data));
  };
  const saveData3 = () => {
    console.log(sheetData2);

    const model = {
      items: [
        {
          id: sheetData2.map((row) => row.id),
          vehicle: sheetData2.map((row) => row.vehicle),
          name: sheetData2.map((row) => row.name),
          rhinoID: sheetData2.map((row) => row.rhinoID),
          originalID: sheetData2.map((row) => row.originalID),
          stockPrice: sheetData2.map((row) => row.stockPrice),
          incomePrice: sheetData2.map((row) => row.incomePrice),
          priceWithDepreciation: sheetData2.map(
            (row) => row.priceWithDepreciation
          ),
          deliveryInfo: sheetData2.map((row) => row.deliveryInfo),
          defect: sheetData2.map((row) => row.defect),
          catalogPart: {
            id: sheetData2.map((row) => row.catalogPart.id),
            Name: sheetData2.map((row) => row.catalogPart.Name),
            Parents: sheetData2.map((row) => row.catalogPart.Parents),
            LocalizedName: sheetData2.map(
              (row) => row.catalogPart.LocalizedName
            ),
          },
        },
      ],
    };
    console.log(model);

    // const sendData = () => {
    //   for (let index = 0; index < sheetData2.length; index++) {
    //     const element = sheetData2[index];
    //     console.log(sheetData2[index]);

    //     if (index) {
    //       items: [
    //         {
    //           id: sheetData2[0].id,
    //           vehicle: sheetData2[0].vehicle,
    //           name: sheetData2[0].name,
    //           rhinoID: sheetData2[0].rhinoID,
    //           originalID: `${sheetData2[0].originalID}`,
    //           stockPrice: sheetData2[0].stockPrice,
    //           incomePrice: sheetData2[0].incomePrice,
    //           priceWithDepreciation: sheetData2[0].priceWithDepreciation,
    //           deliveryInfo: sheetData2[0].deliveryInfo,
    //           defect: sheetData2[0].defect,
    //           catalogPart: {
    //             id: sheetData2[0].catalogPart.id,
    //             Name: sheetData2[0].catalogPart.Name,
    //             Parents: sheetData2[0].catalogPart.Parents,
    //             LocalizedName: sheetData2[0].catalogPart.LocalizedName,
    //           },
    //         },
    //       ];
    //     }
    //   }
    // };

    const finalModel = {
      items: [{ vahicle: 'some' }],
    };

    console
      .log
      //   Object.assign(
      //     ...model.items.id.map(
      //       (n, i) => (
      //         { [n]: model.items.vehicle[i] }, { [n]: model.items.name[i] }
      //       )
      //     )
      //   )
      ();
    //return model;
  };

  const saveData4 = () => {
    let items = [];
    for (let index = 0; index < sheetData2.length; index++) {
      const element = [];
      element.push(sheetData2[index]);
      console.log(element);

      console.log(sheetData2[index]);

      let items = [];

      const response = $api
        .post(
          `https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse`,
          {
            items: [
              {
                id: sheetData2[index].id,
                vehicle: sheetData2[index].vehicle,
                name: sheetData2[index].name,
                rhinoID: sheetData2[index].rhinoID,
                originalID: `${sheetData2[index].originalID}`,
                stockPrice: sheetData2[index].stockPrice,
                incomePrice: sheetData2[index].incomePrice,
                priceWithDepreciation: sheetData2[index].priceWithDepreciation,
                deliveryInfo: sheetData2[index].deliveryInfo,
                defect: sheetData2[index].defect,
                catalogPart: {
                  id: sheetData2[index].catalogPart.id,
                  Name: sheetData2[index].catalogPart.Name,
                  Parents: sheetData2[index].catalogPart.Parents,
                  LocalizedName: sheetData2[index].catalogPart.LocalizedName,
                },
              },
            ],
          }
        )
        .then((res) => console.log(res.data));

      if (index) {
        const newArr = {
          id: sheetData2[0].id,
          vehicle: sheetData2[0].vehicle,
          name: sheetData2[0].name,
          rhinoID: sheetData2[0].rhinoID,
          originalID: `${sheetData2[0].originalID}`,
          stockPrice: sheetData2[0].stockPrice,
          incomePrice: sheetData2[0].incomePrice,
          priceWithDepreciation: sheetData2[0].priceWithDepreciation,
          deliveryInfo: sheetData2[0].deliveryInfo,
          defect: sheetData2[0].defect,
          catalogPart: {
            id: sheetData2[0].catalogPart.id,
            Name: sheetData2[0].catalogPart.Name,
            Parents: sheetData2[0].catalogPart.Parents,
            LocalizedName: sheetData2[0].catalogPart.LocalizedName,
          },
        };
        console.log(newArr);
      }
    }
  };

  const saveData2 = async () => {
    console.log(sheetData2);

    const sheetDataFinal = sheetData2.map((row) => {
      return { ...row, originalID: `${row.originalID}` };
    });

    // for (let i = 0; i < sheetDataFinal.length; i++) {
    //   text += cars[i] + '<br>';
    // }
    const response = await $api
      .post(
        `https://rhino-api-alquo.ondigitalocean.app/Parts/add-to-warehouse`,
        {
          items: [
            //{

            // {
            //   sheetDataFinal,
            // },

            //   id: sheetData2[0].id,
            //   vehicle: sheetData2[0].vehicle,
            //   name: sheetData2[0].name,
            //   rhinoID: sheetData2[0].rhinoID,
            //   originalID: sheetData2[0].originalID,
            //   stockPrice: sheetData2[0].stockPrice,
            //   incomePrice: sheetData2[0].incomePrice,
            //   priceWithDepreciation: sheetData2[0].priceWithDepreciation,
            //   deliveryInfo: sheetData2[0].deliveryInfo,
            //   defect: sheetData2[0].defect,
            //   catalogPart: {
            //     id: sheetData2[0].catalogParts.id2,
            //     Name: sheetData2[0].catalogParts.Name,
            //     Parents: sheetData2[0].catalogParts.Parents,
            //     LocalizedName: sheetData2[0].catalogParts.LocalizedName,
            {
              //sheetData2,
              id: sheetData2.map((row) => row.id)[0],
              vehicle: sheetData2.map((row, index) => {
                return row.vehicle;
              }),
            },
            //   id: sheetData2[0].id,
            //   vehicle: sheetData2[0].vehicle,
            //   name: sheetData2[0].name,
            //   rhinoID: sheetData2[0].rhinoID,
            //originalID: '51117307993',
            //   stockPrice: sheetData2[0].stockPrice,
            //   incomePrice: sheetData2[0].incomePrice,
            //   priceWithDepreciation: sheetData2[0].priceWithDepreciation,
            //   deliveryInfo: sheetData2[0].deliveryInfo,
            //   defect: sheetData2[0].defect,
            //   catalogPart: {
            //     id: sheetData2[0].catalogParts.id2,
            //     Name: sheetData2[0].catalogParts.Name,
            //     Parents: sheetData2[0].catalogParts.Parents,
            //     LocalizedName: sheetData2[0].catalogParts.LocalizedName,
            //   },
          ],
        }
      )
      .then((res) => console.log(res.data));
  };

  const refresh = async () => {
    const token = localStorage.getItem('token');
    const newToken = token.replace(/['"????]/g, '');

    const token2 = localStorage.getItem('refreshToken');
    const newToken2 = token2.replace(/['"????]/g, '');
    const response2 = await $api
      .post(`/Users/refresh-token`, {
        token: newToken,
        //password,
        refreshToken: newToken2,
        udid: 'test67',
        //parentId: '',
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
      });
  };
  return (
    // <div>
    //   <h1>Parse Excel</h1>
    //   {!fileName && <div>????????????????????, ?????????????????? ????????</div>}
    //   {fileName && (
    //     <p>
    //         File name: <span className='filename'>{" "}{fileName}</span>
    //     </p>
    //   )}
    //   <input className='filename2'
    //    type="file" accept='xlsx, xls'
    //    multiple={false}
    //    ref={fileRef}
    //    onChange={(e) => handleFile(e)} />

    //   { fileName &&
    //   <i
    //   className='now-ui-icon ui-1_simple-remove align-middle'
    //   onClick={handleRemove}
    //   >
    //     <div className="bg-gray  p-2">
    //   <CloseButton variant="black" />
    //   {/* <CloseButton variant="white" disabled /> */}
    // </div>
    //   </i>

    //   }
    //   <Row>
    //     <Col md={12}>
    //         <Table bordered className='border my-3'>
    //             <thead className='text-primary table-header'>
    //                 <tr>
    //                 {columns.map(c => (
    //                 // <div key={c}>{c}</div>
    //                 <td key={c}>{c}</td>
    //                      ))}
    //                 </tr>

    //             </thead>

    //             <tbody className='table-body'>
    //           {/* <tr> */}
    //           {sheetData.slice(1).map((row) => (
    //         // <div key={c}>{c}</div>
    //         <tr >
    //           {row.map(c => <td>{c} </td> )}
    //         </tr>
    //       ))}

    //           {/* </tr> */}
    //         </tbody>

    //         </Table>

    //     </Col>
    //   </Row>
    // </div>

    <div>
      <h1>Parse Excel</h1>
      {!fileName && <div className="filename">????????????????????, ?????????????????? ????????.</div>}
      {fileName && (
        <p>
          File name: <span className="filename">{fileName}</span>
        </p>
      )}

      {other}
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
                {/* <CloseButton variant="white" disabled /> */}
              </div>
            </i>
          )}
        </div>
      </div>
      {/* <div className="my-3">
        <button onClick={newFunc2}>???????????????????? ????????????</button>
      </div> */}

      <input type="checkbox" onChange={handleCategory} />
      <input type="checkbox" onChange={hangleInput} />
      {/* <input type="checkbox" onChange={newFunc2} /> */}

      <input type="checkbox" onChange={refresh} />

      <Form onSubmit={submitHandler2}>
        <FormGroup className="mb-3" controlId="searchCategory">
          <Form.Label>??????????????????</Form.Label>
          <Form.Control
            type="searchCategory"
            //required
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </FormGroup>

        <div className="mb-3">
          <Button type="submit">???????????????? ??????????????????</Button>
          <Button className="mx-2" onClick={setCategory2} type="submit">
            ???????????????????? ??????????????????
          </Button>
        </div>
      </Form>

      <div>
        <button onClick={saveData4}>??????????????????</button>
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
                    onChange={handleChange}
                  />
                </th>

                <th>????????</th>
                <th>????????????????????????</th>
                <th>??????????Rhino</th>
                <th>???????????????????????? ??????????</th>
                <th>???????? ???? ????????????</th>
                <th>???????? ????????????????</th>
                <th>???????? ?? ????????????????????????</th>
                <th>???????? ????????????</th>
                <th>
                  {/* <input
                    type="search"
                    name="allselect"
                    placeholder="some"
                    checked={!sheetData2.some((row) => row.defect !== true)}
                    onChange={handleChange}
                  /> */}
                  ??????????????????
                </th>
                <th>?????????? ??????</th>

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
                      onChange={handleChange}
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

                  {/* <td>{getusers.????????2} </td>
                  <td>{getusers.????????????????????????} </td>
                  <td>{getusers.??????????Rhino} </td>
                  <td>{getusers.??????????????????????????????????}</td>
                  <td>{getusers.????????C??C??????????}</td>
                  <td>{getusers.????????????????????????}</td>
                  <td>{getusers.????????????????????????????????}</td>
                  <td>{getusers.????????????????????}</td> */}

                  <td>{getusers.vehicle} </td>
                  <td>{getusers.name} </td>
                  <td>{getusers.rhinoID} </td>
                  <td>{getusers.originalID}</td>
                  <td>{getusers.stockPrice}</td>
                  <td>{getusers.incomePrice}</td>
                  <td>{getusers.priceWithDepreciation}</td>
                  <td>{getusers.deliveryInfo}</td>
                  <td>
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
                  </td>

                  <td>
                    <button onClick={hangleBarcode} className="btn btn-danger">
                      Barcode
                    </button>
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
  );
};

export default ParseExcel;
