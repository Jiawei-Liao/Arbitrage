import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Divider, Box, Select, MenuItem, FormControl, InputLabel, TextField, Alert } from '@mui/material'

export default function Calculate({ match }) {
    const [roundingOption, setRoundingOption] = useState('none')
    const [betAmount, setBetAmount] = useState('')
    const [selectedTeam, setSelectedTeam] = useState('All')
    const [betDistribution, setBetDistribution] = useState([])
    const [alertMessage, setAlertMessage] = useState('')

    const handleRoundingChange = (event) => {
        setRoundingOption(event.target.value)
    }

    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value)
    }

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value)
    }

    const round = useCallback((value) => {
        if (roundingOption === 'none') {
            return Number(value.toFixed(2))
        } else {
            const roundTo = parseFloat(roundingOption)
            return Math.round(value / roundTo) * roundTo
        }
    }, [roundingOption])

    const calculateBets = useCallback(() => {
        // Return if no match or bet amount
        if (!match || !betAmount) return

        const initialStake = parseFloat(betAmount)
        if (isNaN(initialStake) || initialStake <= 0) return

        // Initialise variables
        const odds = [match.homeTeamOdds, match.awayTeamOdds]
        const labels = [match.homeTeam, match.awayTeam]
        const bookmakers = [match.homeTeamBookmaker, match.awayTeamBookmaker]

        // Check if draw team exists
        if (match.drawTeamOdds) {
            odds.push(match.drawTeamOdds)
            labels.push(match.drawTeam)
            bookmakers.push(match.drawTeamBookmaker)
        }

        // Initialise bets object
        let bets = odds.map((odd, index) => {
            return {
                outcome: labels[index],
                odd,
                bookmaker: bookmakers[index]
            }
        })

        // Calculate bet distribution
        let teamBetAmount = []
        if (bets.drawTeam) {
            teamBetAmount = [
                initialStake/(1 + (odds[0]/odds[1]) + (odds[0]/odds[2])),
                initialStake/(1 + (odds[1]/odds[0]) + (odds[1]/odds[2])),
                initialStake/(1 + (odds[2]/odds[0]) + (odds[2]/odds[1]))
            ]
        } else {
            teamBetAmount = [
                initialStake/(1 + (odds[0]/odds[1])),
                initialStake/(1 + (odds[1]/odds[0]))
            ]
        }

        // If there is a selected team, scale bets to meet that specific team
        if (selectedTeam !== 'All') {
            const teamIndex = labels.indexOf(selectedTeam)
            if (teamIndex !== -1) {
                const scalingFactor = initialStake / teamBetAmount[teamIndex]
                teamBetAmount[teamIndex] *= scalingFactor
                for (let i = 0; i < teamBetAmount.length; i++) {
                    if (i !== teamIndex) {
                        teamBetAmount[i] *= scalingFactor
                    }
                }
            }
        }

        // Add bet amount to bets object
        for (let i = 0; i < bets.length; i++) {
            bets[i].betAmount = round(teamBetAmount[i])
            bets[i].return = (bets[i].betAmount * bets[i].odd).toFixed(2)
        }
        
        // Calculate whether there is a profit
        const totalStake = bets.reduce((acc, bet) => acc + bet.betAmount, 0)

        for (let i = 0; i < bets.length; i++) {
            bets[i].profit = (bets[i].return - totalStake).toFixed(2)
        }
        
        if (bets.length === 0) {
            setAlertMessage('There is no profit to be made from these values.')
        } else {
            setAlertMessage('')
            setBetDistribution(bets)
        }
    }, [betAmount, selectedTeam, match, round])

    useEffect(() => {
        calculateBets()
    }, [roundingOption, betAmount, selectedTeam, calculateBets])

    useEffect(() => {
        if (match) {
            const availableTeams = [match.homeTeam, match.awayTeam]
            if (match.drawTeamOdds) {
                availableTeams.push(match.drawTeam)
            }
    
            if (!availableTeams.includes(selectedTeam)) {
                setSelectedTeam('All')
            }
        }
    }, [match, selectedTeam])    
    
    return (
        match ? (
            <Paper id='calculate' elevation={5} sx={{ width: { sm: 500 }, maxWidth: { xs: 500 }, maxHeight: { xs: 'none', sm: 500 }, p: 3, mt: 2, display: 'flex', flexDirection: 'column', gap: 2, overflowY: { xs: 'visible', sm: 'auto' }, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Calculate Bet</Typography>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">I want to round to closest:</Typography>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Rounding</InputLabel>
                        <Select
                            value={roundingOption}
                            onChange={handleRoundingChange}
                            label="Rounding"
                        >
                            <MenuItem value="none">Don't round</MenuItem>
                            <MenuItem value="1">$1</MenuItem>
                            <MenuItem value="5">$5</MenuItem>
                            <MenuItem value="10">$10</MenuItem>
                            <MenuItem value="100">$100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">I want to bet:</Typography>
                    <TextField
                        label="Amount"
                        type="number"
                        value={betAmount}
                        onChange={handleBetAmountChange}
                        variant="outlined"
                        size="small"
                        sx={{ width: 100 }}
                        placeholder="Amount"
                    />
                    <Typography variant="body1">on</Typography>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Team</InputLabel>
                        <Select
                            value={selectedTeam}
                            onChange={handleTeamChange}
                            label="Team"
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value={match.awayTeam}>{match.awayTeam}</MenuItem>
                            <MenuItem value={match.homeTeam}>{match.homeTeam}</MenuItem>
                            {match.drawTeam && <MenuItem value={match.drawTeam}>{match.drawTeam}</MenuItem>}
                        </Select>
                    </FormControl>
                </Box>
                {(betDistribution.length > 0) ? (
                    <>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Bet Suggestions</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {betDistribution.map((bet, index) => (
                                <Box key={index} sx={{ padding: 1, border: '1px solid #ccc', borderRadius: '8px', bgcolor: '#fafafa' }}>
                                    <Typography variant="body1">
                                        You should bet <strong>${bet.betAmount}</strong> on <strong>{bet.outcome}</strong> at <strong>{bet.bookmaker}</strong>.
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Returns</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {betDistribution.map((bet, index) => (
                                <Box key={index} sx={{ padding: 1, border: '1px solid #ccc', borderRadius: '8px', bgcolor: '#fafafa' }}>
                                    <Typography variant="body1">
                                        If <strong>{bet.outcome}</strong> wins, you will get a total profit of <strong>${bet.profit}</strong>.
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                ) : (
                    alertMessage && <Alert severity="warning">{alertMessage}</Alert>
                )}

            </Paper>
        ) : <Box id='calculate' />
    )
}