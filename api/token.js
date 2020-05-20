const arraysToken = [];

const generateToken = length => {
  const token = `${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}`;
  arraysToken.push(token);
  return token;
};

const isTokenValid = Token =>  arraysToken.includes(Token);

module.exports = { generateToken, isTokenValid };
