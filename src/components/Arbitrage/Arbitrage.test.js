import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Arbitrage from './Arbitrage'

describe('Arbitrage Component', () => {
    it('renders correctly', () => {
        render(<Arbitrage />)
        expect(screen.getByText('Step 5: Arbitrage Opportunities')).toBeInTheDocument();
    })
})