import React, { useState, useRef } from 'react';
import { Row, Table, Col, Label } from 'react-bootstrap';
import { read, utils, writeFileXLSX } from "xlsx";
import CloseButton from 'react-bootstrap/CloseButton';




// /* load the codepage support library for extended support with older formats  */
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
// set_cptable(cptable);

const ParseExcel = () => {

    const acceptableFileName = ["xlsx", "xls"];


    const [fileName, setFileName] = useState(null);
    const fileRef = useRef();

    const [allFile, setAllFile] = useState(null);
    const [other, setOther] = useState(null);

    const [sheetData, setSheetData] = useState([]);
    const [sheet, setSheet] = useState(null);

    const [columns, setColumns] = useState([]);
    const [body, setBody] = useState([]);

    const checkFileName = (name) => {
        return acceptableFileName.includes(name.split(".")[1]);
      }

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file ) return;

        if (!checkFileName(file.name)) {
            alert("Invalid File Type");
            return; 
          }

        setFileName(file.name);
        setAllFile(file);
        console.log(file);

        const data = await file.arrayBuffer();
        console.log(data);
        const workbook = read(data);
        setOther(workbook.Sheet);
        console.log(workbook.Sheet);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        console.log(worksheet);
        const jsonData = utils.sheet_to_json(worksheet, {
            blankrows: "",
            header: 1
        });

        setSheet(Object.keys(e)[0]);
        setSheetData(jsonData);

        setColumns(jsonData[0])
        setBody(jsonData.shift());

        // e.stopPropagation(); e.preventDefault();
        // const f = e.dataTransfer.files[0];
        // /* f is a File */
        // const data = await f.arrayBuffer();
        // /* data is an ArrayBuffer */
        // const workbook = utils.sheet_to_json(data);

        console.log(jsonData);
    }
    const handleRemove = () => {
        setFileName(null);
        fileRef.current.value = "";
      }

  return (
    <div>
      <h1>Parse Excel</h1>
      {!fileName && <div>Пожалуйста, загрузите файл</div>}
      {fileName && (
        <p>
            File name: <span className='filename'>{" "}{fileName}</span>
        </p>
      )}
      <input className='filename2'
       type="file" accept='xlsx, xls'
       multiple={false}
       ref={fileRef}
       onChange={(e) => handleFile(e)} />

      { fileName && 
      <i
      className='now-ui-icon ui-1_simple-remove align-middle'
      onClick={handleRemove}
      >
        <div className="bg-gray  p-2">
      <CloseButton variant="black" />
      {/* <CloseButton variant="white" disabled /> */}
    </div>
      </i>
      
      }
      <Row>
        <Col md={12}>
            <Table bordered className='border my-3'>
                <thead className='text-primary table-header'>
                    <tr>
                    {columns.map(c => (
                    // <div key={c}>{c}</div>
                    <td key={c}>{c}</td>
                         ))}
                    </tr>

                </thead>

                <tbody className='table-body'>
              {/* <tr> */}
              {sheetData.slice(1).map((row) => (
            // <div key={c}>{c}</div>
            <tr >
              {row.map(c => <td>{c} </td> )}
            </tr>
          ))}

              {/* </tr> */}
            </tbody>

            </Table>

        </Col>
      </Row>
    </div>
  )
}

export default ParseExcel
