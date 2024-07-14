import { Box, Checkbox, CircularProgress, Fab } from '@mui/material';
import React, { useState } from 'react';
import { Check, Save } from '@mui/material';
import { green } from '@mui/material/colors';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { CheckRounded } from '@mui/icons-material';

const GetDocumentsFromListActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const hadleSubmit = async () => {
    const { role } = params.row;
    console.log(role);
  };
  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <CheckRounded />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={hadleSubmit}
        >
          <SaveRoundedIcon />
          {/* <button>Save</button> */}
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default GetDocumentsFromListActions;
