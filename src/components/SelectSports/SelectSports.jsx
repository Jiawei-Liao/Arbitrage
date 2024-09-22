import { useState } from 'react'
import { Paper, Typography, Divider, Box, Alert, Checkbox, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export default function SelectSports({ sports, selectedSports, setSelectedSports }) {
    const [collapsedGroups, setCollapsedGroups] = useState({})

    const toggleSelectAll = (group) => {
        const groupSports = sports.filter(sport => sport.group === group)
        const allSelected = groupSports.every(sport => selectedSports.has(sport.key))
    
        setSelectedSports(prev => {
            const newSelection = new Set(prev)
    
            groupSports.forEach(sport => {
                if (allSelected) {
                    newSelection.delete(sport.key)
                } else {
                    newSelection.add(sport.key)
                }
            })
    
            localStorage.setItem('selectedSports', JSON.stringify(Array.from(newSelection)))
            return newSelection
        })
    }

    const handleSportChange = (key) => {
        setSelectedSports(prev => {
            const updatedSet = new Set(prev)
            
            if (updatedSet.has(key)) {
                updatedSet.delete(key)
            } else {
                updatedSet.add(key)
            }
            localStorage.setItem('selectedSports', JSON.stringify(Array.from(updatedSet)))
            return updatedSet
        })
    }

    const toggleGroupCollapse = (group) => {
        setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }))
    }

    const groupedSports = sports ? sports.reduce((groups, sport) => {
        (groups[sport.group] = groups[sport.group] || []).push(sport)
        return groups
    }, {}) : {}

    return (
        <Paper elevation={5} sx={{ maxWidth: 500, maxHeight: { xs: 'none', sm: 500 }, p: 3, mt: 2, display: 'flex', flexDirection: 'column', gap: 2, overflowY: { xs: 'visible', sm: 'auto' }, borderRadius: '12px', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Step 5: Select Sports</Typography>
            <Divider />
            {sports === null ? (
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Alert severity="info" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        Validate an API key to find available sports.
                    </Alert>
                </Box>
            ) : (
                Object.keys(groupedSports).length > 0 ? (
                    Object.keys(groupedSports).map((group) => (
                        <div key={group}>
                            <Typography
                                variant="h6"
                                onClick={() => toggleGroupCollapse(group)}
                                sx={{ cursor: 'pointer', mt: 2, bgcolor: '#e0e0e0', borderRadius: '8px', padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:hover': { bgcolor: '#d5d5d5' } }}
                            >
                                {group}
                                {collapsedGroups[group] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Typography>
                            {!collapsedGroups[group] && (
                                <Box sx={{ pl: 2, mt: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => toggleSelectAll(group)}
                                        sx={{ bgcolor: '#007bff', color: '#fff', '&:hover': { bgcolor: '#0056b3' }, mb: 1 }}
                                    >
                                        Select/Deselect All
                                    </Button>
                                    {groupedSports[group].map(sport => (
                                        <Box key={sport.key} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <Checkbox
                                                id={`checkbox-${sport.key}`}
                                                checked={selectedSports.has(sport.key)}
                                                onChange={() => handleSportChange(sport.key)}
                                                sx={{ '&.Mui-checked': { color: '#007bff' } }}
                                            />
                                            <label htmlFor={`checkbox-${sport.key}`}>
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    {sport.title} - {sport.description}
                                                </Typography>
                                            </label>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </div>
                    ))
                ) : (
                    <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert severity="error" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            No sports available, try again later.
                        </Alert>
                    </Box>
                )
            )}
        </Paper>
    )
}
