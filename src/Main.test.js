import { render, screen, fireEvent } from '@testing-library/react'
import Main from './Main'

describe('Main', () => {
    it('renders correctly', () => {
        render(<Main />)
        const step1Carousel = screen.getByText(/Step 1: Enter an API key/i)
        expect(step1Carousel).toBeInTheDocument()
    })

    it('moves the carousel', () => {
        render(<Main />)
        const nextButton = screen.getByRole('button', {name: /next/i})
        fireEvent.click(nextButton)
        const step2Carousel = screen.getByText(/Step 2: Select Betting Tool/i)
        expect(step2Carousel).toBeInTheDocument()

        const backButton = screen.getByRole('button', {name: /back/i})
        fireEvent.click(backButton)
        const step1Carousel = screen.getByText(/Step 1: Enter an API key/i)
        expect(step1Carousel).toBeInTheDocument()
    })
})