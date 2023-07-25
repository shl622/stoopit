const randomDateInRange = (start, end) => {
	if (!start || !end) {
		throw new Error('invalid start or end parameters')
	}
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)
}

const randomFloatInRange = (min, max) => {
	if (!min || !max) {
		throw new Error('invalid min or max parameters')
	}
	return parseFloat(Math.random() * (max - min) + min)
}

module.exports = {
	randomDateInRange,
	randomFloatInRange
}
