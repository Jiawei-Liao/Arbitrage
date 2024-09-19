import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import APICard from './APICard'
import { mockSportsData, mockSuccessResponse, mockErrorResponse } from './mockData'

global.fetch = jest.fn()

describe('APICard Component', () => {
    const mockSetAPIKey = jest.fn()
    const mockSetSports = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders correctly', () => {
        render(<APICard APIKey='' setAPIKey={mockSetAPIKey} setSports={mockSetSports} />)
        expect(screen.getByText('Step 1: Enter an API key')).toBeInTheDocument()
        expect(screen.getByLabelText('API Key')).toBeInTheDocument()
        expect(screen.getByText('Validate Key')).toBeInTheDocument()
        expect(screen.getByText('Get an API Key')).toBeInTheDocument()
    })

    it('handles valid API key', async () => {
        global.fetch.mockResolvedValueOnce(mockSuccessResponse)

        render(<APICard APIKey='' setAPIKey={mockSetAPIKey} setSports={mockSetSports} />)
        
        const input = screen.getByLabelText('API Key')
        fireEvent.change(input, { target: { value: 'valid-key' } })
        expect(input).toHaveValue('valid-key')
        
        const validateButton = screen.getByText('Validate Key')
        await act(async () => {
            fireEvent.click(validateButton)
        })

        await waitFor(() => {
            expect(screen.getByText((content, element) => 
                content.includes('Valid API key! Quota remaining:') &&
                content.includes('100') &&
                element.tagName.toLowerCase() === 'div'
            )).toBeInTheDocument()
        })

        expect(mockSetAPIKey).toHaveBeenCalledWith('valid-key')
        expect(mockSetSports).toHaveBeenCalledWith(mockSportsData)
    })

    it('handles invalid API key', async () => {
        global.fetch.mockResolvedValueOnce(mockErrorResponse)

        render(<APICard APIKey='' setAPIKey={mockSetAPIKey} setSports={mockSetSports} />)
        
        const input = screen.getByLabelText('API Key')
        fireEvent.change(input, { target: { value: 'invalid-key' } })
        expect(input).toHaveValue('invalid-key')

        const validateButton = screen.getByText('Validate Key')
        await act(async () => {
            fireEvent.click(validateButton)
        })

        await waitFor(() => {
            expect(screen.getByText('Invalid API key.')).toBeInTheDocument()
        })

        expect(mockSetAPIKey).not.toHaveBeenCalled()
        expect(mockSetSports).not.toHaveBeenCalled()
    })

    it('handles fetch error', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Fetch failed'))

        render(<APICard APIKey='' setAPIKey={mockSetAPIKey} setSports={mockSetSports} />)

        const input = screen.getByLabelText('API Key')
        fireEvent.change(input, { target: { value: 'invalid-key' } })
        expect(input).toHaveValue('invalid-key')

        const validateButton = screen.getByText('Validate Key')
        await act(async () => {
            fireEvent.click(validateButton)
        })

        await waitFor(() => {
            expect(screen.getByText('Invalid API key.')).toBeInTheDocument()
        })

        expect(mockSetAPIKey).not.toHaveBeenCalled()
        expect(mockSetSports).not.toHaveBeenCalled()
    })

    it('opens link in new tab', () => {
        window.open = jest.fn()

        render(<APICard APIKey='' setAPIKey={mockSetAPIKey} setSports={mockSetSports} />)

        const getAPIKeyButton = screen.getByText('Get an API Key')
        fireEvent.click(getAPIKeyButton)

        expect(window.open).toHaveBeenCalledWith('https://the-odds-api.com/#get-access', '_blank')
    })

})