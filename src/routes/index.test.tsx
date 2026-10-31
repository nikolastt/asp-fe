import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/testing/render'

describe('/', () => {
  it('renders the home page', async () => {
    await renderRoute('/')
    expect(
      await screen.findByRole('heading', { name: 'ASP' }),
    ).toBeInTheDocument()
  })
})
