import React, { useEffect, useRef, useState } from 'react';
import { Button as Button2, Box, TextField } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import { DataGridPro } from '@mui/x-data-grid-pro';

function AllParts() {
  const [allData, setAllData] = useState([]);
  const inputRef = useRef(null); // Reference to the input field

  const columns = [
    { field: 'routeItemVeh', headerName: 'Машина', width: 200 },
    { field: 'name', headerName: 'Назва', width: 200 },
    { field: 'rhinoID', headerName: 'rhinoID', width: 190, type: 'number' },
    {
      field: 'originalIDs',
      headerName: 'originalIDs',
      width: 160,
      type: 'number',
    },
    { field: 'qrCode', headerName: 'qrCode', width: 120, type: 'number' },
    { field: 'status', headerName: 'Статус', width: 110, type: 'number' },
    { field: 'location', headerName: 'Локація', width: 130, type: 'number' },
  ];

  const getParts = (searchTerm) => {
    if (searchTerm.length < 4 && searchTerm.length !== 0) {
      alert('Введите хотя бы 4 символа для поиска.');
      return;
    }

    axios
      .post('https://rhino-api-dyq7j.ondigitalocean.app/Parts/all', {
        page: 0,
        pageSize: 0,
        searchTerm,
      })
      .then((res) => {
        const processed = res.data.map((row, index) =>
          row.actions?.[0]?.item?.vehicle
            ? {
                ...row,
                id: row.id || index,
                routeItemVeh: row.actions[0].item.vehicle,
                date: new Date(row.routeListDate).toLocaleDateString(),
                date3: new Date(row.routeListDate),
              }
            : { ...row, id: row.id || index, routeItemVeh: '' }
        );
        setAllData(processed);
      })
      .catch(console.error);
  };

  const handleGetParts = () => {
    const trimmed = inputRef.current?.value.trim() || '';
    if (trimmed.length < 4 && trimmed.length !== 0) {
      alert('Введите хотя бы 4 символа для поиска.');
      return;
    }
    getParts(trimmed);
  };

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px',
                fontSize: '14px',
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Button2 variant="contained" onClick={handleGetParts}>
              Get parts
            </Button2>
          </Box>

          <DataGridPro
            rows={allData}
            columns={columns}
            sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: '8px',
              },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                py: '15px',
              },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                py: '22px',
              },
            }}
            className="dataGrid"
            autoHeight
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            disableColumnResize
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  );
}

export default AllParts;
