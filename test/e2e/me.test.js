const assert = require('chai').assert;
const db = require('./db');
const request = require('./request');

describe('/me API', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'sup@suuuup.com',
    password: 'yippeeeee'
  };

  before(() => {
    return request.post('/auth/signup')
      .send(user)
      .then(res => token = res.body.token);
  });

  it('initial GET returns empty array', () => {
    return request.get('/me')
      .set('Authorization', token)
      .then(res => assert.deepEqual(res.body, {}));
  });

  let testFridge = {
    ingredients: [
      {
        name: 'hamburger',
        category: 'protein'
      },
      {
        name: 'rice',
        category: 'grain'
      },
      {
        name: 'spinach',
        category: 'veggies'
      }
    ]
  };

  it('adding ingredients to fridge', () => {
    return request.post('/me/fridge')
      .set('Authorization', token)
      .send(testFridge)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);

        testFridge = saved;
      });
  });

});