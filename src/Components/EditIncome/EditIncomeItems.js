import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Modal, Button, Table } from 'react-bootstrap';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { Store } from '../../Store';
import $api from '../http';

function EditIncomeItems() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);
  const { state } = useContext(Store);
  const { lastDocumentsFromList } = state;

  const getData = async () => {
    try {
      const { data: rows } = await $api.post('/Parts/get-items-by-document', {
        documentId: lastDocumentsFromList,
        sheetId: '2020',
      });
      setData(rows);
    } catch (error) {
      toast.error('Не вдалося отримати товари цього приходу');
    } finally {
      setDone(true);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVehicleName = (row) => row.actions?.[0]?.item?.vehicle ?? '';

  const EDITABLE_FIELDS = [
    { key: 'vehicleName', label: 'Авто', get: getVehicleName },
    { key: 'name', label: 'Назва', get: (row) => row.name },
    { key: 'rhinoID', label: 'Rhino ID', get: (row) => row.rhinoID },
    { key: 'stockPrice', label: 'Ціна зі складу', get: (row) => row.stockPrice },
    { key: 'incomePrice', label: 'Ціна вхідна', get: (row) => row.incomePrice },
    {
      key: 'priceWithDepreciation',
      label: 'Ціна з амортизацією',
      get: (row) => row.priceWithDepreciation,
    },
  ];

  const [pendingUpdate, setPendingUpdate] = useState(null);

  const processRowUpdate = (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      const changes = EDITABLE_FIELDS.filter((f) => f.get(newRow) !== f.get(oldRow));
      if (changes.length === 0) {
        resolve(newRow);
        return;
      }
      setPendingUpdate({ newRow, oldRow, changes, resolve, reject });
    });

  const handleConfirmUpdate = async () => {
    const { newRow, resolve, reject } = pendingUpdate;
    try {
      await $api.post('/Parts/update-item', {
        id: newRow.id,
        vehicleName: getVehicleName(newRow),
        name: newRow.name,
        rhinoID: newRow.rhinoID,
        stockPrice: newRow.stockPrice,
        incomePrice: newRow.incomePrice,
        priceWithDepreciation: newRow.priceWithDepreciation,
      });
      toast.success('Збережено');
      resolve(newRow);
    } catch (error) {
      reject(error);
    } finally {
      setPendingUpdate(null);
    }
  };

  const handleCancelUpdate = () => {
    pendingUpdate.resolve(pendingUpdate.oldRow);
    setPendingUpdate(null);
  };

  const handleProcessRowUpdateError = () => {
    toast.error('Не вдалося зберегти зміни');
  };

  const [pendingDelete, setPendingDelete] = useState(null);

  const handleConfirmDelete = async () => {
    try {
      await $api.delete(`/Parts/delete-item/${pendingDelete.id}`);
      setData((prev) => prev.filter((row) => row.id !== pendingDelete.id));
      toast.success('Видалено');
    } catch (error) {
      toast.error('Не вдалося видалити позицію');
    } finally {
      setPendingDelete(null);
    }
  };

  const editableColumnProps = {
    editable: true,
    headerClassName: 'editable-header',
  };
  const readonlyColumnProps = {
    editable: false,
    headerClassName: 'readonly-header',
    cellClassName: 'readonly-cell',
  };

  const columns = [
    {
      field: 'vehicleName',
      headerName: 'Авто',
      width: 200,
      ...editableColumnProps,
      valueGetter: (value, row) => row.actions?.[0]?.item?.vehicle || '',
      valueSetter: (value, row) => ({
        ...row,
        actions: row.actions?.length
          ? [
              { ...row.actions[0], item: { ...row.actions[0].item, vehicle: value } },
              ...row.actions.slice(1),
            ]
          : row.actions,
      }),
    },
    { field: 'name', headerName: 'Назва', width: 220, ...editableColumnProps },
    { field: 'rhinoID', headerName: 'Rhino ID', width: 140, ...editableColumnProps },
    {
      field: 'stockPrice',
      headerName: 'Ціна зі складу',
      width: 130,
      type: 'number',
      ...editableColumnProps,
    },
    {
      field: 'incomePrice',
      headerName: 'Ціна вхідна',
      width: 130,
      type: 'number',
      ...editableColumnProps,
    },
    {
      field: 'priceWithDepreciation',
      headerName: 'Ціна з амортизацією',
      width: 150,
      type: 'number',
      ...editableColumnProps,
    },
    { field: 'qrCode', headerName: 'Штрих-код 🔒', width: 130, ...readonlyColumnProps },
    {
      field: 'deleteAction',
      headerName: '',
      width: 110,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button size="sm" variant="danger" onClick={() => setPendingDelete(params.row)}>
          Видалити
        </Button>
      ),
    },
  ];

  if (!done) {
    return (
      <ReactLoading
        className="flex justify-content-center align-items-center"
        type="bars"
        color="green"
        height={200}
        width={200}
      />
    );
  }

  return (
    <div className="appss">
      <div className="appss__body">
        <Sidebar />
        <div className="app__other">
          <h1>Товари приходу</h1>
          <p>
            <span style={{ backgroundColor: '#e8f5e9', padding: '2px 6px' }}>Зелений</span> — можна
            редагувати,{' '}
            <span style={{ backgroundColor: '#f5f5f5', color: '#757575', padding: '2px 6px' }}>
              сірий 🔒
            </span>{' '}
            — не можна
          </p>
          <div>
            <DataGridPro
              className="dataGrid"
              rows={data}
              columns={columns}
              editMode="row"
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              pageSizeOptions={[50]}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              sx={{
                '& .editable-header': {
                  backgroundColor: '#e8f5e9',
                  color: '#1b5e20',
                },
                '& .editable-header .MuiDataGridPro-columnHeaderTitle, & .editable-header .MuiDataGrid-columnHeaderTitle':
                  { color: '#1b5e20', fontWeight: 600 },
                '& .readonly-header': { backgroundColor: '#f5f5f5', color: '#757575' },
                '& .readonly-header .MuiDataGridPro-columnHeaderTitle, & .readonly-header .MuiDataGrid-columnHeaderTitle':
                  { color: '#757575', fontWeight: 600 },
                '& .readonly-cell': { backgroundColor: '#fafafa', color: '#9e9e9e' },
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        show={!!pendingUpdate}
        onHide={handleCancelUpdate}
        centered
        style={{ transform: 'none' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Підтвердіть зміни</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Поле</th>
                <th>Було</th>
                <th>Стане</th>
              </tr>
            </thead>
            <tbody>
              {pendingUpdate?.changes.map((f) => (
                <tr key={f.key}>
                  <td>{f.label}</td>
                  <td>{String(f.get(pendingUpdate.oldRow) ?? '')}</td>
                  <td>{String(f.get(pendingUpdate.newRow) ?? '')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelUpdate}>
            Відміна
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Так
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={!!pendingDelete}
        onHide={() => setPendingDelete(null)}
        centered
        style={{ transform: 'none' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Видалити позицію?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingDelete && (
            <>
              Авто: {getVehicleName(pendingDelete)}
              <br />
              Назва: {pendingDelete.name}
              <br />
              Штрих-код: {pendingDelete.qrCode}
              <br />
              Позиція буде видалена з приходу назавжди.
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPendingDelete(null)}>
            Відміна
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Так
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditIncomeItems;
