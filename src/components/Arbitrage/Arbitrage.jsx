import React, { useState } from 'react'
import { Paper, Typography, Box, Divider, Alert, LinearProgress, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { findArbitrageOpportunities } from './utils'
import ArbitrageCard from './ArbitrageCard'

export default function Arbitrage({ APIKey, sports, region, bookmakers, validatedAPI, tool, clickMatch }) {
    const [loading, setLoading] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [arbitrageOpportunities, setArbitrageOpportunities] = useState(null)
    
    function displayCard(match) {
        switch (tool) {
            case 'arbitrage':
                return <ArbitrageCard match={match} clickMatch={clickMatch} />
            default:
                return null
        }
    }
    async function fetchArbitrageData() {
        if (!validatedAPI || sports.length === 0) {
            setArbitrageOpportunities(null)
            return
        }
    
        setLoading(true)
        setLoadProgress(0)

        try {
            const loadIncrement = 100 / sports.size
            const sportsArray = Array.from(sports)
            let arbitrageOpportunitiesList = []

            for (let i = 0; i < sportsArray.length; i++) {
                const sport = sportsArray[i]
                try {
                    const bookmakersList = Array.from(bookmakers).join(',')
                    const response = await fetch(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${APIKey}&regions=${region}&markets=h2h,spreads&oddsFormat=decimal&bookmakers=${bookmakersList}`)
                    const data = await response.json()
                    for (const match of data) {
                        const newArbitrageOpportunity = findArbitrageOpportunities(match)
                        if (newArbitrageOpportunity) {
                            arbitrageOpportunitiesList.push(newArbitrageOpportunity)
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching ${sport} data:`, error)
                }
                setLoadProgress((i + 1) * loadIncrement)
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
            arbitrageOpportunitiesList.sort((a, b) => {
                const profitA = parseFloat(a.profitPercentage.replace("%", ""))
                const profitB = parseFloat(b.profitPercentage.replace("%", ""))
                return profitB - profitA
            })
            setArbitrageOpportunities(arbitrageOpportunitiesList)
        } catch (error) {
            console.error('Error fetching arbitrage data:', error)
            setArbitrageOpportunities([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        fetchArbitrageData()
    }

    return (
        <Paper elevation={5} sx={{ width: { xs: '100%', sm: 500 }, maxWidth: { xs: 500 }, maxHeight: { xs: 'none', sm: 500 }, p: 3, mt: 2, display: 'flex', flexDirection: 'column', gap: 2, overflowY: { xs: 'visible', sm: 'auto' }, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 6: Arbitrage Opportunities</Typography>
            <Divider />
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button 
                    variant="contained" 
                    startIcon={<SearchIcon />} 
                    onClick={handleSearch}
                    disabled={loading || !validatedAPI || sports.length === 0}
                >
                    {loading ? 'Searching...' : 'Search for Opportunities'}
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                    <LinearProgress variant="determinate" value={loadProgress} sx={{ width: '100%' }} />
                    <Typography variant="body2">Finding Arbitrage Opportunities...</Typography>
                </Box>
            ) : (
                !validatedAPI || sports.length === 0 || arbitrageOpportunities === null ? (
                    <Box sx={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert severity="info" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            Select sports to find arbitrage opportunities.
                        </Alert>
                    </Box>
                ) : arbitrageOpportunities.length === 0 ? (
                    <Box sx={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert severity="warning" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            No arbitrage opportunities found. 
                        </Alert>
                    </Box>
                ) : (
                    <>
                        <Typography variant="body2" color="text.secondary" align="center">
                            Click on a card to view betting calculations
                        </Typography>
                        {arbitrageOpportunities.map((match, index) => (
                            <Box key={index}>
                                {displayCard(match)}
                            </Box>
                        ))}
                    </>
                )
            )}
        </Paper>
    )
}