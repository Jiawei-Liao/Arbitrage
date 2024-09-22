import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Arbitrage from './Arbitrage'

describe('Arbitrage Component', () => {
    function renderArbitrage() {
        render(<Arbitrage />)
    }

    it('renders correctly', () => {
        renderArbitrage()
        expect(screen.getByText('Step 6: Arbitrage Opportunities')).toBeInTheDocument()
    })
})