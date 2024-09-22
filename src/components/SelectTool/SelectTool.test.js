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

    const renderSelectTools = (selectedTool = 'arbitrage', selectedRegion = 'au', selectedBookmakers = new Set()) => {
        render(<SelectTool selectedTool={selectedTool} setSelectedTool={setSelectedTool} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} selectedBookmakers={selectedBookmakers} setSelectedBookmakers={setSelectedBookmakers}/>)
    }

    it('renders correctly', () => {
        renderSelectTools()
        expect(screen.getByText('Step 2: Select Betting Tool')).toBeInTheDocument()
        expect(screen.getByText('Arbitrage Betting')).toBeInTheDocument()
        expect(screen.getByText('Value Betting')).toBeInTheDocument()
        expect(screen.getByText('Step 3: Select Region')).toBeInTheDocument()
        expect(screen.getByText('Australia')).toBeInTheDocument()
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

    it('handles region button click', () => {
        renderSelectTools()

        const USAButton = screen.getByText('USA')
        fireEvent.click(USAButton)

        expect(setSelectedRegion).toHaveBeenCalledWith('us')
        expect(window.localStorage.getItem('selectedRegion')).toBe('us')
    })

    it('does not call setSelectedRegion if button is already selected', () => {
        renderSelectTools()

        const AUButton = screen.getByText('Australia')
        fireEvent.click(AUButton)

        expect(setSelectedRegion).not.toHaveBeenCalled()
    })
})