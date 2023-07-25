const {
	randomDateInRange,
	randomFloatInRange
} = require('../../../utils/random')
const { assert, should, expect, use } = require('chai')
const chaidateTime = require('chai-datetime')
use(chaidateTime)

describe('Random Date In Range', function () {
	const correctDate1 = new Date(1990, 01, 01)
	const correctDate2 = new Date(2023, 01, 01)
	const iso8601_regex =
		/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i
	it('should return a date object within the correct range(with proper parameter)', function () {
		const correctRun = randomDateInRange(correctDate1, correctDate2)
		assert.withinTime(correctRun, correctDate1, correctDate2, 'correct')
	})
	it('the returned Date object should have the ISO-8601 format', function () {
		const correctRun = randomDateInRange(correctDate1, correctDate2)
		const isoForm = correctRun.toISOString()
		expect(correctRun).to.have.property('toISOString')
		assert.match(isoForm, iso8601_regex)
	})
	it('should return an error with invalid parameters', function () {
		expect(function () {
			randomDateInRange()
		}).to.throw(Error, 'invalid start or end parameters')
	})
})

describe('Random Float In Range', function () {
	const min = 40.5
	const max = 73.5
	const generatedFloat = randomFloatInRange(min, max)
	it('should return an error with invalid paramters', function () {
		expect(function () {
			randomFloatInRange()
		}).to.throw(Error, 'invalid min or max parameters')
	})
	it('should return a float value when served valid paramters', function () {
		assert.isNumber(generatedFloat)
	})
	it('should return a float value that is within the range of min and max', function () {
		expect(generatedFloat).to.be.above(min)
		expect(generatedFloat).to.be.below(max)
	})
})
