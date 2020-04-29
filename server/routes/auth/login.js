const crypto = require('crypto');
const { validate } = require('@expresso/validator');

module.exports = [
  validate({
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
       type: 'string',
       minLength: 6
      },
    },
    required: ['email', 'password']
  }),
  function (req, res) {    
    const token = crypto.randomBytes(8).toString('hex');
    res.json({ token })
  }
]
