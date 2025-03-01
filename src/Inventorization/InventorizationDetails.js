import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Store } from '../Store';
import axios from 'axios';
import { Box } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import ReactLoading from 'react-loading';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey(
  '907c77a4e512fb294259232fff989342Tz0xMDgyMTIsRT0xNzcxNjMxOTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI='
);

const InventorizationDetails = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { inventoryId } = state;
  console.log('inventoryId:', inventoryId);

  const collums = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      size: 'small',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Назва',
      // cellClassName: 'super-app-theme--cell',
      size: 'small',
      width: 220,
    },
    {
      field: 'rhinoID',
      headerName: 'Ріно ID',
      size: 'small',
    },

    {
      field: 'scanCode',
      headerName: 'scanCode',
      size: 'small',
      width: 110,
    },
    // {
    //   field: 'routeListId',
    //   headerName: 'routeListId',
    //   size: 'small',
    // },
    {
      field: 'date3',
      headerName: 'Дата',
      size: 'small',
      width: 120,
    },
    {
      field: 'routeListManagerName',
      headerName: 'Менеджер',
      size: 'small',
      width: 120,
    },
    {
      field: 'routeListDocument',
      headerName: 'Маршрутний лист',
      size: 'small',
      width: 130,
    },
    // {
    //   field: 'routeItem',
    //   headerName: 'route Item',
    //   size: 'small',
    //   width: 80,
    // },
    {
      field: 'lastInventory',
      headerName: 'Інвенторизація',
      size: 'small',
      width: 100,
    },
    {
      field: 'location',
      headerName: 'Локація',
      size: 'small',
      width: 80,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      const res = axios
        .post(
          'https://rhino-api-dyq7j.ondigitalocean.app/Inventory/get-result-fromlist',
          {
            documentId: '1dPb8FsEhRz8Fd6UD-lVXxVkbOIvSfr_-jEOrfVBMB6s',
            sheetId: '2020',
            page: 0,
            inventoryId: inventoryId,
          }
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data.inventoryResultModel);

          const changedData = res.data.inventoryResultModel.map((row) => ({
            ...row,
            date3: new Date(row.routeListDate).toLocaleDateString(),
          }));
          setData(changedData);

          setDone(true);
        });
    } catch (error) {}
  };
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
        <div className="app2">
          <div className="app__body">
            <Sidebar />
            <div className="app__other">
              <div className="mb-3">
                {/* <button onClick={getData}>Отримати дані</button> */}
                <h1>Отримати дані по переоблікам</h1>
              </div>
              {/* <h3>Inventorization Details</h3> */}
              <div>
                <Box>
                  <DataGridPro
                    width="510px"
                    className="dataGrid"
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
                    getRowId={() => Math.floor(Math.random() * 100000000)}
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 200}
                    // width="510px'
                    columns={collums}
                    rows={data}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // <div>InventorizationDetails</div>;
};

export default InventorizationDetails;
