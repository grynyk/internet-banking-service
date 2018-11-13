import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import tx from './Transaction';
const Accounts = {

  // PRIMARY-ACCOUNT

  async createPrimary(req, res) {
    const createQuery = `INSERT INTO
      primary_account(id, owner_id, balance, created_date,modified_date,type)
      VALUES($1, $2, $3, $4,$5,$6)
      returning *`;
    const values = [
      uuid.v4(),
      req.user.id,
      0.00,
      moment(new Date()),
      moment(new Date()),
      'primary'
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async getPrimaryAll(req, res) {
    const findAllQuery = 'SELECT * FROM primary_account where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getPrimaryById(req, res) {
    const text = 'SELECT * FROM primary_account WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async updatePrimary(req, res) {
    const findOneQuery = 'SELECT * FROM primary_account WHERE id=$1 AND owner_id = $2';
    const updateOneQuery = `UPDATE primary_account
      SET balance=$1,modified_date=$2
      WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }
      const values = [
        req.body.balance || rows[0].balance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  // SAVINGS-ACCOUNT
  async createSavings(req, res) {
    const createQuery = `INSERT INTO
        savings_account(id, owner_id, balance, created_date, modified_date,type)
        VALUES($1, $2, $3, $4,$5,$6)
        returning *`;
    const values = [
      uuid.v4(),
      req.user.id,
      0.00,
      moment(new Date()),
      moment(new Date()),
      'savings'
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async getSavingsAll(req, res) {
    const findAllQuery = 'SELECT * FROM savings_account where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async getSavingsById(req, res) {
    const text = 'SELECT * FROM savings_account WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error)
    }
  }, async updateSavings(req, res) {
    const findOneQuery = 'SELECT * FROM savings_account WHERE id=$1 AND owner_id = $2';
    const updateOneQuery = `UPDATE savings_account
        SET balance=$1,modified_date=$2
        WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }
      const values = [
        req.body.balance || rows[0].balance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }, async getAllAcounts(req, res) {
    const findAllQuery = `
    SELECT * FROM savings_account where owner_id = $1 UNION ALL SELECT * FROM primary_account where owner_id = $1 ORDER BY type`;
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  }, async Transaction(req, res) {
    try {
      tx(async client => {
        const { rows } = await client.query(`SELECT balance FROM ${req.body.senderAccountType} WHERE owner_id = $1`, [req.user.id]);
        var sendersBalance = rows[0].balance;
        const sendersUpdatedBalance = +sendersBalance - +req.body.amount;
        rows[1] = (await client.query(`SELECT * FROM ${req.body.receiverAccountType} WHERE id = $1`, [req.body.receiverAccountNo])).rows[0];
        const receiversBalance = rows[1].balance;
        const receiversUpdatedBalance = +receiversBalance + +req.body.amount;

        if (+sendersBalance > +req.body.amount) {
          await client.query(`UPDATE ${req.body.senderAccountType} SET
          balance = $1 WHERE owner_id = $2 returning *`, [sendersUpdatedBalance, req.user.id]);
          await client.query(`UPDATE ${req.body.receiverAccountType} SET
          balance = $1 WHERE id = $2 returning *`, [receiversUpdatedBalance, req.body.receiverAccountNo]);
          await client.query(`INSERT INTO
          transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type)
          VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9) returning *`, [
              uuid.v4(),
              req.body.description,
              req.body.amount,
              moment(new Date()),
              req.user.id,
              rows[1].owner_id,
              true,
              req.body.senderAccountType,
              req.body.receiverAccountType
            ]);
        }
      });

      return res.status(200).send({ "message": "transaction approved" });
    } catch (error) {
      return res.status(400).send({ "message": error });
    }
  }
}

export default Accounts;