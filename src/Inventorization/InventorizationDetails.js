import React, { useContext, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Store } from '../Store';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const InventorizationDetails = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(Store);
  const { inventoryId } = state;
  console.log('inventoryId:', inventoryId);

  const collums = [
    {
      field: 'name',
      headerName: 'Менеджер',
      // cellClassName: 'super-app-theme--cell',
      size: 'small',
      width: 200,
    },
    {
      field: 'vehicle',
      headerName: 'Машина',
      size: 'small',
      width: 140,
    },
    {
      field: 'location',
      headerName: 'Location',
      size: 'small',
      width: 90,
    },
    {
      field: 'rhinoID',
      headerName: 'rhinoID',
      size: 'small',
    },
    {
      field: 'scanCode',
      headerName: 'scanCode',
      size: 'small',
      width: 110,
    },
    {
      field: 'routeListId',
      headerName: 'routeListId',
      size: 'small',
    },
    {
      field: 'routeListManagerName',
      headerName: 'routeListManagerName',
      size: 'small',
    },
    {
      field: 'routeListDocument',
      headerName: 'routeListDocument',
      size: 'small',
      width: 140,
    },
    {
      field: 'lastInventory',
      headerName: 'lastInventory',
      size: 'small',
      width: 140,
    },
  ];

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
        });
    } catch (error) {}
  };
  console.log(data);
  return (
    <div className="app2">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="mb-2">
            <button onClick={getData}>Отримати дані</button>
          </div>
          {/* <h3>Inventorization Details</h3> */}
          <div>
            <Box>
              <DataGrid
                width="510px"
                className="dataGrid"
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
  );

  // <div>InventorizationDetails</div>;
};

export default InventorizationDetails;
