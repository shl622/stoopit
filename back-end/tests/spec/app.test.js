const { randomFloatInRange } = require('../../utils/random')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const stoopDatabase = require('../../mockData/stoopDatabase')

chai.use(chaiHttp)

//when in development, index.html does not exist so only test in production
if (process.env.NODE_ENV === 'production') {
	describe('GET /', function () {
		it('should return 200 and direct to index.html', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					chai.expect(err).to.be.null
					chai.expect(res).to.have.status(200)
					chai.expect(res).to.have.header('content-type', 'text/html')
				})
		})
	})
}

describe('GET /api/stoops', function () {
	it('should return 400 without a query', (done) => {
		chai.request(app)
			.get('/api/stoops')
			.end((err, res) => {
				chai.expect(err).to.be.null
				chai.expect(res).to.have.status(400)
				chai.expect(res).to.be.json
				done()
			})
	})
	it('should return 200 with a list of stoops and the length of the list with valid query', (done) => {
		const lat = 40.726111
		const lng = -74.009084
		const range = 4
		const query = `lat=${lat}&lng=${lng}&range=${range}`
		chai.request(app)
			.get(`/api/stoops?${query}`)
			.end((err, res) => {
				const { body } = res

				chai.expect(err).to.be.null
				chai.expect(res).to.have.status(200)
				chai.expect(res).to.be.json
				chai.expect(body).to.have.property('length').that.is.a('number')
				chai.expect(body).to.have.property('data').that.is.an('array')
				if (body.data[0]) {
					chai.expect(body.data[0].location)
						.to.have.property('lat')
						.that.is.a('number')
					chai.expect(body.data[0].location)
						.to.have.property('lng')
						.that.is.a('number')
				}
				done()
			})
	})
})

describe('GET /api/stoop', function () {
	it('should return 400 without a query', (done) => {
		chai.request(app)
			.get('/api/stoop')
			.end((err, res) => {
				chai.expect(err).to.be.null
				chai.expect(res).to.have.status(400)
				chai.expect(res).to.be.json
				done()
			})
	})
	it('should return 404 if no stoop was found in database', (done) => {
		const id = 1001
		chai.request(app)
			.get(`/api/stoop`)
			.query({ id: '1001' })
			.end((err, res) => {
				chai.expect(err).to.be.null
				chai.expect(res).to.have.status(404)
				chai.expect(res).to.be.json
				done()
			})
	})
	it('should return 200 with matching stoop if found in database', (done) => {
		const correctId = '643eebb5faebbc42099790a9'
		chai.request(app)
			.get(`/api/stoop?id=${correctId}`)
			.end((err, res) => {
				const { body } = res
				chai.expect(err).to.be.null
				chai.expect(res).to.have.status(200)
				chai.expect(res).to.be.json
				chai.expect(body).to.have.property('data').that.is.an('object')
				done()
			})
	})
})
