import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import $api from '../http';
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';

function Oblik2() {
  const [data, setData] = useState([]);
  const { state, oblik } = useContext(Store);
  const { userInfo } = state;
  const { jwtToken } = userInfo;
  // const token = jwtToken;
  console.log(jwtToken);
  const { lastDocumentsFromList } = state;
  const token = '';
  console.log(state);
  console.log(state.oblik);
  state.userInfo.jwtToken = token;
  console.log(state.userInfo);
  console.log(jwtToken);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Назва',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 280,
      // flex: 1,
    },
    {
      field: 'vehicleName',
      headerName: 'Машина',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 280,
      // flex: 1,
    },
    {
      field: 'routeListManagerName',
      headerName: 'Менеджер',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 280,
      // flex: 1,
    },
    {
      field: 'originalIDs',
      headerName: 'originalIDs',
      // style: fontSize: '16px',
      size: 'small',
      cellClassName: 'super-app-theme--cell',
      // flex: 1,
      width: 280,
      // flex: 1,
    },
  ];

  const getData = async () => {
    try {
      const res = await $api.post(
        `https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-report-by-month`,
        {
          mounth: state.month,
          managerName: state.oblik,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(res.data);
      setData(res.data.reportItemsModel);
    } catch (error) {}
  };
  console.log(data);
  // console.log(data.reportItemsModel);

  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          {/* <button onClick={getData}>sd</button> */}
          <div>Oblik2</div>
          <div>
            <DataGrid
              // width="500px"
              columns={[...columns]}
              rows={data}
              disableExtendRowFullWidth={true}
              getRowId={() => Math.floor(Math.random() * 100000000)}
              // components={{
              //   Toolbar: CustomToolbar,
              // }}
              initialState={{
                pagination: {
                  paginationModel: {
                    // pageSize: 5,
                  },
                },
              }}
              // pageSizeOptions={[5]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oblik2;
