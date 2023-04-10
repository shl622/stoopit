import { render, screen } from '@testing-library/react'
import Card from '../Card'
import { BrowserRouter } from 'react-router-dom'

describe('Card', () => {
	it('should render all props', () => {
		render(
			<BrowserRouter>
				<Card
					title="Card Title"
					description="Description"
					image="Image Link"
					distanceToStoop={1}
				/>
			</BrowserRouter>
		)

		expect(screen.getByText('Card Title')).toBeInTheDocument()
		expect(screen.getByText('Description')).toBeInTheDocument()
		expect(screen.getByRole('img')).toHaveAttribute('src', 'Image Link')
	})
})
