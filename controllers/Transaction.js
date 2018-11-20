import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Helper from './Helper';

import { Pool } from 'pg';
import dotenv from 'dotenv';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const tx = async callback => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        try {
            await callback(client);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
        }
    } finally {
        client.release()
    }
}

const Transaction = {
    async getAllTransactions(req, res) {
        const findAllQuery = `
        SELECT * FROM transactions where sender_uuid = $1 OR receiver_uuid = $1 ORDER BY created_date DESC`;
        try {
          const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
          return res.status(200).send({ rows, rowCount });
        } catch (error) {
          return res.status(400).send(error);
        }
    },
    async getIncomingTransactions(req, res) {
        const findAllQuery = `
        SELECT * FROM transactions where receiver_uuid = $1 ORDER BY created_date DESC`;
        try {
          const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
          return res.status(200).send({ rows, rowCount });
        } catch (error) {
          return res.status(400).send(error);
        }
    },
    async getOutgoingTransactions(req, res) {
        const findAllQuery = `
        SELECT * FROM transactions where sender_uuid = $1 ORDER BY created_date DESC`;
        try {
          const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
          return res.status(200).send({ rows, rowCount });
        } catch (error) {
          return res.status(400).send(error);
        }
    },
    async domesticTransaction(req, res) {
        tx(async client => {
          const { rows } = await client.query(`SELECT * FROM ${req.body.senderAccountType} WHERE owner_id = $1`, [req.user.id]);

          const senderName = await client.query(`SELECT firstname,lastname FROM users WHERE id = $1`, [rows[0].owner_id]);

          const sendersBalance = rows[0].balance;
          const sendersUpdatedBalance = +sendersBalance - +req.body.amount;
          
          try{
            const receiverAccountData = (await db.query(`SELECT * FROM savings_account where id = $1 UNION ALL SELECT * FROM primary_account where id = $1`, [req.body.receiverAccountNo])).rows[0];

            if(receiverAccountData){
              rows[1] = (await client.query(`SELECT * FROM ${receiverAccountData.type} WHERE id = $1`, [req.body.receiverAccountNo])).rows[0];
            }else{
              throw "receiver account doesn't exist";
            }
  
            const senderAccountsData = (await client.query(`SELECT * FROM savings_account where owner_id = $1 UNION ALL SELECT * FROM primary_account where owner_id = $1 ORDER BY type`, [req.user.id])).rows;
 
            if(rows[0].id==senderAccountsData[0].id || rows[0].id==senderAccountsData[1].id){
              throw "You can't send money to yourself";
            }

            const receiversBalance = rows[1].balance;
            const receiversUpdatedBalance = +receiversBalance + +req.body.amount;
            const receiverUserData = (await db.query(`SELECT * FROM users where id = $1`, [receiverAccountData.owner_id])).rows[0];
            if (+sendersBalance >= +req.body.amount) {
              await client.query(`UPDATE ${req.body.senderAccountType} SET
              balance = $1 WHERE owner_id = $2 returning *`, [sendersUpdatedBalance, req.user.id]);
              await client.query(`UPDATE ${receiverAccountData.type} SET
              balance = $1 WHERE id = $2 returning *`, [receiversUpdatedBalance, req.body.receiverAccountNo]);
              await client.query(`INSERT INTO
              transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name,sender_name)
              VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12) returning *`, [
                  uuid.v4(),
                  req.body.description,
                  req.body.amount,
                  moment(new Date()),
                  req.user.id,
                  receiverAccountData.owner_id,
                  true,
                  req.body.senderAccountType,
                  receiverAccountData.type,
                  'domestic_transaction',
                  receiverUserData.firstname + ' ' + receiverUserData.lastname,
                  senderName.rows[0].firstname + ' ' + senderName.rows[0].lastname
                ]);
            }else{
              throw 'not enough funds';
            }
          }catch(err){
            return res.status(400).send({ "message": err });
          }
          return res.status(200).send({ "message": "transaction approved" });
        });
    },async externalTransaction(req, res) {
        tx(async client => {
            const { rows } = await client.query(`SELECT * FROM ${req.body.senderAccountType} WHERE owner_id = $1`, [req.user.id]);
            const sendersBalance = rows[0].balance;
            const sendersUpdatedBalance = +sendersBalance - +req.body.amount;
            
            const senderName = await client.query(`SELECT firstname,lastname FROM users WHERE id = $1`, [rows[0].owner_id]);
          console.log(rows,senderName,sendersBalance, req.body.amount);

            try{
              
              if (+sendersBalance >= +req.body.amount) {
                await client.query(`UPDATE ${req.body.senderAccountType} SET
                balance = $1 WHERE owner_id = $2 returning *`, [sendersUpdatedBalance, req.user.id]);

                await client.query(`INSERT INTO
                transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type,receiver_name,sender_name)
                VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12) returning *`, [
                    uuid.v4(),
                    req.body.description,
                    req.body.amount,
                    moment(new Date()),
                    req.user.id,
                    req.body.receiverAccountNo,
                    true,
                    req.body.senderAccountType,
                    'primary_account',
                    'external_transaction',
                    req.body.receiverName,
                    senderName.rows[0].firstname + ' ' + senderName.rows[0].lastname
                  ]);
              }else{
                throw 'not enough funds';
              }
            }catch(err){
              return res.status(400).send({ "message": err });
            }
            return res.status(200).send({ "message": "transaction approved" });
          });
    }
}

export default Transaction;