const { randomFloatInRange } = require('../../utils/random')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')

chai.use(chaiHttp)

describe('GET /api/stoops',function(){
    it('should return 400 without a query', (done)=>{
        chai.request(app)
        .get('/api/stoops')
        .end((err,res)=>{
            chai.expect(err).to.be.null
            chai.expect(res).to.have.status(400)
            chai.expect(res).to.be.json
            done()
        })
    })
    it('should return 200 with a list of stoops and the length of the list', (done)=>{
        const lat = randomFloatInRange(40.5, 40.9)
        const lng = -randomFloatInRange(73.5, 74)
        const range = randomFloatInRange(0,10)
        const query = `lat=${lat}&lng=${lng}&range=${range}`
        chai.request(app)
        .get(`/api/stoops?${query}`)
        .end((err,res)=>{
            chai.expect(err).to.be.null
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(res).to.have.property('length').that.is.a('number')
            chai.expect(res).to.have.property('data').that.is.a('object')
            done()
        })
    })
})