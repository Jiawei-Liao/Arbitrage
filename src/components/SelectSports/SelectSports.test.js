import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectSports from './SelectSports'
import { mockSportsData } from '../../mockData'

describe('SelectSports Component', () => {
    const setSelectedSports = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders correctly', () => {
        render(<SelectSports sports={null} selectedSports={{}} setSelectedSports={() => {}} />)
        expect(screen.getByText('Step 4: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Validate an API key to find available sports.')).toBeInTheDocument()
    })

    it('renders correctly with no sports', () => {
        render(<SelectSports sports={[]} selectedSports={{}} setSelectedSports={() => {}} />)
        expect(screen.getByText('Step 4: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('No sports available, try again later.')).toBeInTheDocument()
    })

    it('renders correctly with sports', () => {
        render(<SelectSports sports={mockSportsData} selectedSports={{}} setSelectedSports={() => {}} />)
        expect(screen.getByText('Step 4: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Aussie Rules')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
        expect(screen.getByText('Cricket')).toBeInTheDocument()
    })

    it('renders correctly with selected sports', () => {
        render(<SelectSports sports={mockSportsData} selectedSports={{ aussierules_afl: true }} setSelectedSports={() => {}} />)
        expect(screen.getByText('Step 4: Select Sports')).toBeInTheDocument()
        expect(screen.getByText('Aussie Rules')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
        expect(screen.getByText('Cricket')).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })).toBeChecked()
    })
    
    it('handles sport selection', () => {
        const initialSelectedSports = {}
        render(<SelectSports sports={mockSportsData} selectedSports={initialSelectedSports} setSelectedSports={setSelectedSports} />)

        const checkbox = screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })
        fireEvent.click(checkbox)

        const updaterFunction = setSelectedSports.mock.calls[0][0]
        const newState = updaterFunction(initialSelectedSports)

        expect(newState).toEqual({
            aussierules_afl: true
        })
    })

    it('handles sport deselection', () => {
        const initialSelectedSports = { aussierules_afl: true }
        render(<SelectSports sports={mockSportsData} selectedSports={initialSelectedSports} setSelectedSports={setSelectedSports} />)

        const checkbox = screen.getByRole('checkbox', { name: /AFL - Aussie Football/i })
        fireEvent.click(checkbox)

        const updaterFunction = setSelectedSports.mock.calls[0][0]
        const newState = updaterFunction(initialSelectedSports)

        expect(newState).toEqual({
            aussierules_afl: false 
        })
    })

    it('handles select all', () => {
        const initialSelectedSports = {}
        render(<SelectSports sports={mockSportsData} selectedSports={initialSelectedSports} setSelectedSports={setSelectedSports} />)
    
        const selectAllButtons = screen.getAllByText('Select/Deselect All')
        fireEvent.click(selectAllButtons[0])
    
        expect(setSelectedSports).toHaveBeenCalledTimes(1)
        const updaterFunction = setSelectedSports.mock.calls[0][0]
    
        const newState = updaterFunction(initialSelectedSports)
        expect(newState).toEqual({
            aussierules_afl: true
        })
    })
    
    it('handles deselect all', () => {
        const initialSelectedSports = { 
            aussierules_afl: true, 
            basketball_nba: true, 
            cricket_test_match: true 
        }
        render(<SelectSports sports={mockSportsData} selectedSports={initialSelectedSports} setSelectedSports={setSelectedSports} />)
    
        const selectAllButtons = screen.getAllByText('Select/Deselect All')
        fireEvent.click(selectAllButtons[0])
    
        expect(setSelectedSports).toHaveBeenCalledTimes(1)
        const updaterFunction = setSelectedSports.mock.calls[0][0]
    
        const newState = updaterFunction(initialSelectedSports)
    
        expect(newState).toEqual({
            aussierules_afl: false,
            basketball_nba: true,
            cricket_test_match: true
        })
    })
    

    it('handles group collapse', () => {
        render(<SelectSports sports={mockSportsData} selectedSports={{}} setSelectedSports={() => {}} />)
        const groupHeader = screen.getByText('Aussie Rules')
        fireEvent.click(groupHeader)
        expect(screen.queryByText('AFL - Aussie Football')).not.toBeInTheDocument()
    })

    it('handles group expand', () => {
        render(<SelectSports sports={mockSportsData} selectedSports={{}} setSelectedSports={() => {}} />)
        const groupHeader = screen.getByText('Aussie Rules')
        fireEvent.click(groupHeader)
        fireEvent.click(groupHeader)
        expect(screen.getByText('AFL - Aussie Football')).toBeInTheDocument()
    })
})
