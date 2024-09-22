import { Card, CardContent, Typography, Box, Divider } from '@mui/material'

export default function ArbitrageCard({ match, clickMatch }) {
    const hasDraw = match.drawTeam !== undefined
    
    return (
        <Card variant="outlined" style={{ maxWidth: 400, margin: '10px auto', cursor: 'pointer' }} onClick={() => {clickMatch(match)}}>
            <CardContent>
                <Typography variant="h5" component="div" align="center">
                    {match.homeTeam} vs {match.awayTeam}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {match.group} <br />
                    {new Date(match.commence_time).toLocaleString('en-US', {
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
                    <Typography>Profit: {match.profitPercentage}%</Typography>
                </Box>
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Typography fontWeight="bold">{match.homeTeam}</Typography>
                    <Typography>Odds: {match.homeTeamOdds} | Bookmaker: {match.homeTeamBookmaker}</Typography>
                </Box>
                {hasDraw && (
                    <>
                        <Divider style={{ margin: '8px 0' }} />
                        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={2}>
                            <Typography fontWeight="bold">Draw</Typography>
                            <Typography>Odds: {match.drawTeamOdds} | Bookmaker: {match.drawTeamBookmaker}</Typography>
                        </Box>
                    </>
                )}
                <Divider style={{ margin: '8px 0' }} />
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={2}>
                    <Typography fontWeight="bold">{match.awayTeam}</Typography>
                    <Typography>Odds: {match.awayTeamOdds} | Bookmaker: {match.awayTeamBookmaker}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
