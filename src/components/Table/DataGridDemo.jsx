import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: "rank", headerName: "Rank", width: 100 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "marks", headerName: "Marks", width: 150 },
  { field: "timeTaken", headerName: "Time Taken", width: 150 },
];

export default function DataGridDemo({ rows = [] }) {
  return (
    <Box sx={{ height: 450, width: '100%' }}>
      <DataGrid
        rows={rows} // Ensure rows is always an array
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#DE5027', // Corrected styling
          },
          '.MuiDataGrid-toolbarContainer': {
            backgroundColor: '#DE5027',
            color: 'white',
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
