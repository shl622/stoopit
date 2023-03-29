const generateMockStoops = () =>
	Array(200)
		.fill()
		.map((_, i) => {
			// Random lat lng in general NYC area
			// lat range 40.5 to 40.9
			// lng range -74 to -73.5
			const randomLocation = {
				lat: randomFloatInRange(40.5, 40.9),
				lng: -randomFloatInRange(73.5, 74)
			}

			return {
				id: i + 1,
				location: randomLocation,
				title: 'Blue Sofa',
				timestamp: randomDateInRange(
					new Date(2023, 3, 26),
					new Date(2023, 3, 30)
				),
				image: 'https://stoopit-data.s3.us-east-2.amazonaws.com/mockdata/bluesofa.webp',
				description: 'Blue sofa, in moderate condition, needs cleaning.'
			}
		})

const randomDateInRange = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)
}

const randomFloatInRange = (min, max) => {
	return parseFloat(Math.random() * (max - min) + min)
}

module.exports = {
	stoopDatabase: generateMockStoops()
}
