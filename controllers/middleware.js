import jwt from 'jsonwebtoken';
import db from '../index';

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);

      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }

      req.user = rows[0];
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  
  , async isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    try {
      if (req.user.admin==false) {
        return res.status(401).send({ 'message': "Access denied! You don't have enough rights" });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async isBlocked(req, res, next) {
    try {
      const { rows } = await db.query('SELECT * FROM users where email = $1', [
        req.body.email
      ]);
      if (rows[0].blocked==true) {
        return res.status(401).send({ 'message': "Your account has been blocked" });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async isActive(req, res, next) {
    try {
      const { rows } = await db.query('SELECT * FROM users where email = $1', [
        req.body.email
      ]);
      if (rows[0].active==false) {
        return res.status(401).send({ 'message': "Your account is not activated yet" });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;