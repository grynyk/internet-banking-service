import moment from 'moment';
import uuid from 'uuid';
import db from '../index';

const Accounts = {
  
  async createPrimary(req, res) {
    const createQuery = `INSERT INTO
      primary_account(id, owner_id, balance, created_date,modified_date)
      VALUES($1, $2, $3, $4,$5)
      returning *`;
    const values = [
      uuid.v4(),
      req.user.id,
      req.body.balance,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  
  async getPrimaryAll(req, res) {
    const findAllQuery = 'SELECT * FROM primary_account where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  
  async getPrimaryById(req, res) {
    const text = 'SELECT * FROM primary_account WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'account not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  
  async updatePrimary(req, res) {
    const findOneQuery = 'SELECT * FROM primary_account WHERE id=$1 AND owner_id = $2';
    const updateOneQuery =`UPDATE primary_account
      SET balance=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'account not found'});
      }
      const values = [
        req.body.balance || rows[0].balance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }
}

export default Accounts;