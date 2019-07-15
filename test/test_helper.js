const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/jobs');
mongoose.connection
  .once('open', () => console.log('Connected to test database...'))
  .on('error', (error) => {
    console.warn('Error: ', error);
  });

beforeEach((done) => {
  mongoose.connection.collections.jobs.drop(() => {
    done();
  })
})