import React, { useState, useContext, useEffect } from 'react';
import './GetDocumentsFromList.css';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Store } from '../../Store';
import PrintedService from '../../services/PrintedService';
import $api from '../http';
import RemoveCheckService from '../../services/RemoveCheckService';
import DataTable from '../dataTable/DataTable';
// import { GridToolbar } from '@mui/x-data-grid';
import TableBootstrap from '../tableBootstrap/TableBootstrap';
import { Box } from '@mui/material';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey(
  '907c77a4e512fb294259232fff989342Tz0xMDgyMTIsRT0xNzcxNjMxOTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI='
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
  let { printerUrl } = userInfo;
  console.log('printerURL:', printerUrl);

  const [styled, setStyled] = useState(false);

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

  const togle = (e, item) => {
    e.preventDefault();
    console.log(item);
    console.log(data);
    console.log(data.filter((el) => el.id === item.id));
    const newVal = data.map((el) =>
      el.id === item.id ? { ...el, togle: true } : { ...el }
    );
    console.log(newVal);
    setStyled(!styled);
    console.log(styled);
    return newVal;
  };
  const OnToggleMeHandler2 = () => {
    console.log('handler');
    //setStyled (styled => !styled);
    //setStyled(!styled);
    setStyled((styled) => (styled === 'true' ? 'false' : ''));
    console.log('handler3');
  };

  const proxy = {
    host: 'your-proxy-server.com',
    port: 8080,
  };

  const testHttp = () => {
    // Make HTTP request using proxy
    axios
      .get(`${printerUrl}`, { proxy })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const testHttp = () => {
  //   const instance = axios.create({
  //     protocol: 'http',
  //   });

  //   instance
  //     .get('http://jsonplaceholder.typicode.com/todos/1')
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const httpProtocol = 'http://';

  // const testHttp = () => {
  //   axios
  //     .get(`${httpProtocol}jsonplaceholder.typicode.com/todos/1`)
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const testHttp = () => {
  //   axios
  //     .get('http://jsonplaceholder.typicode.com/todos/1')
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // };

  const getDocumentsFromList = () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-dyq7j.ondigitalocean.app/GoogleSheet/get-documents-fromlist',
          {
            documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
            sheetId: '2020',
          }
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setData2(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getDocumentsFromList();
  }, []);

  // useEffect(() => {
  //   document.addEventListener('click', commit);

  //   // return () => {
  //   //   document.removeEventListener('click', commit);
  //   // };
  // }, [data]);

  const commit = (event) => {
    const { name, checked } = event.target;
    console.log(name);
    console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);

    const printed = data.map((row) =>
      row.id === name ? { ...row, printed: checked } : { ...row }
    );
    setData(printed);
    console.log(printed);
    console.log(name);
    console.log(checked);
    console.log(data);
    console.log(value);

    if (event.key === 'a') {
      console.log('Enter key pressed', event.key);
    }
  };

  const barcodeNew = async (e, item) => {
    e.preventDefault();
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);

    const value = PrintedService.handlePrinted(name, checked, data);
    console.log(name);
    console.log(checked);
    console.log(data);
    //setSheetData2(value);

    // const checkedValue = data.map((row) =>
    //   row.id === name ? { ...row, printed: true } : { ...row, printed: false }
    // );
    // console.log(checkedValue);

    setData(value);

    try {
      console.log(
        `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${
          item.name + item.rhinoID
        }`
      );

      await fetch(
        `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${
          item.name + ' ' + item.rhinoID
        }`,
        {
          // ...
          referrerPolicy: 'unsafe-url',
        }
      ).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    //newPrintFunc2();
  };

  const newPrintFunc2 = async (e, item) => {
    e.preventDefault();
    try {
      const res = $api
        .post('https://rhino-api-alquo.ondigitalocean.app/Parts/print', {
          documentId: tes2, // '1FCiBDrLDD6wllgVLILHo8Z9hEFmMfPCJMPrrBQ7ITB0',
          sheetId: '2020', // '2020',
          barCode: item.id,
        })
        .then((res) => {
          const response = res.data;
          //setData(response);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleChecked(e) {
    //e.preventDefault();
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);

    const value = RemoveCheckService.remove(name, checked, data);
    console.log(name);
    console.log(checked);
    console.log(data);
    //setSheetData2(value);

    // const checkedValue = data.map((row) =>
    //   row.id === name ? { ...row, printed: true } : { ...row, printed: false }
    // );
    // console.log(checkedValue);
    console.log(value);

    setData(value);
    //return value;
  }

  const printAll = async (e) => {
    e.preventDefault();

    try {
      const printRequests = data.map((item) => {
        // Ensure printerUrl doesn't have any protocol and force it to HTTP
        const cleanPrinterUrl = userInfo.printerUrl.replace(/^https?:\/\//, '');
        const printUrl = `http://${cleanPrinterUrl}?id=${encodeURIComponent(
          item.id
        )}&veh=${encodeURIComponent(item.vehicle)}&name=${encodeURIComponent(
          item.name
        )}%20${encodeURIComponent(item.rhinoID)}`;

        return fetch(printUrl, {
          referrerPolicy: 'unsafe-url',
          mode: 'no-cors',
          credentials: 'include',
        }).then((res) => res.json().catch(() => null)); // Handle non-JSON responses safely
      });

      const responses = await Promise.all(printRequests);
      console.log('Print responses:', responses);
    } catch (error) {
      console.error('Error printing documents:', error);
    }
  };

  // const printAll = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const printRequests = data.map((item) => {
  //       let printUrl = `http://${userInfo.printerUrl.replace(
  //         /^https?:\/\//,
  //         ''
  //       )}?id=${item.id}&veh=${item.vehicle}&name=${item.name} ${item.rhinoID}`;

  //       return fetch(printUrl, {
  //         referrerPolicy: 'unsafe-url',
  //         mode: 'no-cors',
  //         credentials: 'include',
  //       }).then((res) => res.json().catch(() => null)); // Handle potential JSON parse errors
  //     });

  //     const responses = await Promise.all(printRequests);
  //     console.log('Print responses:', responses);
  //   } catch (error) {
  //     console.error('Error printing documents:', error);
  //   }
  // };

  // const printAll = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const printRequests = data.map((item) => {
  //       let printUrl = `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name} ${item.rhinoID}`;

  //       // Force HTTP by replacing 'https' with 'http'
  //       if (printUrl.startsWith('https://')) {
  //         printUrl = printUrl.replace('https://', 'http://');
  //       }

  //       return fetch(printUrl, {
  //         referrerPolicy: 'unsafe-url',
  //         mode: 'no-cors',
  //         credentials: 'include',
  //       }).then((res) => res.json());
  //     });

  //     const responses = await Promise.all(printRequests);
  //     console.log('Print responses:', responses);
  //   } catch (error) {
  //     console.error('Error printing documents:', error);
  //   }
  // };

  // const printAll = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const printRequests = data.map((item) => {
  //       const printUrl = `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name} ${item.rhinoID}`;

  //       return fetch(printUrl, {
  //         referrerPolicy: 'unsafe-url',
  //       }).then((res) => res.json()); // Assuming the response is JSON
  //     });

  //     const responses = await Promise.all(printRequests);
  //     console.log('Print responses:', responses);
  //   } catch (error) {
  //     console.error('Error printing documents:', error);
  //   }
  // };

  // const printAll = async (e) => {
  //   e.preventDefault();

  //   // data.forEach(item => {
  //   for (const item of data) {
  //     //   const contents = await fs.readFile(file, 'utf8');
  //     //     console.log(contents);

  //     try {
  //       console.log(
  //         '${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name+item.rhinoID}'
  //       );
  //       if (window.location.protocol == 'http:') {
  //         console.log('You are not connected with a secure connection.');
  //         console.log('Reloading the page to a Secure Connection...');
  //         window.location = document.URL.replace('http://', 'https://');
  //       }
  //       await fetch(
  //         `${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${
  //           item.name + ' ' + item.rhinoID
  //         }`,
  //         {
  //           // ...
  //           referrerPolicy: 'unsafe-url',
  //         }
  //       ).then((res) => {
  //         console.log(res.data);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     await timer(1000);
  //   }
  //   // });

  //   //newPrintFunc2();
  // };

  const testing = async () => {
    for (const item of data) {
      try {
        const res = axios
          .get(
            '${userInfo.printerUrl}?id=${item.id}&veh=${item.vehicle}&name=${item.name+item.rhinoID}',
            {
              // documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
              // sheetId: '2020',
            }
          )
          .then((res) => {
            console.log(res.data);
            // setData(res.data);
            // setData2(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    await timer(1000);
  };

  function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

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
  console.log(data);

  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <h1>Отримати дані з листа</h1>
          {/* <button onClick={getDocumentsFromList}>helo</button> */}
          <div>{/* <button onClick={testHttp}>test me</button> */}</div>
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
