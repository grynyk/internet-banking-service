import moment from 'moment';
import uuid from 'uuid';
import db from '../index';

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
      req.body.balance,
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
      req.body.balance,
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
    //   SELECT
    //   a.col_ID,
    //   b.colx,
    //   b.coly,
    //   b.colz,
    //   a.col1,
    //   a.col2,
    //   a.col3
    // FROM tableA AS a
    // INNER JOIN tableB AS b ON a.col_ID = b.col_ID
    // WHERE a.col_ID > 40302030;
    // const findAllQuery = 'SELECT p.id, p.owner_id, p.balance, p.type, s.id, s.owner_id, s.balance, s.type FROM primary_account AS p INNER JOIN savings_account AS s ON p.owner_id = s.owner_id WHERE p.owner_id = $1';

    const findAllQuery = `
    SELECT * FROM savings_account where owner_id = $1 UNION ALL SELECT * FROM primary_account where owner_id = $1 ORDER BY created_date`;
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Accounts;