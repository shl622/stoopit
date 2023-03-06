import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

// This lets us mock the routing function and check if it is called correctly
// otherwise, we need an end-to-end test to actually test the routing efficiently
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate
}))
describe('App', () => {
	it('should route to the correct pages', async () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)
		// Setup userEvent, a library that simulates user actions like clicking
		const user = userEvent.setup()

		// await act() simulates the loading of the app, it runs useEffects and other hooks before load
		await act(async () => {
			await user.click(screen.getByText('Map'))
			expect(mockNavigate).toHaveBeenCalledWith('/map')

			await user.click(screen.getByText('Feed'))
			expect(mockNavigate).toHaveBeenCalledWith('/feed')
		})
	})

	it('should upload images and route to /upload', async () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)
		const user = userEvent.setup()

		// Mock the function that turns the image file into a URL
		window.URL.createObjectURL = jest
			.fn()
			.mockImplementation(() => 'imageurl')

		await act(async () => {
			const fakeFile = new File(['image'], 'image.png', {
				type: 'image/png'
			})
			await user.upload(screen.getByLabelText('Upload'), fakeFile)
			expect(mockNavigate).toHaveBeenCalledWith('/upload', {
				state: { imageSrc: 'imageurl' }
			})
		})
	})
})
