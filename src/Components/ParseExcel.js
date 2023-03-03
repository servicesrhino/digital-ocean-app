import React, { useState, useRef, useEffect } from 'react';
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

  const [sheetData, setSheetData] = useState([]);
  const [sheetData2, setSheetData2] = useState([]);
  const [sheetData3, setSheetData3] = useState([]);

  const [sheet, setSheet] = useState(null);

  const [columns, setColumns] = useState([]);
  const [body, setBody] = useState([]);

  const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');

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
    setSheetData2(jsonData2);

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
    //   if (row.value === 'Номер Rhino') {
    //     row.value = row.номерRhino;
    //   }
    //   return { ...row };
    // });
    //console.log('newfunc ' + newData);

    // const newData = JSON.parse(
    //   JSON.stringify(sheetData2).replaceAll('"Авто"', '"Авто2"')
    // );

    // setSheetData2(newData);

    const newDat = sheetData2.map(function (obj) {
      return { auto: obj.Авто, name: obj.Наименование };
    });
    console.log(newDat);
  };

  const newFunc2 = () => {
    setSheetData2(
      JSON.parse(
        JSON.stringify(sheetData2)
          .replaceAll('"Авто"', '"Авто2"')
          .replaceAll('"цена входящая"', '"ценаВходящая"')
          .replaceAll('"цена со склада"', '"ценаCоCклада"')
          .replaceAll('"цена с амотизацией"', '"ценаСамотизацией"')
          .replaceAll('"номер Rhino"', '"номерRhino"')
          .replaceAll('"оригинальный номер"', '"оригинальныйномер"')
          .replaceAll('"Дата завоза"', '"ДатаЗавоза"')
      )
    );
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    //uniqueId()
    alert('hello selected');
    console.log(name);
    if (name === 'allselect') {
      const checkedValue = sheetData2.map((row) => {
        return { ...row, reject: true };
      });
      console.log(checkedValue);
      setSheetData2(checkedValue);
    } else {
      console.log(name);
      const checkedValue = sheetData2.map((row) =>
        row.id === name ? { ...row, reject: checked } : row
      );
      console.log(checkedValue);
      setSheetData2(checkedValue);
    }
  };

  const handleCategory = () => {
    const someCategory = 'car';
    //console.log(category)
    const newData = sheetData2.map((row) => {
      return { ...row, someCategory, id: uuid() };
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
      const { data } = await axios
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/Catalog/get-parts-catalog',
          {
            //phone,
            //password,
            //udid: 'test',
            parentId: '',
          },
          {
            headers: {
              Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0MDFmZWI3NDcxMzIwNDIwNjA2YTU2ZCIsInJvbGUiOiJVc2VyIiwianRpIjoiMzhiNWI1MmYtMmNiNC00ZmE3LTk0OGEtNDFhODhjNmM2ZmYzIiwiaWQiOiI2NDAxZmViNzQ3MTMyMDQyMDYwNmE1NmQiLCJuYmYiOjE2Nzc4NjI0NzYsImV4cCI6MTY3Nzg2Mjc3NiwiaWF0IjoxNjc3ODYyNDc2fQ.owfZ6MttNnrrDd2FffLUBC-ToeGuoFHKgdssyJpUUNA',
            },
          }
        )
        .then((res) => {
          const persons = res.data;
          console.log(persons);
          setCategory(persons);
        });
      //console.log(category);
      //ctxDispatch({type: 'USER_SIGNIN', payload: data});
      const token = localStorage.getItem('token', JSON.stringify(token));
      //navigate('/parse-excel');
      console.log(token);

      console.table(data);
      console.log(data[0].id);

      for (var value of data) {
        console.log(value);
      }

      // const result = data.map((item) => ({ id: item.id }));
      // console.log(result);
      //   data.forEach((element) => {
      //     console.log(element);
      //   });
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  const setCategory2 = () => {
    const searchTerm = 'bumper';
    console.log(searchCategory);
    console.log(category);
    let cityId = category.find(
      (category) => category.name === searchCategory
    ).id;
    console.log(cityId);

    const correctData = category.filter(function (part) {
      return part.name == searchCategory;
    });
    console.log(correctData);

    const newData = sheetData2.map((row) => {
      //return { ...row, catalogParts: { id2: cityId, Name: searchCategory } };
      return {
        ...row,
        catalogParts: {
          id2: correctData[0].id,
          Name: correctData[0].name,
          Parents: correctData[0].parents,
          LocalizedName: correctData[0].localizedName,
        },
      };
    });
    console.log(newData);
    setSheetData2(newData);
  };

  return (
    // <div>
    //   <h1>Parse Excel</h1>
    //   {!fileName && <div>Пожалуйста, загрузите файл</div>}
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
      {!fileName && <div className="filename">Пожалуйста, загрузите файл.</div>}
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

      <input type="checkbox" onChange={handleCategory} />
      <input type="checkbox" onChange={newFunc} />
      <input type="checkbox" onChange={newFunc2} />

      <input type="checkbox" onChange={setCategory2} />

      <Form onSubmit={submitHandler2}>
        <FormGroup className="mb-3" controlId="searchCategory">
          <Form.Label>Категория</Form.Label>
          <Form.Control
            type="searchCategory"
            required
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </FormGroup>

        <div className="mb-3">
          <Button type="submit">Получить категорию</Button>
          <Button className="mx-2" onClick={setCategory2} type="submit">
            Установить категорию
          </Button>
        </div>
      </Form>

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
                    checked={!sheetData2.some((row) => row.reject !== true)}
                    onChange={handleChange}
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
                      checked={getusers?.reject || false}
                      onChange={handleChange}
                    />
                  </th>
                  {/* <td>{ index+1} </td> */}
                  <td>{getusers.Авто2} </td>
                  <td>{getusers.Наименование} </td>
                  <td>{getusers.номерRhino} </td>
                  <td>{getusers.оригинальныйномер}</td>

                  <td>{getusers.ценаCоCклада}</td>
                  <td>{getusers.ценаВходящая}</td>
                  <td>{getusers.ценаСамотизацией}</td>
                  <td>{getusers.ДатаЗавоза}</td>

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
