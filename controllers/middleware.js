import jwt from 'jsonwebtoken';
import db from '../index';
import schedule from 'node-schedule';

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }

      req.user = rows[0];
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async checkMoneyBox(req, res, next) {

    try {

      if (req.user.money_box_id) {
        const { rows } = await db.query(`SELECT * FROM moneyboxes WHERE id = $1`, [req.user.money_box_id]);
        if (!rows[0]) {
          next();
        }
        console.log(rows[0]);
          const rule = new schedule.RecurrenceRule();
          rule.dayOfMonth = 25;
          var j = schedule.scheduleJob(rule, function () {
            console.log('Today is recognized by Rebecca Black!');
          });
      }
      console.log('ELSE');
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;