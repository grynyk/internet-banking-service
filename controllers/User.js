import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Helper from './Helper';

const User = {

  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, firstname, lastname, address, admin, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.firstname,
      req.body.lastname,
      req.body.address,
      false,
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(
        rows[0].id,
        rows[0].admin,
        rows[0].firstname,
        rows[0].lastname,
        rows[0].address);
      return res.status(201).send({ token });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(
        rows[0].id,
        rows[0].admin,
        rows[0].firstname,
        rows[0].lastname,
        rows[0].address);
      return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default User;