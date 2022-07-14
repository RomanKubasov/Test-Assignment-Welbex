const fetch = require('cross-fetch');

const checkAuth = async (req, res, next) => {
  try {
  /* check token via Auth Server */
    const token = req.headers.authorization;
    const response = await fetch(`http://${process.env.AUTH_SERV_HOST}:${process.env.AUTH_SERV_PORT}/auth/`, {
      method: 'post',
      headers: {
        Authorization: token,
      },
    });
    const result = await response.json();

    /* if Token is correct return User */
    req.user = JSON.parse(JSON.stringify(result));
    if (req.user.id) {
      return next();
    }
    return res.status(403).json({ error: 'Token is incorrect' });
  } catch (err) {
    return res.status(500);
  }
};

module.exports = checkAuth;
