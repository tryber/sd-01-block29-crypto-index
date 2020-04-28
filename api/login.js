function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

function validateLogin(req) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const passwordRegex = /^[0-9]{6}$/;

  if (req.body.email && req.body.password)
    if (
      req.body.email.match(emailRegex) &&
      req.body.password.match(passwordRegex)
    )
      return { token: makeid(16) };

  return false;
}

module.exports = { validateLogin };
