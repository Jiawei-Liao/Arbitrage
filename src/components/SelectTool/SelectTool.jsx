import { Paper, Typography, Divider, Button, Box, IconButton, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export default function SelectTool({ selectedTool, setSelectedTool}) {
    function handleBettingToolSelected(tool) {
        if (tool === selectedTool) {
            return
        } else {
            localStorage.setItem('selectedTool', tool)
            setSelectedTool(tool)
        }
    }
    
    return (
        <Paper elevation={5} sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Step 2: Select Betting Tool</Typography>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button sx={{ width: 200}} variant="contained" color={selectedTool === 'arbitrage' ? 'primary' : 'inherit'} onClick={() => handleBettingToolSelected('arbitrage')}>
                    Arbitrage Betting
                </Button>
                <Tooltip title="Arbitrage betting guarantees profit by betting on all outcomes across different bookmakers.">
                    <IconButton>
                        <InfoIcon color="action" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button sx={{ width: 200}} variant="contained" color={selectedTool === 'value' ? 'primary' : 'inherit'} onClick={() => handleBettingToolSelected('value')}>
                    Value Betting
                </Button>
                <Tooltip title="Value betting involves betting when you believe the odds are in your favor compared to the actual probability.">
                    <IconButton>
                        <InfoIcon color="action" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    )
}