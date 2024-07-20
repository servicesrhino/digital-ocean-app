// import { Store } from '@mui/x-data-grid/utils/Store';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
// import { Button } from 'bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ReactLoading from 'react-loading';
import './GetReports.css';

function GetReports() {
  const [data, setData] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);
  const [sold, setSold] = useState();
  const [value, setValue] = useState();

  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);
  console.log('1');

  const getDocumentsFromList = () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-report-fromlist',
          {
            documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
            sheetId: '2020',
            page: 1,
          }
        )
        .then((res) => {
          console.log(res.data.reportItemsModel);
          console.log(res.data);
          const length = res.data.reportItemsModel.length;
          // setData(res.data.reportItemsModel);
          const checkedValue = res.data.reportItemsModel.map(
            (row) =>
              row.routeItem?.vehicleName
                ? { ...row, routeItemVeh: row.routeItem?.vehicleName }
                : { ...row, routeItemVeh: '' } //  row.id === name ? { ...row, defect: true } : row
          );
          console.log(checkedValue);
          setData(checkedValue);

          const someVal = res.data.reportItemsModel
            .map((row) => {
              return row.routeListManagerName;
            })
            .filter((row) => row !== null);
          console.log(someVal);
          setSold(((someVal.length / length) * 100).toFixed(1));

          // let some = [];
          const some = res.data.reportItemsModel
            .map((row) => {
              return (
                row.stockPrice + row.priceWithDepreciation + row.incomePrice
              );
            })
            .reduce((total, val) => (total += val), 0);
          // const someFin = some.map((row) =>
          //   row.reduce((total, val) => (total += val), 0)
          // );
          console.log(some);
          // console.log(someFin);
          setValue(some.toFixed(1));

          // const total = data.map((row, i) => (i += i));
          // console.log(data.length);

          // const res = (someVal.length / data.length) * 100;
          // console.log(`${res}%`);
          // // if (data)
          // setSold(+res.toFixed(1));
          // console.log(sold);
          // setData2(res.data);
          setDone(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  // if (data)

  // const solded = () => {
  //   const someVal = data
  //     .map((row) => {
  //       // if (
  //       //   row.routeListManagerName !== null &&
  //       //   row.routeListManagerName !== undefined
  //       // ) {
  //       //   return;
  //       // }
  //       return row.routeListManagerName;
  //     })
  //     .filter((row) => row !== null);
  //   console.log(someVal);
  let some = [];
  some = data
    .map((row) => {
      return row.stockPrice;
    })
    .reduce((total, val) => (total += val), 0);
  console.log(some);
  // let val = some.reduce((total, val) => (total += val), 0);
  // console.log(some.reduce((total, val) => (total += val), 0));
  // setValue(val);
  // console.log(val);

  //   const total = data.map((row, i) => (i += i));
  //   console.log(data.length);

  //   const res = (someVal.length / data.length) * 100;
  //   console.log(`${res}%`);
  //   // if (data)
  //   setSold(+res.toFixed(1));
  //   console.log(sold);
  // };
  const solded = () => {
    const someVal = data
      .map((row) => {
        // if (
        //   row.routeListManagerName !== null &&
        //   row.routeListManagerName !== undefined
        // ) {
        //   return;
        // }
        return row.routeListManagerName;
      })
      .filter((row) => row !== null);
    console.log(someVal);

    const total = data.map((row, i) => (i += i));
    console.log(data.length);

    const res = (someVal.length / data.length) * 100;
    console.log(`${res}%`);
    // if (data)
    // setSold(+res.toFixed(1));
    console.log(sold);
  };
  console.log(data);

  const someVal = data
    .map((row) => {
      // if (
      //   row.routeListManagerName !== null &&
      //   row.routeListManagerName !== undefined
      // ) {
      //   return;
      // }
      return row.routeListManagerName;
    })
    .filter((row) => row !== null);
  console.log(someVal);

  const total = data.map((row, i) => (i += i));
  console.log(data.length);

  const res = (someVal.length / data.length) * 100;
  console.log(`${res}%`);

  const checkedValue = data.map(
    (row) =>
      row.routeItem?.vehicleName
        ? { ...row, routeItemVeh: row.routeItem?.vehicleName }
        : { ...row, routeItemVeh: false } //  row.id === name ? { ...row, defect: true } : row
  );
  console.log(checkedValue);
  // setData3(checkedValue);

  const newData = data.map((row) => {
    return {
      ...row,
      routeItemVehicle: row.routeItem?.vehicleName,
    };
  });
  console.log(newData);
  // setData3(newData);

  useEffect(() => {
    getDocumentsFromList();
  }, []);

  useEffect(() => {
    solded(sold);
  }, [sold]);

  function handleOnInput(e) {}

  const columns = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      width: 170,
      headerAlign: 'left',
      editable: true,
      // flex: 1,
      renderCell: (params) => {
        return (
          <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.vehicle}
          </div>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Назва',
      // style: fontSize: '16px',
      width: 190,
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      renderCell: (params) => {
        return (
          <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.name}
          </div>
        );
      },
    },

    // {
    //   field: 'name',
    //   headerName: 'Назва',
    //   width: 200,
    //   editable: true,
    //   renderCell: (params) => {
    //     return (
    //       // <Box
    //       //   sx={{
    //       //     // boxShadow: 2,
    //       //     // border: 2,
    //       //     // width: '100%',
    //       //     // height: 50,
    //       //     borderColor: 'primary.light',
    //       //     overflowWrap: 'break-word',
    //       //     '& .MuiDataGrid-row': {
    //       //       color: 'primary.main',
    //       //       overflowWrap: 'break-word !important',
    //       //       worldWrap: 'break-word !important',
    //       //     },
    //       //     '&.MuiDataGrid-root .MuiDataGrid-cell--withRenderer': {
    //       //       color: 'tomato',
    //       //       overflowWrap: 'break-word !important',
    //       //       whiteSpace: 'normal',
    //       //       worldWrap: 'break-word !important',
    //       //       // word-wrap: 'break-word !important',
    //       //       // white-space: 'normal',
    //       //       // word-wrap: 'break-word',
    //       //     },
    //       //     '& .MuiDataGrid-cell--withRenderer MuiDataGrid-cell MuiDataGrid-cell--textLeft MuiDataGrid-cell--editable MuiDataGrid-withBorderColor':
    //       //       {
    //       //         overflowWrap: 'break-word',
    //       //         // color2: 'primary',
    //       //       },
    //       //   }}
    //       // >
    //       <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'bold',
    //           // }}
    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //             },
    //             disableUnderline: true,
    //           }}
    //           variant="standard"
    //           className={`some size ${params.row.printed ? 'styled' : ''}`}
    //           //
    //           size="small"
    //           style={{ fontSize: 10 }}
    //           value={params.row.name || ''}
    //           // InputProps={{ disableUnderline: true }}
    //           maxRows={2}
    //           minRows={1}
    //           rows={2}
    //           // onChange={() => handleChange()}
    //           onInput={(e) => handleOnInput(e)}
    //           // multiline
    //         />
    //         {/* <div className="some">{params.row.name}</div> */}
    //       </div>
    //       // </Box>
    //     );
    //   },
    // },
    {
      field: 'rhinoID',
      headerName: 'Ріно ID',
      width: 110,
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
      width: 110,
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
      width: 110,
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
      width: 110,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.priceWithDepreciation}
          </div>
        );
      },
    },

    // {
    //   field: 'barCodePrintQnt',
    //   headerName: 'Кількість',
    //   width: 80,
    //   editable: false,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.barCodePrintQnt}
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   //   headerAlign: 'center',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.id}
    //       </div>
    //     );
    //   },
    // },

    {
      field: 'scanCode',
      headerName: 'ScanCode',
      //   headerAlign: 'center',
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.scanCode}
          </div>
        );
      },
    },

    // {
    //   field: 'routeListDate',
    //   headerName: 'Date',
    //   //   headerAlign: 'center',
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.routeListDate}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: 'routeItemVeh',
    //   headerName: 'Назва транспорту',
    //   renderCell: (params) => {
    //     return (
    //       <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'bold',
    //           // }}
    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //             },
    //             disableUnderline: true,
    //           }}
    //           variant="standard"
    //           className={`some size ${params.row.printed ? 'styled' : ''}`}
    //           //
    //           size="small"
    //           style={{ fontSize: 10 }}
    //           value={params.row.routeItemVeh || ''}
    //           maxRows={2}
    //           rows={2}
    //           fullWidth
    //           width={'100px'}
    //           // onChange={() => handleChange()}
    //           // InputProps={{ disableUnderline: true }}
    //           // multiline
    //         />
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'routeItemVehicle',
    //   headerName: 'Назва транспорту',
    //   renderCell: (params) => {
    //     return (
    //       <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'bold',
    //           // }}
    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //             },
    //             disableUnderline: true,
    //           }}
    //           variant="standard"
    //           className={`some size ${params.row.printed ? 'styled' : ''}`}
    //           //
    //           size="small"
    //           style={{ fontSize: 10 }}
    //           value={params.row.routeItemVeh || []}
    //           // InputProps={{ disableUnderline: true }}
    //           multiline
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      field: 'routeItemVeh',
      headerName: 'Назва транспорту',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 110,
    },
    {
      field: 'routeListManagerName',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 110,
    },
    // {
    //   field: 'routeListManagerName',
    //   headerName: 'Менеджер',
    //   renderCell: (params) => {
    //     return (
    //       <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'bold',
    //           // }}
    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //             },
    //             disableUnderline: true,
    //           }}
    //           variant="standard"
    //           className={`some size ${params.row.printed ? 'styled' : ''}`}
    //           //
    //           size="small"
    //           style={{ fontSize: 10 }}
    //           value={params.row.routeListManagerName || ''}
    //           // InputProps={{ disableUnderline: true }}
    //           maxRows={2}
    //           rows={2}
    //           // rowHeight={2}
    //           // multiline
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: 'scanCode2',
    //   headerName: 'ScanCode2',
    //   //   headerAlign: 'center',
    //   filterable: 'true',
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.scanCode}
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'other',
    //   headerName: 'Назва транспорту',
    //   // cellClassName: 'super-app-theme--cell',
    //   //   headerAlign: 'center',
    //   width: 110,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         style={{ lineHeight: 'normal' }}
    //         // className={`some size ${params.row.printed ? 'styled' : ''}`}
    //       >
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'medium',
    //           // }}

    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //               '&.MuiOutlinedInput-notchedOutline': { fontSize: '10px' },
    //               // outline: 'not',
    //             },
    //             disableUnderline: true,
    //           }}
    //           value={params.row.routeItem?.vehicleName}
    //           variant="standard"
    //           multiline
    //         />
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'otehr2',
    //   headerName: 'Менеджер',
    //   //   headerAlign: 'center',
    //   width: 110,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
    //         <TextField
    //           // sx={{
    //           //   fontSize: 10,
    //           //   fontWeight: 'bold',
    //           // }}
    //           InputProps={{
    //             sx: {
    //               // color: '#518eb9',
    //               fontSize: '11px',
    //               // fontWeight: 1000,
    //             },
    //             disableUnderline: true,
    //           }}
    //           variant="standard"
    //           className={`some size ${params.row.printed ? 'styled' : ''}`}
    //           //
    //           size="small"
    //           style={{ fontSize: 10 }}
    //           value={params.row.routeListManagerName}
    //           // InputProps={{ disableUnderline: true }}
    //           multiline
    //         />
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'otehr3',
    //   headerName: 'Менед3жер',
    //   editable: true,
    //   //   headerAlign: 'center',
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.routeListManagerName}
    //       </div>
    //     );
    //   },
    // },

    // {
    //   field: 'defect',
    //   headerName: 'Дефекти',
    //   // type: 'number',
    //   width: 80,
    //   // editable: true,
    //   renderCell: (params) => {
    //     return <div>{params.row.defect}</div>;
    //   },
    // },

    // {
    //   field: 'routeItemVeh',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   // multiline: true,
    //   valueGetter: (params) =>
    //     `${params.row.routeItemVeh || ''} ${params.row.lastName || ''}`,
    // },

    // (params) => params.row.details[0].name,
  ];

  return (
    <>
      {!done ? (
        <ReactLoading
          className="flex justify-content-center align-items-center"
          type={'bars'}
          color={'green'}
          height={200}
          width={200}
        />
      ) : (
        <div className="appss">
          <div className="appss__body">
            <Sidebar />
            <div className="app__other">
              <h1>Отримати дані по звітам</h1>
              {/* <button onClick={getDocumentsFromList}>Get reports</button> */}
              <div className="mb-3">
                <Button type="printAll">Надрукувати все</Button>
                <div className="mt-3">
                  <h6>Продано: {sold}%</h6>
                  {/* <h6>{value}</h6> */}
                </div>
                <div className="mt-2">
                  <h6>Залишилось на складі: {100 - sold}%</h6>
                </div>
                <div className="d-flex"></div>
              </div>
              <div>
                <Box
                  sx={{
                    '& .super-app-theme--cell': {
                      // backgroundColor: 'rgba(224, 183, 60, 0.55)',
                      // color: '#1a3e72',
                      // fontWeight: '600',
                      overflowWrap: 'break-word !important',
                      worldWrap: 'break-word !important',
                      overflow: 'hidden',
                      fontSize: '11px',
                      // width: '100%',
                    },
                    '& .MuiDataGrid-cellContent': {
                      overflowWrap: 'break-word !important',
                      textOverflow: 'ellipsis',
                      wordWrap: 'break-word !important',
                    },
                  }}
                >
                  <DataGrid
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 200}
                    sx={{
                      '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                        py: '8px',
                      },
                      '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        py: '15px',
                      },
                      '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell':
                        { py: '22px' },
                    }}
                    className="dataGrid"
                    rows={data}
                    columns={[
                      ...columns,
                      // { field: 'scanCode2', filterable: true },
                    ]}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
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
                    pageSizeOptions={[10]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    // disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                  />
                </Box>
                <div className="mt-2 mb-2">
                  <h6>Загальна вартість завезеного товару: {value}</h6>
                </div>

                {/* <DataTable rows={data} /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GetReports;
