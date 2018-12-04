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
      'primary_account'
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
  async withdrawPrimary(req, res) {
    try{
      const { rows } = await db.query(`SELECT * FROM primary_account WHERE id=$1 AND owner_id = $2`, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }

      if (+req.body.amount<=0) {
        return res.status(404).send({ 'message': "Entered value is incorrect" });
      }

      if(+req.body.amount > +rows[0].balance){
        return res.status(400).send({"message":"You don't have enough funds"});
      }

      let updatedBalance = (+rows[0].balance - +req.body.amount).toFixed(2);

      await db.query(`UPDATE primary_account
      SET balance = $1, modified_date = $2
      WHERE id=$3 AND owner_id = $4 returning *`, [
        updatedBalance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ]);

      await db.query(`INSERT INTO
      transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name)
      VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) returning *`, [
          uuid.v4(),
          '',
          req.body.amount.toFixed(2),
          moment(new Date()),
          req.user.id,
          null,
          true,
          'primary_account',
          null,
          'withdrawal',
          null
        ]);

      return res.status(200).send({"balance":updatedBalance});
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async depositPrimary(req, res) {
    try{
      const { rows } = await db.query(`SELECT * FROM primary_account WHERE id=$1 AND owner_id = $2`, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }

      if (+req.body.amount<=0) {
        return res.status(404).send({ 'message': "Entered value is incorrect" });
      }

      let updatedBalance = (+rows[0].balance + +req.body.amount).toFixed(2);

      await db.query(`UPDATE primary_account
      SET balance = $1, modified_date = $2
      WHERE id=$3 AND owner_id = $4 returning *`, [
        updatedBalance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ]);

      await db.query(`INSERT INTO
      transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name)
      VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) returning *`, [
          uuid.v4(),
          '',
          req.body.amount.toFixed(2),
          moment(new Date()),
          null,
          req.user.id,
          true,
          null,
          'primary_account',
          'deposit',
          null
        ]);

      return res.status(200).send({"balance":updatedBalance});
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
      'savings_account'
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
  },
  
  async withdrawSavings(req, res) {
    try{
      const { rows } = await db.query(`SELECT * FROM savings_account WHERE id=$1 AND owner_id = $2`, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }

      if (+req.body.amount<=0) {
        return res.status(404).send({ 'message': "Entered value is incorrect" });
      }

      if(+req.body.amount > +rows[0].balance){
        return res.status(400).send({"message":"You don't have enough funds"});
      }
      const commission = +req.body.amount*0.0015;
      let updatedBalance = (+rows[0].balance - +req.body.amount - commission).toFixed(2);

      await db.query(`UPDATE savings_account
      SET balance = $1, modified_date = $2
      WHERE id=$3 AND owner_id = $4 returning *`, [
        updatedBalance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ]);

      await db.query(`INSERT INTO
      transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name)
      VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) returning *`, [
          uuid.v4(),
          '',
          req.body.amount.toFixed(2),
          moment(new Date()),
          req.user.id,
          null,
          true,
          'savings_account',
          null,
          'withdrawal',
          null
        ]);

      return res.status(200).send({"balance":updatedBalance,"commission":`${commission} (0.15%)`});
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async depositSavings(req, res) {
    try{
      const { rows } = await db.query(`SELECT * FROM savings_account WHERE id=$1 AND owner_id = $2`, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'account not found' });
      }

      if (+req.body.amount<=0) {
        return res.status(404).send({ 'message': "Entered value is incorrect" });
      }

      let updatedBalance = (+rows[0].balance + +req.body.amount).toFixed(2);

      await db.query(`UPDATE savings_account
      SET balance = $1, modified_date = $2
      WHERE id=$3 AND owner_id = $4 returning *`, [
        updatedBalance,
        moment(new Date()),
        req.params.id,
        req.user.id
      ]);

      await db.query(`INSERT INTO
      transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name)
      VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11) returning *`, [
          uuid.v4(),
          '',
          req.body.amount.toFixed(2),
          moment(new Date()),
          null,
          req.user.id,
          true,
          null,
          'savings_account',
          'deposit',
          null
        ]);

      return res.status(200).send({"balance":updatedBalance});
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
  }
}

export default Accounts;