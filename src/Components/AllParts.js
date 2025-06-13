import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import $api from './http';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios';
// import { DataGridPro } from '@mui/x-data-grid';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { Button as Button2, Box } from '@mui/material';
// import { Button } from '@mui/material';
import { TextField } from '@mui/material';

import { GridToolbarQuickFilter } from '@mui/x-data-grid-pro';
// import { Box } from '@mui/material';

// const CustomToolbar = ({ quickFilter, setQuickFilter }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search..."
//         value={quickFilter}
//         onChange={(e) => setQuickFilter(e.target.value)}
//         sx={{ width: 300 }}
//       />
//     </Box>
//   );
// };

const CustomToolbar = (props) => {
  const { quickFilter, setQuickFilter } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={quickFilter}
        onChange={(e) => setQuickFilter(e.target.value)}
        sx={{ width: 300 }}
      />
    </Box>
  );
};

function AllParts() {
  const [allData, setAllData] = useState([]);
  const [quickFilter, setQuickFilter] = useState('');

  // const CustomToolbar = () => {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'flex-start', // 👈 aligns to the left
  //         p: 1,
  //       }}
  //     >
  //       <GridToolbarQuickFilter debounceMs={500} />
  //     </Box>
  //   );
  // };

  // const CustomToolbar = React.useMemo(() => {
  //   return () => (
  //     <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
  //       <TextField
  //         variant="outlined"
  //         size="small"
  //         placeholder="Search..."
  //         value={quickFilter}
  //         onChange={(e) => setQuickFilter(e.target.value)}
  //         sx={{ width: 300 }}
  //       />
  //     </Box>
  //   );
  // }, [quickFilter]);

  // const CustomToolbar = () => {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
  //       <TextField
  //         variant="outlined"
  //         size="small"
  //         placeholder="Search..."
  //         value={quickFilter}
  //         onChange={(e) => setQuickFilter(e.target.value)}
  //         sx={{ width: 300 }}
  //       />
  //     </Box>
  //   );
  // };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Назва',
      width: 200,
      editable: true,
    },
    {
      field: 'rhinoID',
      headerName: 'rhinoID',
      width: 190,
      type: 'number',

      editable: true,
    },
    {
      field: 'originalIDs',
      headerName: 'originalIDs',
      type: 'number',
      width: 160,
      editable: true,
    },
    {
      field: 'qrCode',
      headerName: 'qrCode',
      type: 'number',
      width: 120,
      editable: true,
    },

    {
      field: 'status',
      headerName: 'Статус',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'location',
      headerName: 'Локація',
      type: 'number',
      width: 130,
      editable: true,
    },
    {
      field: 'routeItemVeh',
      headerName: 'Машина',
      width: 200,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) =>
    //     `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];

  const getParts = (searchTerm) => {
    // if (searchTerm.length < 4) {
    //   console.warn('Search term too short. Minimum 4 characters required.');
    //   return;
    // }
    try {
      const res = axios
        .post('https://rhino-api-dyq7j.ondigitalocean.app/Parts/all', {
          page: 0, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
          pageSize: 0,
          searchTerm: searchTerm,
        })
        .then((res) => {
          const response = res.data;
          const checkedValue = res.data.map(
            (row, index) =>
              row.actions[0].item.vehicle
                ? {
                    ...row,
                    id: row.id || index,
                    routeItemVeh: row.actions[0].item.vehicle,
                    date: new Date(row.routeListDate).toLocaleDateString(),
                    date3: new Date(row.routeListDate),
                  }
                : { ...row, routeItemVeh: '' } //  row.id === name ? { ...row, defect: true } : row
          );
          console.log(checkedValue);
          setAllData(checkedValue);

          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     getParts(quickFilter.trim().slice(0, 50)); // allow empty string, but still limit max length
  //   }, 500); // debounce

  //   return () => clearTimeout(delay);
  // }, [quickFilter]);

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     getParts(quickFilter.trim().slice(0, 50));
  //   }, 500);

  //   return () => clearTimeout(delay);
  // }, [quickFilter]);

  // useEffect(() => {
  //   const getParts = () => {
  //     try {
  //       const res = axios
  //         .post('https://rhino-api-alquo.ondigitalocean.app/Parts/all', {
  //           page: 0, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
  //           pageSize: 0,
  //           searchTerm: 'фара',
  //         })
  //         .then((res) => {
  //           const response = res.data;
  //           console.log(res.data);
  //           setAllData(response);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getParts();
  // }, []);

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     getParts(quickFilter);
  //   }, 500); // debounce to match quickFilterProps

  //   return () => clearTimeout(delayDebounce);
  // }, [quickFilter]);

  // const handleGetParts = () => {
  //   getParts(quickFilter.trim().slice(0, 50));
  // };

  const handleGetParts = () => {
    const trimmed = quickFilter.trim();

    if (trimmed.length < 4 && trimmed.length !== 0) {
      alert('Введите хотя бы 4 символа для поиска.');
      return;
    }

    getParts(trimmed.slice(0, 50));
  };

  // useEffect(() => {
  //   const trimmed = quickFilter.trim();

  //   if (trimmed.length < 4 && trimmed.length !== 0) return;

  //   const delay = setTimeout(() => {
  //     getParts(trimmed.slice(0, 50));
  //   }, 500); // debounce

  //   return () => clearTimeout(delay);
  // }, [quickFilter]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="my-3 mx-2">
            {/* <Button onClick={getParts}>Get parts</Button> */}
          </div>

          <Button2 variant="contained" onClick={handleGetParts} sx={{ mb: 2 }}>
            Get parts
          </Button2>

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
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
              toolbar: { quickFilter, setQuickFilter },
            }}
            // slotProps={{
            //   toolbar: {
            //     toolbar: { quickFilter, setQuickFilter },
            //     // showQuickFilter: true,
            //     // quickFilterProps: { debounceMs: 0 },
            //   },
            // }}

            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
            // showToolbar
            // slots={{ toolbar: GridToolbar }}

            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            // onFilterModelChange={(filterModel) => {
            //   console.log(
            //     'Quick filter values:',
            //     filterModel.quickFilterValues
            //   );
            // }}
            // onFilterModelChange={(model) => {
            //   const input = model.quickFilterValues?.[0] || '';
            //   setQuickFilter(input);
            // }}
            // onFilterModelChange={(model) => {
            //   const input = model.quickFilterValues?.[0] || '';
            //   setQuickFilter(input);
            // }}

            // onFilterModelChange={(model) => {
            //   const input = model.quickFilterValues?.join(' ') || '';
            //   setQuickFilter(input);
            // }}

            // checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            // checkboxSelection
            // disableRowSelectionOnClick
            disableColumnResize
            disableColumnMenu
            // disabledC
          />
        </div>
      </div>
    </div>
  );
}

export default AllParts;
