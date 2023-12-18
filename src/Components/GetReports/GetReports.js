// import { Store } from '@mui/x-data-grid/utils/Store';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
// import { Button } from 'bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function GetReports() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
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
      width: 200,
      headerAlign: 'left',
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
      width: 200,
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
      width: 130,
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
      width: 120,
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
      width: 130,
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
      width: 130,
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
    {
      field: 'id',
      headerName: 'ID',
      //   headerAlign: 'center',
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`size ${params.row.printed ? 'styled' : ''}`}>
            {params.row.id}
          </div>
        );
      },
    },

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
            {/* <DataTable rows={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetReports;
