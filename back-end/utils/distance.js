/** Calculate distance between two latitude and longitudes in miles */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
	if (!lat1 || !lng1 || !lat2 || !lng2) {
		throw new Error('Not a valid parameter')
	}
	const R = 3958.8 // Earth's radius in miles
	const dLat = (lat2 - lat1) * (Math.PI / 180)
	const dlng = (lng2 - lng1) * (Math.PI / 180)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dlng / 2) *
			Math.sin(dlng / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = R * c
	return distance
}

module.exports = {
	calculateDistance
}
