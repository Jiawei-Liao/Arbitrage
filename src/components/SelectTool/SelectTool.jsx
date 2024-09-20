import { Paper, Typography, Divider, Button, Box, IconButton, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export default function SelectTool({ selectedTool, setSelectedTool, selectedRegion, setSelectedRegion }) {
    function handleBettingToolSelected(tool) {
        if (tool === selectedTool) {
            return
        } else {
            localStorage.setItem('selectedTool', tool)
            setSelectedTool(tool)
        }
    }

    function handleRegionSelected(region) {
        if (region === selectedRegion) {
            return
        } else {
            localStorage.setItem('selectedRegion', region)
            setSelectedRegion(region)
        }
    }

    return (
        <Paper elevation={5} sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 2: Select Betting Tool</Typography>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button sx={{ width: 200 }} variant="contained" color={selectedTool === 'arbitrage' ? 'primary' : 'inherit'} onClick={() => handleBettingToolSelected('arbitrage')}>
                    Arbitrage Betting
                </Button>
                <Tooltip title="Arbitrage betting guarantees profit by betting on all outcomes across different bookmakers.">
                    <IconButton>
                        <InfoIcon color="action" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button sx={{ width: 200 }} variant="contained" color={selectedTool === 'value' ? 'primary' : 'inherit'} onClick={() => handleBettingToolSelected('value')}>
                    Value Betting
                </Button>
                <Tooltip title="Value betting involves betting when you believe the odds are in your favor compared to the actual probability.">
                    <IconButton>
                        <InfoIcon color="action" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 4 }}>Step 3: Select Region</Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                {['au', 'us', 'uk', 'eu'].map(region => (
                    <Button
                        key={region}
                        variant="contained"
                        color={selectedRegion === region ? 'primary' : 'inherit'}
                        onClick={() => handleRegionSelected(region)}
                        sx={{ width: 100 }}
                    >
                        {region === 'au' ? 'Australia' : region === 'us' ? 'USA' : region === 'uk' ? 'UK' : 'Europe'}
                    </Button>
                ))}
            </Box>
        </Paper>
    )
}
