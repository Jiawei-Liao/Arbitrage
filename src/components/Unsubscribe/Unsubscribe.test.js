import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import Unsubscribe from './Unsubscribe'

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  deleteDoc: jest.fn(),
}))

jest.mock('../../firebaseConfig', () => ({}))

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'testUserId' }),
  useNavigate: () => mockNavigate,
}))

describe('Unsubscribe Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders unsubscribe page', () => {
    render(
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    )

    expect(screen.getByText('Unsubscribe')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to unsubscribe? This action cannot be undone.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm Unsubscribe' })).toBeInTheDocument()
  })

  it('handles successful unsubscribe', async () => {
    const mockUserData = { email: 'test@example.com' }
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockUserData,
    })

    render(
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Unsubscribe' }))

    await waitFor(() => {
      expect(screen.getByText(`Successfully unsubscribed for ${mockUserData.email}`)).toBeInTheDocument()
    })

    expect(deleteDoc).toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Return to Home' })).toBeInTheDocument()
  })

  it('handles user not found error', async () => {
    getDoc.mockResolvedValue({
      exists: () => false,
    })

    render(
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Unsubscribe' }))

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument()
    })

    expect(deleteDoc).not.toHaveBeenCalled()
  })

  it('handles general error', async () => {
    getDoc.mockRejectedValue(new Error('Test error'))

    render(
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Unsubscribe' }))

    await waitFor(() => {
      expect(screen.getByText('Error unsubscribing. Please try again.')).toBeInTheDocument()
    })

    expect(deleteDoc).not.toHaveBeenCalled()
  })

  it('navigates to home page after successful unsubscribe', async () => {
    const mockUserData = { email: 'test@example.com' }
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockUserData,
    })

    render(
      <MemoryRouter>
        <Unsubscribe />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Unsubscribe' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Return to Home' })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Return to Home' }))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})