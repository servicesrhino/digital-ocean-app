import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import $api from './http';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios';
// import { DataGridPro } from '@mui/x-data-grid';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { Button as Button2, Box } from '@mui/material';
// import { Button } from '@mui/material';

import { GridToolbarQuickFilter } from '@mui/x-data-grid-pro';
// import { Box } from '@mui/material';

function AllParts() {
  const [allData, setAllData] = useState([]);
  const [quickFilter, setQuickFilter] = useState('');

  const CustomToolbar = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // 👈 aligns to the left
          p: 1,
        }}
      >
        <GridToolbarQuickFilter debounceMs={500} />
      </Box>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'name',
      width: 150,
      editable: true,
    },
    {
      field: 'rhinoID',
      headerName: 'rhinoID',
      width: 150,
      editable: true,
    },
    {
      field: 'originalIDs',
      headerName: 'originalIDs',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'qrCode',
      headerName: 'qrCode',
      type: 'number',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'defect',
    //   headerName: 'defect',
    //   type: 'number',
    //   width: 110,
    //   editable: true,
    // },
    {
      field: 'status',
      headerName: 'status',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'location',
      headerName: 'location',
      type: 'number',
      width: 110,
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

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  const getParts = (searchTerm) => {
    try {
      const res = axios
        .post('https://rhino-api-dyq7j.ondigitalocean.app/Parts/all', {
          page: 0, // '1IWS5aNEnsJdPG7y2GxMZJkxSNP0wov1bhezsi6hWWx0',
          pageSize: 0,
          searchTerm: searchTerm,
        })
        .then((res) => {
          const response = res.data;
          setAllData(response);

          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="app__other">
          <div className="my-3 mx-2">
            {/* <Button onClick={getParts}>Get parts</Button> */}
          </div>

          <Button2
            variant="contained"
            onClick={() => getParts(quickFilter)}
            sx={{ mb: 2 }}
          >
            Get parts
          </Button2>

          <DataGridPro
            rows={allData}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 0 },
              },
            }}
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
            onFilterModelChange={(model) => {
              const input = model.quickFilterValues?.join(' ') || '';
              setQuickFilter(input);
            }}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            // checkboxSelection
            // disableRowSelectionOnClick
            disableColumnResize
          />
        </div>
      </div>
    </div>
  );
}

export default AllParts;
