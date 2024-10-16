import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Calculate from './Calculate'
import { mockMatchData } from '../../mockData'

describe('Calculate Component', () => {
    function renderCalculate() {
        render(<Calculate match={mockMatchData}/>)
    }

    it('renders correctly', () => {
        renderCalculate()
        expect(screen.getByText('Calculate Bet')).toBeInTheDocument()
    })

    it('allows changing bet amount', async () => {
        const user = userEvent.setup()
        renderCalculate()

        const betAmountInput = screen.getByLabelText('Amount')
        await user.type(betAmountInput, '100')

        expect(betAmountInput).toHaveValue(100)
    })
})