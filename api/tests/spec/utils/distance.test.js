const { calculateDistance } = require('../../../utils/distance')
const { assert, should, expect } = require('chai')

describe('Distance calculations', function () {
	it('should return an error with undefined latitude and longitude values', function () {
		expect(function () {
			calculateDistance()
		}).to.throw(Error, 'Not a valid parameter')
	})
	it('should return return a number with valid latitude and longitude values', function () {
		const result = calculateDistance(40.5, 73.5, 40.7, 73.8)
		assert.isNumber(result)
	})
})
