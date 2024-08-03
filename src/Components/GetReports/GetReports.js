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
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
// import { useDemoData } from '@mui/x-data-grid-generator';

function GetReports() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);
  const [sold, setSold] = useState();
  const [value, setValue] = useState();
  const [efective, setEfective] = useState();
  const [efectiveNum, setEfectiveNum] = useState();
  const [efectiveData, setEfectiveData] = useState([]);
  const [efectiveData2, setEfectiveData2] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates2, setDates2] = useState([]);

  const VISIBLE_FIELDS = [
    'name',
    'rating',
    'country',
    'dateCreated',
    'isAdmin',
  ];

  // const { dataNew } = useDemoData({ dataSet: 'Employee', rowLength: 100 });

  // const { dataNew } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });
  // console.log(dataNew);

  // const [state2, setState2] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection',
  //   },
  // ]);

  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);
  console.log('1');
  const dates = ['15.01.2024', '25.01.2024'];
  console.log(dates);

  // const handleSelect = (ranges) => {
  //   let arr = [];
  //   let dateBegin = ranges.selection.startDate;
  //   let dateFinish = ranges.selection.endDate;
  //   arr.push(dateBegin.toLocaleDateString());
  //   arr.push(dateFinish.toLocaleDateString());
  //   console.log(arr);
  //   setDates2([
  //     dateBegin.toLocaleDateString(),
  //     dateFinish.toLocaleDateString(),
  //   ]);
  //   // setDates2(dateFinish);
  //   console.log(dateFinish.toLocaleDateString());
  //   console.log(ranges.selection.startDate);
  //   console.log(Date.parse(ranges.selection.startDate));
  //   console.log(ranges);
  //   setStartDate(ranges.selection.startDate);
  //   setEndDate(ranges.selection.endDate);
  // };

  console.log(dates2);
  const selectionRanges = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

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
                ? {
                    ...row,
                    routeItemVeh: row.routeItem?.vehicleName,
                    date: new Date(row.routeListDate).toLocaleDateString(),
                    date3: new Date(row.routeListDate),
                  }
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

          const efectiveManager = res.data.reportItemsModel
            .map((row) => {
              if (
                row.routeListManagerName !== null ||
                row.routeListManagerName !== undefined ||
                row.routeListManagerName !== ''
              ) {
                return row.routeListManagerName;
              }
              return;
            })
            .filter((row) => row !== null);
          // .filter(
          //   (value, index, current_value) => current_value.indexOf(value) === index
          // );

          const test = efectiveManager
            // .map((row) => {
            //   return row.routeListManagerName;
            // })
            .reduce(function (value, value2) {
              return (
                value[value2] ? ++value[value2] : (value[value2] = 1), value
              );
            }, {});
          console.log(test);

          // for (const property in test) {
          //   console.log(`${property}: ${test[property]}`);
          //   let max = 0;
          //   // if
          // }

          let max = 0;
          let arr = Object.entries(test);
          console.log(arr);

          let one = arr
            .map((row, i) => {
              if (row[0] === '') return false;
              return {
                id: i,
                name: row[0],
                sold: row[1],
              };
            })
            .filter((row) => row !== false);
          console.log(one);

          setEfectiveData(one);

          const newSold = one
            .map((row) => row.sold)
            .reduce((total, row) => (total += row), 0);
          console.log(newSold);

          const one2 = one.map((row) => {
            return {
              ...row,
              soldPercent: ((row.sold / newSold) * 100).toFixed(1),
              warehousePercent: ((row.sold / length) * 100).toFixed(1),
            };
          });
          console.log(one2);
          setEfectiveData2(one2);

          let values = Object.values(test);
          console.log(values);

          values.map((item) => {
            return (max = Math.max(max, item));
          });
          console.log(max);
          // setData3(newData);
          let fina = arr.filter((row) => row[1] === max);
          console.log(fina);
          let percent = fina[0];
          console.log(percent);
          let manager1 = percent[0];
          console.log(manager1);
          setEfective(manager1);
          setEfectiveNum((percent[1] / newSold) * 100);
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
  console.log(data);

  const efectiveManager = data
    .map((row) => {
      if (
        row.routeListManagerName !== null ||
        row.routeListManagerName !== undefined
      ) {
        return row.routeListManagerName;
      }
      return;
    })
    .filter((row) => row !== null);
  // .filter(
  //   (value, index, current_value) => current_value.indexOf(value) === index
  // );
  console.log(efectiveManager);
  let withoutRepeat = efectiveManager;

  const test = efectiveManager
    // .map((row) => {
    //   return row.routeListManagerName;
    // })
    .reduce(function (value, value2) {
      return value[value2] ? ++value[value2] : (value[value2] = 1), value;
    }, {});
  console.log(test);

  for (const property in test) {
    console.log(`${property}: ${test[property]}`);
    let max = 0;
    // if
  }

  let max = 0;
  let arr = Object.entries(test);
  console.log(arr);

  let values = Object.values(test);
  console.log(values);

  values.map((item) => {
    return (max = Math.max(max, item));
  });
  console.log(max);
  // setData3(newData);
  let fina = arr.filter((row) => row[1] === max);
  console.log(fina);
  let percent = fina[0];
  console.log(percent);
  // let manager1 = percent[0];
  // console.log(manager1);
  // setEfective(percent)

  useEffect(() => {
    getDocumentsFromList();
  }, []);

  useEffect(() => {
    solded(sold);
  }, [sold]);

  function handleOnInput(e) {}

  const columns2 = [
    {
      field: 'name',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 150,
      flex: 1,
    },
    {
      field: 'sold',
      headerName: 'Продав',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 110,
    },
    {
      field: 'soldPercent',
      headerName: 'Відсоток від усіх продажів',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 150,
    },
    {
      field: 'warehousePercent',
      headerName: 'Продано усього від контейнеру',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 160,
    },
  ];

  const columns = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      width: 150,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
    //   field: 'date3',
    //   headerName: 'Date',
    //   //   headerAlign: 'center',
    //   width: 100,
    //   renderCell: (params) => {
    //     // console.log(sold);
    //     if (params.row.date > dates[0] && params.row.date < dates[1]) {
    //       console.log('yeah');
    //       const updated = data.map((row) => {
    //         return {
    //           ...row,
    //           date2: params.row.date,
    //         };
    //       });
    //       console.log(updated);
    //       return (
    //         <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //           {/* {sold} */}
    //           {/* {dates} */}
    //           {params.row.date}
    //         </div>
    //       );
    //     }
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {/* {sold} */}
    //         {/* {dates} */}
    //         {/* {dates2[0] < params.row.date} */}
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
      field: 'date3',
      headerName: 'Дата продажу',
      type: 'date',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 90,
    },
    {
      field: 'routeItemVeh',
      headerName: 'Назва транспорту',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 100,
    },

    {
      field: 'routeListManagerName',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 100,
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
                <div>
                  {/* <DateRangePicker
                  // onChange={(item) => setState2([item.selection])}
                  // showSelectionPreview={true}
                  // moveRangeOnFirstSelection={false}
                  // months={2}
                  // ranges={state}
                  // direction="horizontal"
                  // preventSnapRefocus={true}
                  // calendarFocus="backwards"
                  // ranges={[selectionRanges]}
                  // minDate={new Date()}
                  // onChange={handleSelect}
                  // months={2}
                  // calendarFocus="backwards"
                  /> */}
                </div>
                <div>
                  <br />
                  <h6>Найбільш ефективний менеджер: {efective}</h6>
                </div>
                <div>
                  <Box>
                    <DataGrid
                      width="500px"
                      className="dataGrid"
                      columns={[...columns2]}
                      rows={efectiveData2}
                      disableExtendRowFullWidth={true}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      // pageSizeOptions={[5]}
                      // checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
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
                      ...data.initialState,
                      filter: {
                        ...data.initialState?.filter,
                        filterModel: {
                          items: [
                            { field: 'unitPrice', value: '25', operator: '>' },
                          ],
                        },
                      },
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
                  {/* <h5>
                    {efective} : {efectiveNum}%
                  </h5> */}

                  {/* <h5>{efectiveNum}</h5> */}
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
