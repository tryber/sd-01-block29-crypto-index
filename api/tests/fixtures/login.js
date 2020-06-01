const basePassword = {
  password: '123456',
};

const baseEmail = {
  email: 'teste@teste.com',
};

const invalidEmail = { email: 'test.com', ...basePassword };

const invalidPassword = { ...baseEmail, password: 'a123' };

const validLogin = { ...baseEmail, ...basePassword };

module.exports = {
  invalidEmail,
  invalidPassword,
  validLogin,
};
