const basePassword = {
  password: '123456',
}

const invalidEmail = { "email" : "test.com", ...basePassword };

const validLogin = { "email": "teste@test.com", ...basePassword };

module.exports = {
  invalidEmail,
  validLogin
}
