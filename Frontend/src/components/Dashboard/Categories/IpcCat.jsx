import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const IpcCat = () => {
    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];
    const columns = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
    ];
    return <Box sx={{ padding: '1rem', paddingTop: '0' }}>
        <DataGrid
            checkboxSelection
            rows={rows || []}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 100, page: 0 }
                },
                sorting: {
                    sortModel: [{ field: 'date', sort: 'desc' }],
                },
            }}
            density="compact"
            pageSizeOptions={[100, 50, 20]}
            pagination
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
        />
    </Box>
};


export default IpcCat;