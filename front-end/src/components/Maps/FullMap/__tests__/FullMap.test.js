import { act, render, screen } from '@testing-library/react'
import FullMap from '../FullMap'
import { Stoops } from '../../../../mockData/db'
import { initialize } from '@googlemaps/jest-mocks'

beforeAll(() => {
	initialize()
})

describe('FullMap', () => {
	test('if it renders the map correctly', async () => {
		render(<FullMap center={Stoops[0].location} />)
		await act(async () => {
			expect(screen.getByTestId('fullMap')).toBeInTheDocument()
		})
	})
})
