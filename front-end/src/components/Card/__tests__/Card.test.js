import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
	it('should render all props', () => {
		render(
			<Card
				title="Card Title"
				description="Description"
				image="Image Link"
			/>
		)

		expect(screen.getByText('Card Title')).toBeInTheDocument()
		expect(screen.getByText('Description')).toBeInTheDocument()
		expect(screen.getByRole('img')).toHaveAttribute('src', 'Image Link')
	})
})
