import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
  const { token } = req.headers;

  if(!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, 'SUPERKEY123');
    req.user = decoded;
    next();
  } catch(e) {
    return res.status(401).send('Invalid token');
  }

};

export default verify;