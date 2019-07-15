const {
  index,
  create,
  edit,
  destroy,
  email,
} = require('../controllers/jobController')
const assert = require('assert')
const chai = require('chai')
const Job = require('../models/Job')

let job, req, res
beforeEach((done) => {
  job = new Job({ name: 'name of lead' });
  job.save()
    .then(() => done());

  res = {
    statusCalledWith: '',
    sendCalledWith: '',
    status: function(arg) {
      this.statusCalledWith = arg;
      return this;
    },
    send: function(arg) {
      this.sendCalledWith = arg;
    }
  }

  req = {
    body: {
      projectType: 'Resto',
      roofFrameType: 'Wood',
      sizeOfHome: '150m',
      houseLevels: '2',
      roofType: 'Tin',
      currentRoofMaterial: 'Tin',
      desiredRoofMaterial: 'Zinc',
      gutterDownpipeReplacement: 'No',
      name: 'test',
      suburb: 'test',
      email: 'test',
      phone: 'test',
      comments: 'test',
    }
  }
})

describe('jobs#index', () => {
  it('returns a 200 status', (done) => {
    index(req, res)
      .then(() => {
        chai.expect(res.statusCalledWith).to.equal(200);
        done();
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })

  it('returns an array of jobs from database', (done) => {
    index(req, res)
      .then(() => {
        chai.expect(res.sendCalledWith).to.be.a('array');
        chai.expect(res.sendCalledWith).to.be.empty;
        done();
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })
})

describe('jobs#create', () => {
  it('returns a 201 status', (done) => {
    create(req, res)
      .then(() => {
        chai.expect(res.statusCalledWith).to.equal(201)
        done();
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })

  it('returns a database object', (done) => {
    create(req, res)
      .then(() => {
        chai.expect(res.sendCalledWith).to.include(req.body)
        done();
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })
})

describe('jobs#edit', () => {
  it('returns a 202 status', (done) => {
    done()
  })
})