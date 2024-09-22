import { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'

import APICard from './components/APICard/APICard'
import SelectTool from './components/SelectTool/SelectTool'
import SelectSports from './components/SelectSports/SelectSports'
import Arbitrage from './components/Arbitrage/Arbitrage'
import Calculate from './components/Calculate/Calculate'

import DEFAULT_API_KEY from './DefaultAPIKey'
import './App.css'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

function App() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState('')
    const [APIKey, setAPIKey] = useState(() => {
        return localStorage.getItem('APIKey') || DEFAULT_API_KEY
    })
    const [sports, setSports] = useState(null)
    const [selectedTool, setSelectedTool] = useState(() => {
        return localStorage.getItem('selectedTool') || 'arbitrage'
    })
    const [selectedRegion, setSelectedRegion] = useState(() => {
        return localStorage.getItem('selectedRegion') || 'au'
    })
    const [selectedSports, setSelectedSports] = useState(() => {
        const storedSports = localStorage.getItem('selectedSports')
        return storedSports ? new Set(JSON.parse(storedSports)) : new Set()
    })
    const [selectedBookmakers, setSelectedBookmakers] = useState(() => {
        const storedBookmakers = localStorage.getItem('selectedBookmakers')
        return storedBookmakers ? new Set(JSON.parse(storedBookmakers)) : new Set(['betfair_ex_au', 'betr_au', 'betright', 'bluebet', 'ladbrokes_au', 'neds', 'playup', 'pointsbetau', 'sportsbet', 'tab', 'tabtouch', 'topsport', 'unibet'])
    })
    const [selectedMatch, setSelectedMatch] = useState(null)

    function updateSelectedSports(sports) {
        setSports(sports)
        
        const validSportsKeys = new Set(sports.map(sport => sport.key))
        setSelectedSports(prevSelected => {
            return new Set(
                Array.from(prevSelected).filter(sport => validSportsKeys.has(sport))
            )
        })

        localStorage.setItem('selectedSports', JSON.stringify(Array.from(selectedSports)))
    }

    function clickMatch(match) {
        setSelectedMatch(match)
        setCurrentIndex(4)
    }

    const components = [
        <APICard key="APICard" APIKey={APIKey} setAPIKey={setAPIKey} setSports={updateSelectedSports} />,
        <SelectTool key="selectTool" selectedTool={selectedTool} setSelectedTool={setSelectedTool} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedBookmakers={selectedBookmakers} setSelectedBookmakers={setSelectedBookmakers}/>,
        <SelectSports key="selectRegionSports" sports={sports} selectedSports={selectedSports} setSelectedSports={setSelectedSports} />,
        <Arbitrage key="arbitrage" APIKey={APIKey} sports={selectedSports} region={selectedRegion} bookmakers={selectedBookmakers} validatedAPI={sports !== null} tool={selectedTool} clickMatch={clickMatch} />,
        <Calculate match={selectedMatch} />
    ]

    function handleNext() {
        setDirection('right')
        setCurrentIndex((prev) => (prev + 1) % components.length)
    }

    function handleBack() {
        setDirection('left')
        setCurrentIndex((prev) => (prev - 1 + components.length) % components.length)
    }

    return (
        useMediaQuery('(max-width:600px)') ? (
            <Box sx={{ p: 2, overflowY: 'auto', maxHeight: '100vh' }}>
                <APICard key="APICard" APIKey={APIKey} setAPIKey={setAPIKey} setSports={updateSelectedSports} />,
                <SelectTool key="selectTool" selectedTool={selectedTool} setSelectedTool={setSelectedTool} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedBookmakers={selectedBookmakers} setSelectedBookmakers={setSelectedBookmakers}/>,
                <SelectSports key="selectRegionSports" sports={sports} selectedSports={selectedSports} setSelectedSports={setSelectedSports} />,
                <Arbitrage key="arbitrage" APIKey={APIKey} sports={selectedSports} region={selectedRegion} bookmakers={selectedBookmakers} validatedAPI={sports !== null} tool={selectedTool} clickMatch={clickMatch} />,
                <Calculate match={selectedMatch} />
                <Box sx={{ height: 30 }} />
            </Box>
        ) : ( 
            <Box className='container'>
                <Box className='nav-button left' role='button' aria-label='back' onClick={handleBack} sx={{ display: (currentIndex <= 0) ? 'none' : 'flex' }}>
                    <Box className='nav-button left-background' sx={{ display: (currentIndex <= 0) ? 'none' : 'flex' }} />
                    <ArrowBackIosNewIcon />
                </Box>
                {components.map((component, index) => {
                    const isActive = index === currentIndex
                    const isEntering = index === (currentIndex + (direction === 'right' ? 1 : -1) + components.length) % components.length
                    const isLeaving = index === (currentIndex - (direction === 'right' ? 1 : -1) + components.length) % components.length

                    return (
                    <Box
                        key={index}
                        className={`carousel-card ${isActive ? 'active' : ''} ${isEntering ? 'entering' : ''} ${isLeaving ? 'leaving' : ''} ${direction}`}
                    >
                        {component}
                    </Box>
                    )
                })}
                <Box className='nav-button right' role='button' aria-label='next' onClick={handleNext} sx={{ display: (currentIndex >= components.length - 2) ? 'none' : 'flex'}}>
                    <Box className='nav-button right-background' sx={{ display: (currentIndex >= components.length - 1) ? 'none' : 'flex' }} />
                    <ArrowForwardIosIcon />
                </Box>
            </Box>
        )
    )
}

export default App
