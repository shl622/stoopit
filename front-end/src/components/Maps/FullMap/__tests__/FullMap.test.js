import { act, render, screen } from '@testing-library/react'
import FullMap from '../FullMap'
import { Stoops } from '../../../../mockdata/db'
import { initialize } from '@googlemaps/jest-mocks'

beforeAll(() => {
	initialize()
})

describe('FullMap', () => {
	it('should render the map correctly', async () => {
		render(<FullMap center={Stoops[0].location} />)
		await act(async () => {
			expect(screen.getByTestId('full-map')).toBeInTheDocument()
		})
	})
})
