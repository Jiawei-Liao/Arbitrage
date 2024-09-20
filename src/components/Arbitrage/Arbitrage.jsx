import { Paper, Typography } from '@mui/material'

export default function Arbitrage() {
    return (
        <Paper elevation={5} sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 4: Arbitrage Opportunites</Typography>
        </Paper>
    )
}