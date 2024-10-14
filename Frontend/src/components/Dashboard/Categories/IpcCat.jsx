import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getPublicData } from '../../../store/slices/publicSlice';    

const IpcCat = () => {
    const dispatch = useDispatch();
    const { barrios, tiposPrediccion } = useSelector(state => state.public.data);
    useEffect(() => {
        dispatch(getPublicData());
    }, [dispatch]);
    const rows = barrios;
    const columns = [
        { field: 'barrioId', headerName: 'Column 1', width: 150 },
        { field: 'nombre', headerName: 'Column 2', width: 150 },
    ];
    return <Box sx={{ padding: '1rem', paddingTop: '0' }}>
        <DataGrid
            checkboxSelection
            rows={rows || []}
            getRowId={r=> r.barrioId}
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