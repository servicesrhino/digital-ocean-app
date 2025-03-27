import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Store } from '../Store';
import axios from 'axios';
import { Box, MenuItem } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import ReactLoading from 'react-loading';
import * as XLSX from 'xlsx';
import {
  // DataGrid,
  gridFilteredSortedRowIdsSelector,
  GridLogicOperator,
  // GridToolbar,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';

// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

LicenseInfo.setLicenseKey(
  '907c77a4e512fb294259232fff989342Tz0xMDgyMTIsRT0xNzcxNjMxOTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI='
);

const config2 = {
  columnNames: [
    'Машина',
    'Назва',
    'Ріно ID',
    'ScanCode',
    'Дата продажу',
    'Менеджер',
    'Маршрутний лист',
    'Інвенторизація',
    'Локація',

    // 'ldljfkdj',
  ],
  keys2: [
    'vehicle',
    'name',
    'rhinoID',
    'scanCode',
    'date3',
    'routeListManagerName',
    'routeListDocument',
    'lastInventory',
    'location',
  ],
  fileName: 'reports.xlsx',
  sheetName: 'Reports Info',
};

function CustomToolbar(props) {
  return (
    <GridToolbarContainer
      className="flex flex-row-reverse space-around"
      {...props}
    >
      {/* <GridToolbarQuickFilter /> */}

      <ExportButton className="mt-3 mx-6 flex-grow-0  " />
      <GridToolbarQuickFilter className="mx-6 flex-grow-1 " />
    </GridToolbarContainer>
  );
}

export function ExportButton(props) {
  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem />
      {/* <GridToolbarQuickFilter /> */}
    </GridToolbarExportContainer>
  );
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}

function handleExport(apiRef) {
  const data = getExcelData(apiRef);

  const rows = data.map((row) => {
    const mRow = {};
    for (const key of config2.keys2) {
      mRow[key] = row[key];
    }
    return mRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_aoa(worksheet, [[...config2.columnNames]], {
    origin: 'A1',
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, config2.sheetName);
  XLSX.writeFile(workbook, config2.fileName, { compression: true });
}

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

const InventorizationDetails = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { inventoryId } = state;
  console.log('inventoryId:', inventoryId);
  let some2 = uuidv4();
  // uuidv4(); //
  console.log(some2);

  const collums = [
    {
      field: 'vehicle',
      headerName: 'Машина',
      size: 'small',
      width: 190,
    },
    {
      field: 'name',
      headerName: 'Назва',
      // cellClassName: 'super-app-theme--cell',
      size: 'small',
      width: 290,
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
    // {
    //   field: 'date3',
    //   headerName: 'Дата продажу',
    //   size: 'small',
    //   width: 120,
    // },
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
          'https://rhino-api-dyq7j.ondigitalocean.app/GoogleSheet/get-documents-fromlist',
          {
            documentId: inventoryId,
            sheetId: '2020',
            // page: 0,
            // inventoryId: '67a02a92df14d03d97cdec12',
            // inventoryId: inventoryId,
          }
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);

          const changedData = res.data.map((row) => ({
            ...row,
            date3: new Date(row.routeListDate).toLocaleDateString(),
            id: uuidv4(),
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
                  {/* <DataGridPro
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
                    columns={
                      [...collums]

                      // collums
                    }
                    rows={data}
                    slots={{ toolbar: GridToolbar }}
                    initialState={{
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       {
                      //         id: 1,
                      //         field: 'name',
                      //         operator: 'contains',
                      //         value: 'D',
                      //       },
                      //       {
                      //         id: 2,
                      //         field: 'vehicle',
                      //         operator: 'contains',
                      //         value: 'Tesla',
                      //       },
                      //       {
                      //         id: 3,
                      //         field: 'stockPrice',
                      //         operator: '>',
                      //         value: '0',
                      //       },
                      //     ],
                      //   },
                      // },
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       { field: 'unitPrice', value: '25', operator: '>' },
                      //     ],
                      //   },
                      // },
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    components={{
                      Toolbar: CustomToolbar,
                      // toolbar: GridToolbar,
                    }}
                    slotProps={{
                      filterPanel: {
                        // Force usage of "And" operator
                        logicOperators: [GridLogicOperator.And],
                        // Display columns by ascending alphabetical order
                        columnsSort: 'asc',
                        filterFormProps: {
                          // Customize inputs by passing props
                          logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                          },
                          columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          valueInputProps: {
                            InputComponentProps: {
                              variant: 'outlined',
                              size: 'small',
                            },
                          },
                          deleteIconProps: {
                            sx: {
                              '& .MuiSvgIcon-root': { color: '#d32f2f' },
                            },
                          },
                        },
                        sx: {
                          // Customize inputs using css selectors
                          '& .MuiDataGrid-filterForm': { p: 2 },
                          '& .MuiDataGrid-filterForm:nth-child(even)': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#444'
                                : '#f5f5f5',
                          },
                          '& .MuiDataGrid-filterFormLogicOperatorInput': {
                            mr: 2,
                          },
                          '& .MuiDataGrid-filterFormColumnInput': {
                            mr: 2,
                            width: 150,
                          },
                          '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                          '& .MuiDataGrid-filterFormValueInput': { width: 200 },
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    // disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                  /> */}

                  <DataGridPro
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 200}
                    // getRowId={() => Math.floor(Math.random() * 100000000)}
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
                    className="dataGrid"
                    rows={data}
                    columns={[
                      ...collums,
                      // { field: 'scanCode2', filterable: true },
                    ]}
                    initialState={{
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       {
                      //         id: 1,
                      //         field: 'name',
                      //         operator: 'contains',
                      //         value: 'D',
                      //       },
                      //       {
                      //         id: 2,
                      //         field: 'vehicle',
                      //         operator: 'contains',
                      //         value: 'Tesla',
                      //       },
                      //       {
                      //         id: 3,
                      //         field: 'stockPrice',
                      //         operator: '>',
                      //         value: '0',
                      //       },
                      //     ],
                      //   },
                      // },
                      // ...data.initialState,
                      // filter: {
                      //   ...data.initialState?.filter,
                      //   filterModel: {
                      //     items: [
                      //       { field: 'unitPrice', value: '25', operator: '>' },
                      //     ],
                      //   },
                      // },
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    components={{
                      Toolbar: CustomToolbar,
                      // toolbar: GridToolbar,
                    }}
                    // slots={{ toolbar: GridToolbar }}
                    // slotProps={{
                    //   toolbar: {
                    //     showQuickFilter: true,
                    //     // Toolbar: CustomToolbar,
                    //     quickFilterProps: { debounceMs: 500 },
                    //     csvOptions: { disableToolbarButton: true },
                    //     printOptions: { disableToolbarButton: true },
                    //   },
                    // }}
                    slotProps={{
                      filterPanel: {
                        // Force usage of "And" operator
                        logicOperators: [GridLogicOperator.And],
                        // Display columns by ascending alphabetical order
                        columnsSort: 'asc',
                        filterFormProps: {
                          // Customize inputs by passing props
                          logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                          },
                          columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                          },
                          valueInputProps: {
                            InputComponentProps: {
                              variant: 'outlined',
                              size: 'small',
                            },
                          },
                          deleteIconProps: {
                            sx: {
                              '& .MuiSvgIcon-root': { color: '#d32f2f' },
                            },
                          },
                        },
                        sx: {
                          // Customize inputs using css selectors
                          '& .MuiDataGrid-filterForm': { p: 2 },
                          '& .MuiDataGrid-filterForm:nth-child(even)': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#444'
                                : '#f5f5f5',
                          },
                          '& .MuiDataGrid-filterFormLogicOperatorInput': {
                            mr: 2,
                          },
                          '& .MuiDataGrid-filterFormColumnInput': {
                            mr: 2,
                            width: 150,
                          },
                          '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                          '& .MuiDataGrid-filterFormValueInput': { width: 200 },
                        },
                      },
                    }}
                    // initialState={{

                    // }}
                    pageSizeOptions={[10]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    // disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
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
