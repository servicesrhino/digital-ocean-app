import React, { useState, useContext } from 'react';
import Barcode from 'react-barcode';
import { Store } from '../Store';
import { nanoid } from 'nanoid';

function BarcodeGen() {
  //const { id, name } = props;
  //console.log(id);
  //console.log(name);
  //const id = props.navigation.getParam('id');
  //console.log(id);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { id, rhinoID } = state;
  console.log(id);
  console.log(rhinoID);

  const newID = localStorage.getItem('id');
  const newRhinoID = localStorage.getItem('rhinoID');
  console.log(newID);
  console.log(newRhinoID);

  //const testid = nanoid(10); //=> "V1StGXR8_Z5jdHi6B-myT"
  //console.log(testid);

  const [text, setText] = useState(`${newRhinoID}_${newID}`);
  const [barcode, setBarcode] = useState(`${newRhinoID}_${newID}`);
  const generateBarcode = () => {
    //e.preventDefault();
    setBarcode(text);
  };
  return (
    <div>
      <span className="row text-center badges bg-success text-white mt-3">
        <h2>Barcode Generator</h2>
      </span>

      <div className="row mt-2 ">
        <input
          className="col-sm-6"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="col-sm-2 mx-2 btn btn-primary"
          onClick={generateBarcode}
        >
          Generate Barcode{' '}
        </button>
      </div>
      <div className="row mt-3">
        <Barcode value={barcode} />
      </div>
    </div>
  );
}

export default BarcodeGen;
