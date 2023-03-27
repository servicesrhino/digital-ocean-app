import React, { useState, useRef, useEffect, useContext } from 'react';
import { Row, Table, Col, Label, Form, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';
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

    const jsonData2 = await ParseService.parse(myFile);
    console.log(jsonData2);

    // Ниже логика по изменению ключа/значения в нужный формат
    const finalData = KeyValueStreamlineService.stremline(jsonData2);

    // Ниже логика создания уникальных id и округления цены
    const newData = finalData.map((row) => {
      return {
        ...row,
        incomePrice: row.incomePrice.toFixed(2),
        id: nanoid(10),
      };
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
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    console.log(name);
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

  return (
    <div>
      <h1>Parse Excel</h1>
      {!fileName && <div className="filename">Пожалуйста, загрузите файл.</div>}
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
                  <td>{getusers.originalID}</td>
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
  );
};

export default ParseExcel;
