import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectTool from './SelectTool'
import { localStorageMock } from '../../mockData'

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

describe('SelectTool Component', () => {
    const setSelectedTool = jest.fn()
    const setSelectedRegion = jest.fn()
    const setSelectedBookmakers = jest.fn()

    function renderSelectTools(selectedTool = 'arbitrage', selectedRegion = 'au', selectedBookmakers = new Set()) {
        render(<SelectTool selectedTool={selectedTool} setSelectedTool={setSelectedTool} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedBookmakers={selectedBookmakers} setSelectedBookmakers={setSelectedBookmakers}/>)
    }

    it('renders correctly', () => {
        renderSelectTools()
        expect(screen.getByText('Step 2: Select Betting Tool')).toBeInTheDocument()
        expect(screen.getByText('Arbitrage Betting')).toBeInTheDocument()
        expect(screen.getByText('Value Betting')).toBeInTheDocument()
        expect(screen.getByText('Step 3: Select Region')).toBeInTheDocument()
        expect(screen.getByText('Australia')).toBeInTheDocument()
        expect(screen.getByText('Step 4: Select Bookmakers')).toBeInTheDocument()
        expect(screen.getByText('TABtouch')).toBeInTheDocument()
    })

    it('handles value button click', () => {
        renderSelectTools()

        const valueButton = screen.getByText('Value Betting')
        fireEvent.click(valueButton)

        expect(setSelectedTool).toHaveBeenCalledWith('value')
        expect(window.localStorage.getItem('selectedTool')).toBe('value')
    })

    it('handles arbitrage button click', () => {
        renderSelectTools('value')

        const arbitrageButton = screen.getByText('Arbitrage Betting')
        fireEvent.click(arbitrageButton)

        expect(setSelectedTool).toHaveBeenCalledWith('arbitrage')
        expect(window.localStorage.getItem('selectedTool')).toBe('arbitrage')
    })

    it('does not call setSelectedTool if button is already selected', () => {
        renderSelectTools()

        const arbitrageButton = screen.getByText('Arbitrage Betting')
        fireEvent.click(arbitrageButton)

        expect(setSelectedTool).not.toHaveBeenCalled()
    })

    it('handles USA region button click', () => {
        renderSelectTools()

        const USAButton = screen.getByText('USA')
        fireEvent.click(USAButton)

        expect(setSelectedRegion).toHaveBeenCalledWith('us')
        expect(window.localStorage.getItem('selectedRegion')).toBe('us')
    })

    it('handles UK region button click', () => {
        renderSelectTools()

        const UKButton = screen.getByText('UK')
        fireEvent.click(UKButton)

        expect(setSelectedRegion).toHaveBeenCalledWith('uk')
        expect(window.localStorage.getItem('selectedRegion')).toBe('uk')
    })

    it('handles Europe region button click', () => {
        renderSelectTools()
        const EUButton = screen.getByText('Europe')
        fireEvent.click(EUButton)

        expect(setSelectedRegion).toHaveBeenCalledWith('eu')
        expect(window.localStorage.getItem('selectedRegion')).toBe('eu')
    })

    it('handles Australia region button click', () => {
        renderSelectTools('arbitrage', 'us')

        const AUButton = screen.getByText('Australia')
        fireEvent.click(AUButton)

        expect(setSelectedRegion).toHaveBeenCalledWith('au')
        expect(window.localStorage.getItem('selectedRegion')).toBe('au')
    })

    it('does not call setSelectedRegion if button is already selected', () => {
        renderSelectTools()

        const AUButton = screen.getByText('Australia')
        fireEvent.click(AUButton)

        expect(setSelectedRegion).not.toHaveBeenCalled()
    })

    it('handles bookmaker button click to add', () => {
        renderSelectTools()

        const bookmakerButton = screen.getByText('TABtouch')
        fireEvent.click(bookmakerButton)

        expect(setSelectedBookmakers).toHaveBeenCalledWith(new Set(['tabtouch']))
        expect(window.localStorage.getItem('selectedBookmakers')).toBe('["tabtouch"]')
    })

    it('handles bookmaker button click to remove', () => {
        renderSelectTools('arbitrage', 'au', new Set(['tabtouch']))

        const bookmakerButton = screen.getByText('TABtouch')
        fireEvent.click(bookmakerButton)

        expect(setSelectedBookmakers).toHaveBeenCalledWith(new Set())
        expect(window.localStorage.getItem('selectedBookmakers')).toBe('[]')
    })

    it('renders invalid region message', () => {
        renderSelectTools('arbitrage', 'abc')

        expect(screen.getByText('No bookmakers available for this region.')).toBeInTheDocument()
    })

    it('handles changing tool', () => {
        renderSelectTools('value')

        const arbitrageButton = screen.getByText('Arbitrage Betting')
        fireEvent.click(arbitrageButton)

        expect(setSelectedTool).toHaveBeenCalledWith('arbitrage')
        expect(window.localStorage.getItem('selectedTool')).toBe('arbitrage')
    })
})