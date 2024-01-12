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
  const [data2, setData2] = useState([]);
  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;
  console.log(lastDocumentsFromList);

  const getDocumentsFromList = () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-alquo.ondigitalocean.app/Reports/get-report-fromlist',
          {
            documentId: lastDocumentsFromList, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
            sheetId: '2020',
            page: 1,
          }
        )
        .then((res) => {
          console.log(res.data.reportItemsModel);
          setData(res.data.reportItemsModel);
          setData2(res.data);
          setDone(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocumentsFromList();
  }, []);

  const columns = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      width: 160,
      headerAlign: 'left',
      editable: true,
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
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          // <Box
          //   sx={{
          //     // boxShadow: 2,
          //     // border: 2,
          //     // width: '100%',
          //     // height: 50,
          //     borderColor: 'primary.light',
          //     overflowWrap: 'break-word',
          //     '& .MuiDataGrid-row': {
          //       color: 'primary.main',
          //       overflowWrap: 'break-word !important',
          //       worldWrap: 'break-word !important',
          //     },
          //     '&.MuiDataGrid-root .MuiDataGrid-cell--withRenderer': {
          //       color: 'tomato',
          //       overflowWrap: 'break-word !important',
          //       whiteSpace: 'normal',
          //       worldWrap: 'break-word !important',
          //       // word-wrap: 'break-word !important',
          //       // white-space: 'normal',
          //       // word-wrap: 'break-word',
          //     },
          //     '& .MuiDataGrid-cell--withRenderer MuiDataGrid-cell MuiDataGrid-cell--textLeft MuiDataGrid-cell--editable MuiDataGrid-withBorderColor':
          //       {
          //         overflowWrap: 'break-word',
          //         // color2: 'primary',
          //       },
          //   }}
          // >
          <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
            <TextField
              // sx={{
              //   fontSize: 10,
              //   fontWeight: 'bold',
              // }}
              InputProps={{
                sx: {
                  // color: '#518eb9',
                  fontSize: '11px',
                  // fontWeight: 1000,
                },
                disableUnderline: true,
              }}
              variant="standard"
              className={`some size ${params.row.printed ? 'styled' : ''}`}
              //
              size="small"
              style={{ fontSize: 10 }}
              value={params.row.name}
              // InputProps={{ disableUnderline: true }}
              multiline
            />
            {/* <div className="some">{params.row.name}</div> */}
          </div>
          // </Box>
        );
      },
    },
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

    {
      field: 'other',
      headerName: 'Назва транспорту',
      // cellClassName: 'super-app-theme--cell',
      //   headerAlign: 'center',
      width: 110,
      renderCell: (params) => {
        return (
          <div
            style={{ lineHeight: 'normal' }}
            // className={`some size ${params.row.printed ? 'styled' : ''}`}
          >
            <TextField
              // sx={{
              //   fontSize: 10,
              //   fontWeight: 'medium',
              // }}

              InputProps={{
                sx: {
                  // color: '#518eb9',
                  fontSize: '11px',
                  // fontWeight: 1000,
                  '&.MuiOutlinedInput-notchedOutline': { fontSize: '10px' },
                  // outline: 'not',
                },
                disableUnderline: true,
              }}
              value={params.row.routeItem?.vehicleName}
              variant="standard"
              multiline
            />
          </div>
        );
      },
    },
    {
      field: 'otehr2',
      headerName: 'Менеджер',
      //   headerAlign: 'center',
      width: 110,
      renderCell: (params) => {
        return (
          <div className={`some size ${params.row.printed ? 'styled' : ''}`}>
            <TextField
              // sx={{
              //   fontSize: 10,
              //   fontWeight: 'bold',
              // }}
              InputProps={{
                sx: {
                  // color: '#518eb9',
                  fontSize: '11px',
                  // fontWeight: 1000,
                },
                disableUnderline: true,
              }}
              variant="standard"
              className={`some size ${params.row.printed ? 'styled' : ''}`}
              //
              size="small"
              style={{ fontSize: 10 }}
              value={params.row.routeListManagerName}
              // InputProps={{ disableUnderline: true }}
              multiline
            />
          </div>
        );
      },
    },
    // {
    //   field: 'otehr3',
    //   headerName: 'Менед3жер',
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
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
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
                <div className="d-flex"></div>
              </div>
              <div>
                <Box
                // sx={{
                //   '& .super-app-theme--cell': {
                //     backgroundColor: 'rgba(224, 183, 60, 0.55)',
                //     color: '#1a3e72',
                //     fontWeight: '600',
                //     overflowWrap: 'break-word !important',
                //     worldWrap: 'break-word !important',
                //     overflow: 'hidden',
                //   },
                //   '& .MuiDataGrid-cellContent': {
                //     overflowWrap: 'break-word !important',
                //     textOverflow: 'ellipsis',
                //     wordWrap: 'break-word !important',
                //   },
                // }}
                >
                  <DataGrid
                    className="dataGrid"
                    rows={data}
                    columns={[...columns]}
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
                </Box>

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
