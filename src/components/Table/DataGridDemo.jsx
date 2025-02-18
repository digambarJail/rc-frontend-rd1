import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'rank', headerName: 'RANK', width: 100, headerAlign: 'center', align: 'center' },
  { field: 'username', headerName: 'USERNAME', width: 210, editable: false, headerAlign: 'center', align: 'center' },
  { field: 'questionsSolved', headerName: 'QUESTIONS SOLVED', width: 180, type: 'number', headerAlign: 'center', align: 'center' },
  { field: 'accuracy', headerName: 'ACCURACY', width: 150, headerAlign: 'center', align: 'center' },
];

const rows = [
  { id: 1, rank: 1, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
  { id: 2, rank: 2, username: 'POSIDON_23', questionsSolved: 10, accuracy: '90%' },
  { id: 3, rank: 3, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
  { id: 4, rank: 4, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
  { id: 5, rank: 5, username: 'POSIDON_33', questionsSolved: 10, accuracy: '90%' },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 300, width: '100%', color:"white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white',
          },
          '.MuiDataGrid-toolbarContainer': {
            bgcolor: 'white',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#DE5027 !important',
          },
          
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
