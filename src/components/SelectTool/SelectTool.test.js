import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectTool from './SelectTool'
import { localStorageMock } from '../../mockData'

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

describe('SelectTool Component', () => {
    const setSelectedTool = jest.fn()

    it('renders correctly', () => {
        render(<SelectTool selectedTool='arbitrage' setSelectedTool='setSelectedTool' />)
        expect(screen.getByText('Step 2: Select Betting Tool')).toBeInTheDocument()
        expect(screen.getByText('Arbitrage Betting')).toBeInTheDocument()
        expect(screen.getByText('Value Betting')).toBeInTheDocument()
    })

    it('handles value button click', () => {
        render(<SelectTool selectedTool='arbitrage' setSelectedTool={setSelectedTool} />)

        const valueButton = screen.getByText('Value Betting')
        fireEvent.click(valueButton)

        expect(setSelectedTool).toHaveBeenCalledWith('value')
        expect(window.localStorage.getItem('selectedTool')).toBe('value')
    })

    it('handles arbitrage button click', () => {
        render(<SelectTool selectedTool='value' setSelectedTool={setSelectedTool} />)

        const arbitrageButton = screen.getByText('Arbitrage Betting')
        fireEvent.click(arbitrageButton)

        expect(setSelectedTool).toHaveBeenCalledWith('arbitrage')
        expect(window.localStorage.getItem('selectedTool')).toBe('arbitrage')
    })

    it('does not call setSelectedTool if button is already selected', () => {
        render(<SelectTool selectedTool='arbitrage' setSelectedTool={setSelectedTool} />)

        const arbitrageButton = screen.getByText('Arbitrage Betting')
        fireEvent.click(arbitrageButton)

        expect(setSelectedTool).not.toHaveBeenCalled()
    })
})