import { act, render, screen } from '@testing-library/react'
import FullMap from '../FullMap'
import { initialize } from '@googlemaps/jest-mocks'
import mapContext from '../../../../context/map'

beforeAll(() => {
	initialize()
})

const mockStoops = [
	{
		id: '1234567',
		location: { lat: 40.7209, lng: -73.9961 },
		locationName: '123 Main St, New York, NY 10001',
		title: 'Red Sofa',
		date: 'Mar 1, 2023',
		image: 'https://stoopit-data.s3.us-east-2.amazonaws.com/mockdata/redsofa.jpg',
		description: 'Red sofa, in pristine condition.'
	}
]

const mockMapContext = {
	currentPosition: { lat: 40.7209, lng: -73.9961 }
}

describe('FullMap', () => {
	it('should render the map correctly', async () => {
		render(
			<FullMap center={mockStoops[0].location} stoops={mockStoops} />,
			{
				wrapper: ({ children }) => (
					<mapContext.Provider value={mockMapContext}>
						{children}
					</mapContext.Provider>
				)
			}
		)
		await act(async () => {
			expect(screen.getByTestId('full-map')).toBeInTheDocument()
		})
	})
})
