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
    },
    {
      field: 'vehicle',
      headerName: 'Машина',
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
          {/* <h3>Inventorization Details</h3> */}
          <button onClick={getData}>cllick me</button>
          <div>
            <Box>
              <DataGrid
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
