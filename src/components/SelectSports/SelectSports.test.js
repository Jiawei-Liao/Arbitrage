import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectSports from './SelectSports'
import { mockSportsData } from '../../mockData'

describe('SelectSports Component', () => {
    const setSelectedSports = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    function renderSelectSports(sports = null, selectedSports = new Set()) {
        render(<SelectSports sports={sports} selectedSports={selectedSports} setSelectedSports={setSelectedSports} />)
    }

    it('renders correctly', () => {
        renderSelectSports()
        expect(screen.getByText('Step 5: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Validate an API key to find available sports.')).toBeInTheDocument()
    })

    it('renders correctly with no sports', () => {
        renderSelectSports([])
        expect(screen.getByText('Step 5: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('No sports available, try again later.')).toBeInTheDocument()
    })

    it('renders correctly with sports', () => {
        renderSelectSports(mockSportsData)
        expect(screen.getByText('Step 5: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Aussie Rules')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
        expect(screen.getByText('Cricket')).toBeInTheDocument()
    })

    it('renders correctly with selected sports', () => {
        renderSelectSports(mockSportsData, new Set(['aussierules_afl']))
        expect(screen.getByText('Step 5: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Aussie Rules')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
        expect(screen.getByText('Cricket')).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })).toBeChecked()
    })
    
    it('handles sport selection', () => {
        const initialSelectedSports = new Set()
        renderSelectSports(mockSportsData, initialSelectedSports)

        const checkbox = screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })
        fireEvent.click(checkbox)

        const updaterFunction = setSelectedSports.mock.calls[0][0]
        const newState = updaterFunction(initialSelectedSports)

        expect(newState).toEqual(new Set(['aussierules_afl']))
    })

    it('handles sport deselection', () => {
        const initialSelectedSports = new Set(['aussierules_afl'])
        renderSelectSports(mockSportsData, initialSelectedSports)

        const checkbox = screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })
        fireEvent.click(checkbox)

        const updaterFunction = setSelectedSports.mock.calls[0][0]
        const newState = updaterFunction(initialSelectedSports)

        expect(newState).toEqual(new Set())

    })

    it('handles select all', () => {
        const initialSelectedSports = new Set()
        renderSelectSports(mockSportsData, initialSelectedSports)
    
        const selectAllButtons = screen.getAllByText('Select/Deselect All')
        fireEvent.click(selectAllButtons[0])
    
        expect(setSelectedSports).toHaveBeenCalledTimes(1)
        const updaterFunction = setSelectedSports.mock.calls[0][0]
        
        const newState = updaterFunction(initialSelectedSports)
        expect(newState).toEqual(new Set(['aussierules_afl']))
    })
    
    it('handles deselect all', () => {
        const initialSelectedSports = new Set(['aussierules_afl', 'basketball_nba', 'cricket_test_match'])
        renderSelectSports(mockSportsData, initialSelectedSports)
    
        const selectAllButtons = screen.getAllByText('Select/Deselect All')
        fireEvent.click(selectAllButtons[0])

        expect(setSelectedSports).toHaveBeenCalledTimes(1)
        const updaterFunction = setSelectedSports.mock.calls[0][0]
    
        const newState = updaterFunction(initialSelectedSports)
    
        expect(newState).toEqual(new Set(['basketball_nba', 'cricket_test_match']))
    })
    
    it('handles group collapse', () => {
        renderSelectSports(mockSportsData)
        const groupHeader = screen.getByText('Aussie Rules')
        fireEvent.click(groupHeader)
        expect(screen.queryByText('AFL - Aussie Football')).not.toBeInTheDocument()
    })

    it('handles group expand', () => {
        renderSelectSports(mockSportsData)
        const groupHeader = screen.getByText('Aussie Rules')
        fireEvent.click(groupHeader)
        fireEvent.click(groupHeader)
        expect(screen.getByText('AFL - Aussie Football')).toBeInTheDocument()
    })
})
