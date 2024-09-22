import { Paper, Typography, Divider, Button, Box, IconButton, Tooltip, Alert, useMediaQuery } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export default function SelectTool({ selectedTool, setSelectedTool, selectedRegion, setSelectedRegion, selectedBookmakers, setSelectedBookmakers }) {
    const bookmakerKeyToName = {
        betfair_ex_au: 'Betfair Exchange',
        betr_au: 'Betr',
        betright: 'Bet Right',
        bluebet: 'BlueBet',
        ladbrokes_au: 'Ladbrokes',
        neds: 'Neds',
        playup: 'PlayUp',
        pointsbetau: 'PointsBet (AU)',
        sportsbet: 'SportsBet',
        tab: 'TAB',
        tabtouch: 'TABtouch',
        topsport: 'TopSport',
        unibet: 'Unibet',
        betonlineag: 'BetOnline.ag',
        betmgm: 'BetMGM',
        betrivers: 'BetRivers',
        betus: 'BetUS',
        bovada: 'Bovada',
        williamhill_us: 'Caesars',
        draftkings: 'DraftKings',
        fanduel: 'FanDuel',
        lowvig: 'LowVig.ag',
        mybookieag: 'MyBookie.ag',
        superbook: 'SuperBook',
        unibet_us: 'Unibet',
        wynnbet: 'WynnBET',
        sport888: '888sport',
        betfair_ex_uk: 'Betfair Exchange',
        betfair_sb_uk: 'Betfair Sportsbook',
        betvictor: 'Bet Victor',
        betway: 'Betway',
        boylesports: 'BoyleSports',
        casumo: 'Casumo',
        coral: 'Coral',
        grosvenor: 'Grosvenor',
        ladbrokes_uk: 'Ladbrokes',
        leovegas: 'LeoVegas',
        livescorebet: 'LiveScore Bet',
        matchbook: 'Matchbook',
        mrgreen: 'Mr Green',
        paddypower: 'Paddy Power',
        skybet: 'Sky Bet',
        unibet_uk: 'Unibet',
        virginbet: 'Virgin Bet',
        williamhill: 'William Hill',
        onexbet: '1xBet',
        betclic: 'Betclic',
        betanysports: 'BetAnySports',
        betfair_ex_eu: 'Betfair Exchange',
        betsson: 'Betsson',
        coolbet: 'Coolbet',
        everygame: 'Everygame',
        gtbets: 'GTbets',
        livescorebet_eu: 'Livescorebet (EU)',
        marathonbet: 'Marathon Bet',
        nordicbet: 'NordicBet',
        pinnacle: 'Pinnacle',
        suprabets: 'Suprabets',
        tipico_de: 'Tipico (DE)',
        unibet_eu: 'Unibet'
    }

    const AUBookmakers = ['betfair_ex_au', 'betr_au', 'betright', 'bluebet', 'ladbrokes_au', 'neds', 'playup', 'pointsbetau', 'sportsbet', 'tab', 'tabtouch', 'topsport', 'unibet']
    const USBookmakers = ['betonlineag', 'betmgm', 'betus', 'bovada', 'williamhill_us', 'draftkings', 'lowvig', 'mybookieag', 'superbook', 'unibet_us', 'wynnbet']
    const UKBookmakers = ['sport888', 'betfair_ex_uk', 'betfair_sb_uk', 'betvictor', 'betway', 'boylesports', 'casumo', 'coral', 'grosvenor', 'ladbrokes_uk', 'leovegas', 'livescorebet', 'matchbook', 'mrgreen', 'paddypower', 'skybet', 'unibet_uk', 'virginbet', 'williamhill']
    const EUBookmakers = ['onexbet', 'sport888', 'betclic', 'betanysports', 'betfair_ex_eu', 'betonlineag', 'betsson', 'betvictor', 'coolbet', 'everygame', 'gtbets', 'livescorebet_eu', 'marathonbet', 'matchbook', 'mybookieag', 'nordicbet', 'pinnacle', 'suprabets', 'tipico_de', 'unibet_eu', 'williamhill'];

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
            switch (region) {
                case 'au':
                    setSelectedBookmakers(new Set(AUBookmakers))
                    localStorage.setItem('selectedBookmakers', JSON.stringify(AUBookmakers))
                    break
                case 'us':
                    setSelectedBookmakers(new Set(USBookmakers))
                    localStorage.setItem('selectedBookmakers', JSON.stringify(USBookmakers))
                    break
                case 'uk':
                    setSelectedBookmakers(new Set(UKBookmakers))
                    localStorage.setItem('selectedBookmakers', JSON.stringify(UKBookmakers))
                    break
                case 'eu':
                    setSelectedBookmakers(new Set(EUBookmakers))
                    localStorage.setItem('selectedBookmakers', JSON.stringify(EUBookmakers))
                    break
                default:
                    setSelectedBookmakers(new Set())
                    localStorage.setItem('selectedBookmakers', JSON.stringify([]))
                    break
            }
        }
    }

    function handleBookmakerSelected(bookmaker) {
        const newBookmakers = new Set(selectedBookmakers)
        if (newBookmakers.has(bookmaker)) {
            newBookmakers.delete(bookmaker)
        } else {
            newBookmakers.add(bookmaker)
        }
        localStorage.setItem('selectedBookmakers', JSON.stringify(Array.from(newBookmakers)))
        setSelectedBookmakers(newBookmakers)
    }

    function renderBookmakers() {
        switch (selectedRegion) {
            case 'au':
                return AUBookmakers.map(bookmaker => (
                    <Button
                        key={bookmaker}
                        variant="contained"
                        color={selectedBookmakers.has(bookmaker) ? 'primary' : 'inherit'}
                        onClick={() => handleBookmakerSelected(bookmaker)}
                        size='small'
                    >
                        {bookmakerKeyToName[bookmaker]}
                    </Button>
                ))
            case 'us':
                return USBookmakers.map(bookmaker => (
                    <Button
                        key={bookmaker}
                        variant="contained"
                        color={selectedBookmakers.has(bookmaker) ? 'primary' : 'inherit'}
                        onClick={() => handleBookmakerSelected(bookmaker)}
                        size='small'
                    >
                        {bookmakerKeyToName[bookmaker]}
                    </Button>
                ))
            case 'uk':
                return UKBookmakers.map(bookmaker => (
                    <Button
                        key={bookmaker}
                        variant="contained"
                        color={selectedBookmakers.has(bookmaker) ? 'primary' : 'inherit'}
                        onClick={() => handleBookmakerSelected(bookmaker)}
                        size='small'
                    >
                        {bookmakerKeyToName[bookmaker]}
                    </Button>
                ))
            case 'eu':
                return EUBookmakers.map(bookmaker => (
                    <Button
                        key={bookmaker}
                        variant="contained"
                        color={selectedBookmakers.has(bookmaker) ? 'primary' : 'inherit'}
                        onClick={() => handleBookmakerSelected(bookmaker)}
                        size='small'
                    >
                        {bookmakerKeyToName[bookmaker]}
                    </Button>
                ))
            default:
                return (
                    <Alert severity="error" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        No bookmakers available for this region.
                    </Alert>
                )
        }
    }

    return (
        useMediaQuery('(max-width:600px)') ? (
            <>
                <Paper elevation={5} sx={{ maxWidth: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5', mb: 2 }}>
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
                </Paper>

                <Paper elevation={5} sx={{ maxWidth: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 3: Select Region</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 1, px: 3 }}>
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

                <Paper elevation={5} sx={{ maxWidth: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2 }}>Step 4: Select Bookmakers</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {renderBookmakers()}
                    </Box>
                </Paper>
            </>
        ) : (
            <Paper elevation={5} sx={{ maxWidth: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
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

                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 3: Select Region</Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
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

                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2 }}>Step 4: Select Bookmakers</Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {renderBookmakers()}
                </Box>
            </Paper>
        )
    )
}
