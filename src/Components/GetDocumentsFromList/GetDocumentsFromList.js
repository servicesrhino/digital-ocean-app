import React, { useState, useContext, useEffect } from 'react';
import './GetDocumentsFromList.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import $api from '../http';
import { usePrintableTable } from '../../hooks/usePrintableTable';
import DataTable from '../dataTable/DataTable';
// import { GridToolbar } from '@mui/x-data-grid';
import TableBootstrap from '../tableBootstrap/TableBootstrap';
import { Box } from '@mui/material';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey(
  '098919564072b5983286dc144fb661a0Tz0xMjgzNzcsRT0xODA4MDkyNzk5MDAwLFM9cHJvLExNPWFubnVhbCxQVj1RMS0yMDI2LFE9MSxBVD1zaW5nbGUsS1Y9Mg=='
);

function GetDocumentsFromList() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [name, setName] = useState([]);

  const tes2 =
    'https://docs.google.com/spreadsheets/d/1_j-WNAwx21E6XFeE2gs62eH5P2YdYASQmouMaR7dvmM';
  const tes3 = '2020';

  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;

  const [done, setDone] = useState(undefined);

  const { handleChecked, barcodeNew, newPrintFunc2, togle, printAll } =
    usePrintableTable({
      data,
      setData,
      printerUrl: userInfo.printerUrl,
      documentId: tes2,
    });

  const actionColumn = {
    field: 'action',
    headerName: 'Barcode',
    width: 90,
    renderCell: (params) => {
      return (
        <div
        // className={`action btn btn-danger${
        //   params.row.printed ? 'styled' : 'btn btn-danger'
        // }`}
        >
          <button
            name={params.row.id}
            checked={params.row.printed || false}
            onChange={handleChecked}
            onClick={(e) => {
              barcodeNew(e, params.row);
              // newPrintFunc2(e, params.row);
              togle(e, params.row);
            }}
            className={`size btn btn-danger${
              params.row.printed ? 'styled' : 'btn btn-danger'
            }`}
          >
            Barcode
          </button>
        </div>
      );
    },
  };

  const actionColumn2 = {
    field: 'action2',
    headerName: 'Відмінити',
    align: 'center',
    width: 70,
    renderCell: (params) => {
      return (
        <div>
          <button
            className=" check size btn btn-primary"
            // type="checkbox"
            name={params.row.id}
            checked={params.row.printed || false}
            onClick={handleChecked}
          >
            unclick
          </button>

          {/* <input
            type="checkbox"
            name={params.row.id}
            checked={params.row.printed || false}
            onClick={handleChecked}
          /> */}
        </div>
      );
    },
  };

  const columns = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      width: 160,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={` size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.vehicle}
          </div>
        );
      },
    },

    {
      field: 'name',
      headerName: 'Назва',
      width: 210,
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              // boxShadow: 2,
              // border: 2,
              // width: '100%',
              // height: 50,
              borderColor: 'primary.light',
              '& .MuiDataGrid-row': {
                color: 'primary.main',
              },
            }}
          >
            <div className={`size ${params.row.printed ? 'styled' : ''}`}>
              {params.row.name}
            </div>
          </Box>
        );
      },
    },
    {
      field: 'rhinoID',
      headerName: 'Ріно ID',
      width: 100,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.rhinoID}
          </div>
        );
      },
    },

    {
      field: 'stockPrice',
      headerName: 'Цена со склада',
      width: 90,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.stockPrice}
          </div>
        );
      },
    },
    {
      field: 'incomePrice',
      headerName: 'Цена входящая',
      width: 90,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.incomePrice}
          </div>
        );
      },
    },

    {
      field: 'priceWithDepreciation',
      headerName: 'Цена с амортизацией',
      width: 90,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.priceWithDepreciation}
          </div>
        );
      },
    },

    {
      field: 'barCodePrintQnt',
      headerName: 'Кількість',
      width: 60,
      editable: false,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.barCodePrintQnt}
          </div>
        );
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.id}
          </div>
        );
      },
    },

    {
      field: 'defect',
      headerName: 'Дефекти',
      // type: 'number',
      width: 60,
      // editable: true,
      renderCell: (params) => {
        return <div>{params.row.defect}</div>;
      },
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const getDocumentsFromList = async () => {
    try {
      const { data: rows } = await $api.post(
        '/GoogleSheet/get-documents-fromlist',
        {
          documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
          sheetId: '2020',
        }
      );
      setData(rows);
      setData2(rows);
    } catch (error) {
      toast.error('Не вдалося отримати дані з листа');
    } finally {
      setDone(true);
    }
  };
  useEffect(() => {
    getDocumentsFromList();
  }, []);

  // useEffect(() => {
  //   filtration();
  // }, [vehicle]);

  const filtration = (e) => {
    e.preventDefault();
    console.log(vehicle.length);
    let res = [];
    // console.log(
    //   data.filter((item) => {
    //     console.log(item.vehicle.toLowerCase());
    //     if (item.vehicle === vehicle) {
    //       res.push(item);
    //     }
    //     return item.vehicle === vehicle;
    //   })
    // );
    const oldData = [...data];
    console.log(oldData);
    console.log(
      data.filter((item) => {
        console.log(item.vehicle.toLowerCase());
        if (item.vehicle.toLowerCase().includes(vehicle.toLowerCase())) {
          res.push(item);
        }
        return item.vehicle === vehicle;
      })
    );
    console.log(data2);
    if (res) {
      setData(res);
    } else if (vehicle.length === 0) {
      res = [];
      setData(data2);
    }
    if (!vehicle) {
      getDocumentsFromList();
    }

    console.log(vehicle.length);
    console.log(res);

    // console.log(
    //   data.map((item) =>
    //     item.map((item2) => (item2.startsWith(vehicle) ? item : '123'))
    //   )
    // );

    console.log(
      data
        .map((item) => item.vehicle)
        .filter((item2) =>
          item2.toLowerCase().startsWith(vehicle.toLowerCase())
        )
    );
  };

  const filtration2 = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(name.length);
    let res2 = [];

    console.log(
      data.filter((item) => {
        console.log(item.name.toLowerCase());
        if (item.name.toLowerCase().includes(name.toLowerCase())) {
          res2.push(item);
        }
        //return res2;
      })
    );
    console.log(res2);
    if (res2) {
      setData(res2);
    }
    if (!name) {
      getDocumentsFromList();
    }
  };
  if (!done) {
    return (
      <ReactLoading
        className="flex justify-content-center align-items-center"
        type="bars"
        color="green"
        height={200}
        width={200}
      />
    );
  }

  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати дані з листа</h1>
          <div className="mb-3">
            <Button type="printAll" onClick={printAll}>
              Надрукувати все
            </Button>
            <div className="d-flex">
              {/* <form onSubmit={filtration}>
                <input
                  id="vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="mt-2"
                />
              </form> */}

              {/* <form onSubmit={filtration2}>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" mt-2 mx-2 "
                />
              </form> */}
            </div>
          </div>
          <div>
            <DataGridPro
              className="dataGrid"
              rows={data}
              columns={[...columns, actionColumn, actionColumn2]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              pageSizeOptions={[5]}
              // checkboxSelection
              disableRowSelectionOnClick
              // disableColumnFilter
              disableDensitySelector
              disableColumnSelector
            />
            {/* <DataTable rows={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetDocumentsFromList;
