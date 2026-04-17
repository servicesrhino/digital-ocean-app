// import { Store } from '@mui/x-data-grid/utils/Store';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Box, MenuItem, TextField } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
// import { Button } from 'bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import {
  // DataGrid,
  gridFilteredSortedRowIdsSelector,
  GridLogicOperator,
  // GridToolbar,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import ReactLoading from 'react-loading';
import './GetReports.css';
import * as XLSX from 'xlsx';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';
import Modal from '../Modal/Modal';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Button as newButton,
  Typography,
  TextField as newTextField,
} from '@mui/material';

LicenseInfo.setLicenseKey(
  '098919564072b5983286dc144fb661a0Tz0xMjgzNzcsRT0xODA4MDkyNzk5MDAwLFM9cHJvLExNPWFubnVhbCxQVj1RMS0yMDI2LFE9MSxBVD1zaW5nbGUsS1Y9Mg=='
);
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
// import { useDemoData } from '@mui/x-data-grid-generator';

// const config = {
//   columnNames: [
//     'Менеджер',
//     'Продав',
//     'Відсоток від усіх продажів',
//     'Продано усього від контейнеру',
//   ],
//   keys: ['name', 'sold', 'soldPercent', 'warehousePercent'],
//   fileName: 'data.xlsx',
//   sheetName: 'Personal Info',
// };

const config2 = {
  columnNames: [
    'Машина',
    'Назва',
    'Ріно ID',
    'Цена со склада',
    'Цена входящая',
    'Цена с амортизацией',
    'ScanCode',
    'Дата продажу',
    // 'ldljfkdj',
    'Назва транспорту',
    'Менеджер',
  ],
  keys2: [
    'vehicle',
    'name',
    'rhinoID',
    'stockPrice',
    'incomePrice',
    'priceWithDepreciation',
    'scanCode',
    'date3',
    'vehicle',
    // 'vehicle',
    'routeItemVeh',
    'routeListManagerName',
  ],
  fileName: 'reports.xlsx',
  sheetName: 'Reports Info',
};

function CustomToolbar(props) {
  return (
    <GridToolbarContainer
      className="flex flex-row-reverse space-around"
      {...props}
    >
      {/* <GridToolbarQuickFilter /> */}

      <ExportButton className="mt-3 mx-6 flex-grow-0  " />
      <GridToolbarQuickFilter className="mx-6 flex-grow-1 " />
    </GridToolbarContainer>
  );
}

export function ExportButton(props) {
  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem />
      {/* <GridToolbarQuickFilter /> */}
    </GridToolbarExportContainer>
  );
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}

function handleExport(apiRef) {
  const data = getExcelData(apiRef);

  const rows = data.map((row) => {
    const mRow = {};
    for (const key of config2.keys2) {
      mRow[key] = row[key];
    }
    return mRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_aoa(worksheet, [[...config2.columnNames]], {
    origin: 'A1',
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, config2.sheetName);
  XLSX.writeFile(workbook, config2.fileName, { compression: true });
}

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

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
  const [soldMoney, setSoldMoney] = useState([]);
  const [unsoldMoney, setUnsoldMoney] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [managerNameError, setManagerNameError] = useState(false);
  const [reasonsError, setReasonsError] = useState(false);

  // const {state} = useContext(Store)

  let USDollar = new Intl.NumberFormat('usd-US', {
    style: 'currency',
    currency: 'USD',
  });

  const price = 14340;

  const [selectedRow, setSelectedRow] = useState(null);
  const [managerName, setManagerName] = useState('');
  const [reasons, setReasons] = useState('');

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setManagerName(''); // reset input on each open
    setReasons('');
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  const handleSubmit = async () => {
    // console.log(`Manager for ${selectedRow.name}: ${managerName}`);

    // console.log('Submit button clicked');
    // console.log('Manager name:', managerName);
    // console.log('Selected row:', selectedRow);
    // handleClose();

    if (!selectedRow || !managerName.trim()) {
      setManagerNameError(true);
      setReasonsError(true);
      return;
    }

    setManagerNameError(false);
    setReasonsError(false); // clear error if valid

    const payload = {
      // userId: selectedRow.id,
      scanCode: 'q5flo6ahG9',
      managerName: managerName.trim(),
      reasons: reasons.trim(),
    };

    const token = userInfo.jwtToken;

    try {
      const response = await axios.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Parts/unloadInPast',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to assign manager');

      console.log('Manager assigned successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
    }
    handleClose();
  };

  console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
  // The formated version of 14340 is $14,340.00

  const VISIBLE_FIELDS = [
    'name',
    'rating',
    'country',
    'dateCreated',
    'isAdmin',
  ];

  useEffect(() => {
    getDocumentsFromList();
  }, []);

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

  const { userInfo } = state;
  console.log(userInfo.jwtToken);

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

  const getReportsData = useCallback(() => {
    // get reports data logic here
  }, []);

  const getDocumentsFromList = useCallback(() => {
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

          const checkedValue2 = checkedValue.map((row) => {
            const isEmpty = (value) =>
              value === null || value === '' || value === '0001-01-01T00:00:00';

            const allFieldsEmpty =
              isEmpty(row.lastInventory) &&
              isEmpty(row.routeListManagerName) &&
              isEmpty(row.routeListDate) &&
              isEmpty(row.routeItemVeh);

            return allFieldsEmpty ? { ...row, test: '233' } : { ...row };
          });
          setData(checkedValue2);

          const someVal = res.data.reportItemsModel
            .map((row) => {
              return row.routeListManagerName;
            })
            .filter((row) => row !== null);
          console.log(someVal);
          setSold(((someVal.length / length) * 100).toFixed(1));

          // sold in maoney
          const someVal2 = res.data.reportItemsModel
            .map((row) => {
              if (row.routeListManagerName) {
                return row.stockPrice;
              }
            })
            .filter((row) => row !== undefined)
            .reduce((total, el) => (total += el), 0);
          console.log(someVal2);
          setSoldMoney(someVal2);

          // unsold in money
          const unsoldMoney = res.data.reportItemsModel
            .map((row) => {
              if (!row.routeListManagerName) {
                return row.stockPrice;
              }
            })
            .filter((row) => row !== undefined)
            .reduce((total, el) => (total += el), 0);
          console.log(unsoldMoney);
          setUnsoldMoney(unsoldMoney);

          // let some = [];
          const some = res.data.reportItemsModel
            .map((row) => {
              return row.incomePrice;
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
                return {
                  name: row.routeListManagerName,
                  price: row.stockPrice,
                };
              }
              return;
            })
            .filter((row) => row[0] !== null);
          // .filter(
          //   (value, index, current_value) => current_value.indexOf(value) === index
          // );
          console.log(efectiveManager);
          console.log(data);

          // const raw = efectiveManager.map((row) => {
          //   if (row.routeListManagerName === '') {
          //     return row.routeListManager.replace(/"/g, '');
          //   }
          // });
          // console.log(raw);

          // let temp = efectiveManager.reduce((acc, curr) => {
          //   const str = JSON.stringify(curr);
          //   acc[str] = (acc[str] || 0) + 1;
          //   return acc;
          // }, {});
          // console.log(temp);

          // const users2 = [
          //   { name: 'John', gender: 'Male', orders: 20 },
          //   { name: 'Doe', gender: 'Male', orders: 8 },
          //   { name: 'Ada', gender: 'Female', orders: 10 },
          //   { name: 'David', gender: 'Male', orders: 30 },
          // ];

          const users = [
              { name: 'John', gender: 'Male', orders: 20 },
              { name: 'Doe', gender: 'Male', orders: 8 },
              { name: 'Ada', gender: 'Female', orders: 10 },
              { name: 'David', gender: 'Male', orders: 30 },
            ],
            result = Object.values(
              efectiveManager.reduce((r, { name, price }) => {
                r[name] ??= { name, sold: 0, soldInMoney: 0 };
                r[name].sold++;
                r[name].soldInMoney += price;
                return r;
              }, {})
            )
              .filter((row) => row.name !== null)
              .filter((row) => row.name !== '');

          console.log(result);

          const newSold2 = result
            .map((row) => row.sold)
            .reduce((total, row) => (total += row), 0);
          console.log(newSold2);

          const one3 = result.map((row) => {
            return {
              ...row,
              // soldInMoney: USDollar.format(soldMoney),
              soldPercent: ((row.sold / newSold2) * 100).toFixed(1),
              warehousePercent: ((row.sold / length) * 100).toFixed(1),
            };
          });
          console.log(one3);
          setEfectiveData2(one3);

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
          // setEfectiveData2(one2);

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
  }, [lastDocumentsFromList]);
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
  console.log(data);

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
    solded(sold);
  }, [sold]);

  console.log(data);

  const checkedValue2 = data.map((row) => {
    const isEmpty = (value) =>
      value === null || value === '' || value === '0001-01-01T00:00:00';

    const allFieldsEmpty =
      isEmpty(row.lastInventory) &&
      isEmpty(row.routeListManagerName) &&
      isEmpty(row.routeListDate) &&
      isEmpty(row.routeItemVeh);

    return allFieldsEmpty ? { ...row, test: '233' } : { ...row };
  });
  // setData(checkedValue2);

  // const checkedValue2 = data.map(
  //   (row) =>
  //     row.lastInvetory
  //       ? {
  //           // ...row,
  //           // routeItemVeh: row.routeItem?.vehicleName,
  //           // date: new Date(row.routeListDate).toLocaleDateString(),
  //           // date3: new Date(row.routeListDate),
  //         }
  //       : { ...row, test: '233' } //  row.id === name ? { ...row, defect: true } : row
  // );
  console.log(checkedValue2);
  // setData(checkedValue);

  function handleOnInput(e) {}

  const columns2 = [
    {
      field: 'name',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 280,
      // flex: 1,
    },
    {
      field: 'sold',
      headerName: 'Продав',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 210,
    },
    {
      field: 'soldInMoney',
      headerName: 'Продав у грошах',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {USDollar.format(params.row.soldInMoney)}
          </div>
        );
      },
    },
    {
      field: 'soldPercent',
      headerName: 'Відсоток від усіх продажів',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 220,
    },
    {
      field: 'warehousePercent',
      headerName: 'Продано усього від контейнеру',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 220,
    },
    // {
    //   field: 'warehousePercent',
    //   headerName: 'Інвентаризація',
    //   // style: fontSize: '16px',
    //   size: 'small',
    //   cellClassName: 'super-app-theme--cell',
    //   // flex: 1,
    //   width: 220,
    // },
  ];

  const columns = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      width: 130,
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
      width: 150,
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
      width: 80,
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
      width: 80,
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
      width: 80,
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
      width: 80,
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
      width: 80,
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
      width: 80,
    },

    {
      field: 'routeListManagerName',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 90,
    },
    {
      field: 'lastInventory',
      headerName: 'Інвентаризація',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 100,
    },
    // {
    //   field: 'test',
    //   headerName: 'Продаж',
    //   size: 'small',
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.test && (
    //           <div>
    //             <button onClick={() => setModalActive(true)}>Продаж</button>
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    // },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 95,
      renderCell: (params) => {
        return (
          <div>
            {params.row.test && (
              <div>
                <Button
                  // variant="contained"
                  size="small"
                  onClick={() => handleViewClick(params.row)}
                  type="printAll"
                >
                  Продаж
                </Button>
                {/* <Button
                  Button
                  // type="printAll"
                  variant="contained"
                  size="small"
                  onClick={() => handleViewClick(params.row)}
                >
                  Продаж
                </Button> */}
              </div>
            )}
          </div>
        );
      },
    },

    // {
    //   field: 'scanCode',
    //   headerName: 'ScanCode',
    //   //   headerAlign: 'center',
    //   width: 92,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`size ${params.row.printed ? 'styled' : ''}`}>
    //         {params.row.scanCode}
    //       </div>
    //     );
    //   },
    // },

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

  console.log(data);

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
                  <h6>
                    Продано: {sold}% ({USDollar.format(soldMoney)})
                  </h6>
                  {/* <h6>{value}</h6> */}
                </div>
                <div className="mt-2">
                  <h6>
                    Залишилось на складі: {100 - sold}% (
                    {USDollar.format(unsoldMoney)})
                  </h6>
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
                  {/* <h6>Найбільш ефективний менеджер: {efective}</h6> */}
                  <h6>
                    Загальна вартість завезеного товару:{' '}
                    {USDollar.format(value)}
                  </h6>
                </div>
                <div>
                  <Box>
                    <DataGridPro
                      width="510px"
                      className="dataGrid"
                      columns={[...columns2]}
                      rows={efectiveData2}
                      disableExtendRowFullWidth={true}
                      getRowId={() => Math.floor(Math.random() * 100000000)}
                      // components={{
                      //   Toolbar: CustomToolbar,
                      // }}
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
                  <Modal active={modalActive} setActive={setModalActive} />

                  <DataGridPro
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
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       {
                      //         id: 1,
                      //         field: 'name',
                      //         operator: 'contains',
                      //         value: 'D',
                      //       },
                      //       {
                      //         id: 2,
                      //         field: 'vehicle',
                      //         operator: 'contains',
                      //         value: 'Tesla',
                      //       },
                      //       {
                      //         id: 3,
                      //         field: 'stockPrice',
                      //         operator: '>',
                      //         value: '0',
                      //       },
                      //     ],
                      //   },
                      // },
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       { field: 'unitPrice', value: '25', operator: '>' },
                      //     ],
                      //   },
                      // },
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    components={{
                      Toolbar: CustomToolbar,
                      // toolbar: GridToolbar,
                    }}
                    // slots={{ toolbar: GridToolbar }}
                    // slotProps={{
                    //   toolbar: {
                    //     showQuickFilter: true,
                    //     // Toolbar: CustomToolbar,
                    //     quickFilterProps: { debounceMs: 500 },
                    //     csvOptions: { disableToolbarButton: true },
                    //     printOptions: { disableToolbarButton: true },
                    //   },
                    // }}
                    slotProps={{
                      filterPanel: {
                        // Force usage of "And" operator
                        logicOperators: [GridLogicOperator.And],
                        // Display columns by ascending alphabetical order
                        columnsSort: 'asc',
                        filterFormProps: {
                          // Customize inputs by passing props
                          logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                          },
                          columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          valueInputProps: {
                            InputComponentProps: {
                              variant: 'outlined',
                              size: 'small',
                            },
                          },
                          deleteIconProps: {
                            sx: {
                              '& .MuiSvgIcon-root': { color: '#d32f2f' },
                            },
                          },
                        },
                        sx: {
                          // Customize inputs using css selectors
                          '& .MuiDataGrid-filterForm': { p: 2 },
                          '& .MuiDataGrid-filterForm:nth-child(even)': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#444'
                                : '#f5f5f5',
                          },
                          '& .MuiDataGrid-filterFormLogicOperatorInput': {
                            mr: 2,
                          },
                          '& .MuiDataGrid-filterFormColumnInput': {
                            mr: 2,
                            width: 150,
                          },
                          '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                          '& .MuiDataGrid-filterFormValueInput': { width: 200 },
                        },
                      },
                    }}
                    // initialState={{

                    // }}
                    pageSizeOptions={[10]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    // disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                  />
                  {/* <Dialog open={Boolean(selectedRow)} onClose={handleClose}>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogContent>
                      {selectedRow && (
                        <>
                          <Typography>Name: {selectedRow.name}</Typography>
                          <Typography>Age: {selectedRow.age}</Typography>
                        </>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog> */}
                  <Dialog open={Boolean(selectedRow)} onClose={handleClose}>
                    <DialogTitle>Визначити менеджера</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Ім'я менеджера"
                        type="text"
                        fullWidth
                        value={managerName}
                        // onChange={(e) => setManagerName(e.target.value)}
                        // inputProps={{ maxLength: 15 }}
                        // disabled={!managerName.trim()}
                        onChange={(e) => {
                          setManagerName(e.target.value);
                          if (managerNameError) setManagerNameError(false); // clear error while typing
                        }}
                        inputProps={{ maxLength: 15 }}
                        error={managerNameError}
                        helperText={
                          managerNameError
                            ? 'Manager name is required'
                            : 'Max 15 characters'
                        }
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Причини"
                        type="text"
                        fullWidth
                        value={reasons}
                        // onChange={(e) => setReasons(e.target.value)}
                        // inputProps={{ maxLength: 15 }}
                        onChange={(e) => {
                          setReasons(e.target.value);
                          if (reasonsError) setReasonsError(false); // clear error while typing
                        }}
                        inputProps={{ maxLength: 25 }}
                        error={reasonsError}
                        helperText={
                          reasonsError
                            ? 'Reasons is required'
                            : 'Max 25 characters'
                        }
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Відмінити</Button>
                      <Button onClick={handleSubmit} variant="contained">
                        Відправити
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                {/* <Modal active={modalActive} setActive={setModalActive} /> */}

                <div className="mt-2 mb-2">
                  {/* <h6>
                    Загальна вартість завезеного товару:{' '}
                    {USDollar.format(value)}
                  </h6> */}

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
