import { render, screen } from '@testing-library/react'
import BottomNav from '../BottomNav'
import { BrowserRouter } from 'react-router-dom'

describe('BottomNav', () => {
	it('should render the three menu items', () => {
		render(<BottomNav />, { wrapper: BrowserRouter })

		expect(screen.getByText('Feed')).toBeInTheDocument()
		expect(screen.getByText('Upload')).toBeInTheDocument()
		expect(screen.getByText('Map')).toBeInTheDocument()
	})
})
