import { Card, CardContent, Typography, Grid, Paper, Box, Divider } from '@mui/material'

export default function ArbitrageCard({ match }) {
    const hasDraw = match.data.drawTeam !== undefined
    console.log(match)
    return (
        <Card variant="outlined" style={{ maxWidth: 400, margin: '10px auto' }}>
            <CardContent>
                <Typography variant="h5" component="div" align="center">
                    {match.data.homeTeam} vs {match.data.awayTeam}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {match.data.group} <br />
                    {new Date(match.data.commence_time).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    })}
                </Typography>
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center">
                    <Typography>Profit %: {match.bets.profitPercentage}</Typography>
                </Box>
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Typography fontWeight="bold">{match.data.homeTeam}</Typography>
                    <Typography>Payout: {match.data.homeTeamOdds} | Bookmaker: {match.data.homeTeamBookmaker}</Typography>
                </Box>
                {hasDraw && (
                    <>
                        <Divider style={{ margin: '8px 0' }} />
                        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={2}>
                            <Typography fontWeight="bold">Draw</Typography>
                            <Typography>Payout: {match.data.drawTeamOdds} | Bookmaker: {match.data.drawTeamBookmaker}</Typography>
                        </Box>
                    </>
                )}
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={2}>
                    <Typography fontWeight="bold">{match.data.awayTeam}</Typography>
                    <Typography>Payout: {match.data.awayTeamOdds} | Bookmaker: {match.data.awayTeamBookmaker}</Typography>
                </Box>
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <Typography>
                        For every <Typography component="span" fontWeight="bold">$100</Typography> put on <Typography component="span" fontWeight="bold">{match.data.homeTeam}</Typography>
                    </Typography>
                    <Typography>
                        put <Typography component="span" fontWeight="bold">${match.bets.home}</Typography> on <Typography component="span" fontWeight="bold">{match.data.awayTeam}</Typography>
                    </Typography>
                    {hasDraw && (
                        <Typography>
                            and put <Typography component="span" fontWeight="bold">${match.bets.draw}</Typography> on <Typography component="span" fontWeight="bold">Draw</Typography>
                        </Typography>
                    )}
                </Box>
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={2}>
                    <Typography>Total Stake: ${match.bets.totalSpent}</Typography>
                    <Typography>Expected Return: ${match.bets.expectedReturn}</Typography>
                    <Typography>Profit: ${match.bets.profit}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
