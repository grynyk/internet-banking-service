import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Helper from './Helper';

const User = {
  async getAll(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM users ORDER BY created_date DESC');
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getUserById(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM users where id = $1', [req.params.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getMyData(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM users where id = $1', [req.user.id]);
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, firstname, lastname, address, admin, email, password, phone, created_date, modified_date, birthdate,active)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.firstname,
      req.body.lastname,
      req.body.address,
      false,
      req.body.email,
      hashPassword,
      req.body.phone,
      moment(new Date()),
      moment(new Date()),
      moment(new Date(req.body.birthdate)),
      false
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
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },

  async verifyPassword(req, res) {

    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.user.id]);

      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'Password is incorrect' });
      }

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send(error)
    }
  }, async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(
        rows[0].id,
        rows[0].admin,
        rows[0].firstname,
        rows[0].lastname,
        rows[0].address);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async block(req, res) {
    try {

      const user = (await db.query('SELECT * FROM users where id = $1', [req.params.id])).rows[0];
      console.log(user)
      if(user.blocked==true){
        return res.status(404).send({ 'message': 'user is already blocked' });
      }
      const { rows } = await db.query(`UPDATE users
      SET blocked=$1
      WHERE id=$2 returning *`,[
        true,
        req.params.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'user has been blocked' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async unblock(req, res) {
    try {
      const user = (await db.query('SELECT * FROM users where id = $1', [req.params.id])).rows[0];
      console.log(user)
      if(user.blocked==false){
        return res.status(404).send({ 'message': 'user is not blocked' });
      }
      const { rows } = await db.query(`UPDATE users
      SET blocked=$1
      WHERE id=$2 returning *`,[
        false,
        req.params.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'user has been unblocked' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async activate(req, res) {
    try {
      const user = (await db.query('SELECT * FROM users where id = $1', [req.params.id])).rows[0];
      console.log(user)
      if(user.active==true){
        return res.status(404).send({ 'message': 'user is already activated' });
      }
      const { rows } = await db.query(`UPDATE users
      SET active=$1
      WHERE id=$2 returning *`,[
        true,
        req.params.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'user has been unblocked' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async editUserById(req, res) {
    try {
      const { rows } = await db.query(`UPDATE users
      SET firstname=$1, lastname=$2, phone=$3, email=$4, address=$5, birthdate=$6
      WHERE id=$7 returning *`, [
        req.body.firstname,
        req.body.lastname,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.birthdate,
        req.params.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'user not found' });
      }
      return res.status(204).send({ 'message': 'user edited' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
export default User;