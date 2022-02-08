import { Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useContext, useMemo } from 'react'
import { ConsentsContext } from '../../contexts/ConsentsContextProvider';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 0.15 },
    { field: 'email', headerName: 'Email', flex: 0.25 },
    { field: 'consentList', headerName: 'Consent given for', flex: 0.6 },
]

const consentDictionary: {[key: string]: string} = {
    newsletter: 'Receive newsletter',
    ads: 'Be shown targeted ads',
    statistics: 'Contribute to anonymous visit statistics',
}

export const ConsentsPage: React.FunctionComponent = () => {
    const { consentsList } = useContext(ConsentsContext)
    const rows = useMemo(() => consentsList.map((item, index) => ({
        id: index,
        ...item,
        consentList: item.consentList.map((key) => consentDictionary[key]).join(', ')
    })), [ consentsList ])

    return (
        <Grid container spacing={2}>
            <Grid item xs></Grid>
            <Grid item xs={12} md={8}>
                <div style={{ height: 220, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={2}
                        rowsPerPageOptions={[2]}
                    />
                </div>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
    )
}
