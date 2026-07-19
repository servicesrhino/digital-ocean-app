import React, { useEffect, useRef, useState } from 'react';
import { Button as Button2, Box, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import $api from './http';
import Sidebar from './Sidebar/Sidebar';
import { DataGridPro } from '@mui/x-data-grid-pro';

function AllParts() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    {
      field: 'status',
      headerName: 'Статус',
      width: 110,
      type: 'number',
      valueGetter: (value, row) => (row.status === 'unloaded' ? 'ПРОДАНО' : row.status),
    },
    {
      field: 'location',
      headerName: 'Локація',
      width: 130,
      type: 'number',
      valueGetter: (value, row) => (row.status === 'unloaded' ? '' : row.location),
    },
  ];

  const getParts = async (searchTerm) => {
    if (searchTerm.length < 4 && searchTerm.length !== 0) {
      alert('Введите хотя бы 4 символа для поиска.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await $api.post('/Parts/all', {
        page: 0,
        pageSize: 0,
        searchTerm,
      });
      const processed = data.map((row, index) =>
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
    } catch (error) {
      toast.error('Не удалось загрузить список деталей');
    } finally {
      setLoading(false);
    }
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
            <Button2 variant="contained" onClick={handleGetParts} disabled={loading}>
              Get parts
            </Button2>
            {loading && (
              <ReactLoading type="spin" color="green" height={24} width={24} />
            )}
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
