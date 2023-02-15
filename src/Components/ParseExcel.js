import React, { useState } from 'react';

//import { read, readFile, utils, writeFile, XLSX } from 'xlsx';
//import XLSX from 'xlsx';
//import { read, writeFileXLSX } from "./xlsx.mjs";
//import * as XLSX from 'xlsx/xlsx.mjs';


import { read, utils, writeFileXLSX } from "xlsx";

// /* load the codepage support library for extended support with older formats  */
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
// set_cptable(cptable);

const ParseExcel = () => {

    const [fileName, setFileName] = useState(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        setFileName(file.name);

        const data = await file.arrayBuffer();
        const workbook = read(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = utils.sheet_to_json(worksheet)

        // e.stopPropagation(); e.preventDefault();
        // const f = e.dataTransfer.files[0];
        // /* f is a File */
        // const data = await f.arrayBuffer();
        // /* data is an ArrayBuffer */
        // const workbook = utils.sheet_to_json(data);

        console.log(jsonData);
    }
  return (
    <div>
      <h1>Parse Excel</h1>
      {fileName && (
        <p>
            File name: <span>{fileName}</span>
        </p>
      )}
      <input type="file" onChange={(e) => handleFile(e)} />
    </div>
  )
}

export default ParseExcel
