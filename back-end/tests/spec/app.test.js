const { randomFloatInRange } = require('../../utils/random')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')

chai.use(chaiHttp)

//when in development, index.html does not exist so only test in production
if (process.env.NODE_ENV === 'production'){
    describe('GET /',function(){
        it('should return 200 and direct to index.html', (done)=>{
            chai.request(app)
            .get('/')
            .end((err,res)=>{
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res).to.have.header('content-type','text/html')
            })
        })
    })
}

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
    it('should return 200 with a list of stoops and the length of the list with valid query', (done)=>{
        const lat = randomFloatInRange(40.5, 40.9)
        const lng = -randomFloatInRange(73.5, 74)
        const range = randomFloatInRange(0,10)
        const query = `lat=${lat}&lng=${lng}&range=${range}`
        chai.request(app)
        .get(`/api/stoops?${query}`)
        .end((err,res)=>{
            const {body} = res
            chai.expect(err).to.be.null
            chai.expect(res).to.have.status(200)
            chai.expect(res).to.be.json
            chai.expect(body).to.have.property('length').that.is.a('number')
            chai.expect(body).to.have.property('data').that.is.an('array')
            if (body.data[0]){
                chai.expect(body.data[0].location).to.have.property('lat').that.is.a('number')
                chai.expect(body.data[0].location).to.have.property('lng').that.is.a('number')
            }
            done()
        })
    })
})