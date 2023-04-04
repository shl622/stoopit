const randomDateInRange = (start, end) => {
	if (!start || !end){
		throw new Error("invalid paramters")
	}
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


