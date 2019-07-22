const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({error: "Bad credentials"})
    } else {
      req.user = decoded;
      next();
    }
  })
}

module.exports = { checkJWT }