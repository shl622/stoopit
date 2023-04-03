const { randomFloatInRange } = require('../utils/random')

const mockStoops = require('./mockStoops.json')
const generateMockStoops = () => {
	const stoopDatabase = mockStoops.map((stoop) => {
		// Random lat lng in general NYC area
		// lat range 40.5 to 40.9
		// lng range -74 to -73.5
		const randomLocation = {
			lat: randomFloatInRange(40.5, 40.9),
			lng: -randomFloatInRange(73.5, 74)
		}

		return {
			...stoop,
			location: randomLocation
		}
	})

	return stoopDatabase
}

module.exports = {
	stoopDatabase: generateMockStoops()
}
