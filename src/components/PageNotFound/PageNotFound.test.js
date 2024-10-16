import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PageNotFound from './PageNotFound'

describe('PageNotFound Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    )
  })

  it('renders pagenotfound page', () => {
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})