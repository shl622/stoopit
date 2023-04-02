const randomDateInRange = (start, end) => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)
}

const randomFloatInRange = (min, max) => {
	return parseFloat(Math.random() * (max - min) + min)
}

module.exports = {
	randomDateInRange,
	randomFloatInRange
}