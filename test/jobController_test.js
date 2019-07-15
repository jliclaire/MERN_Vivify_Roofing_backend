const {
  index,
  create,
  edit,
  destroy,
  email,
} = require('../controllers/jobController')
const chai = require('chai')
const Job = require('../models/Job')

let job, req, reqEdit, res
beforeEach((done) => {
  job = new Job({ id: 1, name: 'name of lead' });
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
    params: { id: 0 },
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

  reqEdit = {
    params: { id: 0 },
    body: {
      houseLevels: '3'
    }
  }

  reqEmail = {
    body: {
      "body-plain": "Project Type: Tile to Tin Conversion Roof Frame Type: Timber Approximate Size of Home: 176m2 – 200m2 House Levels: Single Storey Roof Type: Pitched Current Roof Material: Tile Desired Roof Material: Colorbond Gutter & Downpipe Replacement: No Name: Tristan snow Suburb: MOUNT ELIZA Email: tristansnow81@gmail.com <mailto:tristansnow81@gmail.com> Phone: +61433398196 Comments: com"
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
  })

  it('returns an array of jobs from database', (done) => {
    index(req, res)
      .then(() => {
        chai.expect(res.sendCalledWith).to.be.a('array');
        chai.expect(res.sendCalledWith).to.be.empty;
        done();
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
  })

  it('returns a database object', (done) => {
    create(req, res)
      .then(() => {
        chai.expect(res.sendCalledWith).to.include(req.body)
        done();
      })
  })
})

describe('jobs#edit', () => {
  beforeEach((done) => {
    let id
    create(req, res)
      .then(() => {
        id = res.sendCalledWith._id
        reqEdit.params.id = id
        done();
      })
  })

  it('returns a 202 status', (done) => {
    edit(reqEdit, res)
      .then(() => {
        chai.expect(res.statusCalledWith).to.equal(202)
        done()
      })
  })

  it('returns the updated document', (done) => {
    edit(reqEdit, res)
      .then(() => {
        chai.expect(res.sendCalledWith.houseLevels).to.equal('3')
        done()
      })
  })
})

describe('jobs#destroy', () => {
  beforeEach((done) => {
    let id
    create(req, res)
      .then(() => {
        id = res.sendCalledWith._id
        req.params.id = id
        done();
      })
  })

  it('should return a 202 status', (done) => {
    destroy(req, res)
      .then(() => {
        chai.expect(res.statusCalledWith).to.equal(202)
        done()
      })
  })

  it('should return a confirmation of deletion', (done) => {
    destroy(req, res)
      .then(() => {
        chai.expect(res.sendCalledWith).to.equal(`Deleted job ${req.params.id}`)
        done();
      })
  })
})

describe('jobs#email', () => {
  it('should return a 202 status', (done) => {
    email(reqEmail, res)
      .then(() => {
        chai.expect(res.statusCalledWith).to.equal(202)
        done()
      })
  })

  it('should return the parsed object', (done) => {
    email(reqEmail, res)
      .then(() => {
        chai.expect(res.sendCalledWith.projectType).to.equal('Tile to Tin Conversion')
        done();
      })
  })
})