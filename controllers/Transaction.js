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

    },
    async getIncomingTransactions(req, res) {

    },
    async getOutgoingTransactions(req, res) {

    },
    async domesticTransaction(req, res) {
        tx(async client => {
          const { rows } = await client.query(`SELECT balance FROM ${req.body.senderAccountType} WHERE owner_id = $1`, [req.user.id]);
          var sendersBalance = rows[0].balance;
          const sendersUpdatedBalance = +sendersBalance - +req.body.amount;
          
          try{
            const receiverAccountType = (await db.query(`SELECT * FROM savings_account where id = $1 UNION ALL SELECT * FROM primary_account where id = $1`, [req.body.receiverAccountNo])).rows[0].type;
            console.log(receiverAccountType);

            rows[1] = (await client.query(`SELECT * FROM ${receiverAccountType} WHERE id = $1`, [req.body.receiverAccountNo])).rows[0];
           
            if(!rows[1]){
              throw "receiver account doesn't exist";
            }
  
            const receiversBalance = rows[1].balance;
            const receiversUpdatedBalance = +receiversBalance + +req.body.amount;
  
            if (+sendersBalance > +req.body.amount) {
              await client.query(`UPDATE ${req.body.senderAccountType} SET
              balance = $1 WHERE owner_id = $2 returning *`, [sendersUpdatedBalance, req.user.id]);
              await client.query(`UPDATE ${receiverAccountType} SET
              balance = $1 WHERE id = $2 returning *`, [receiversUpdatedBalance, req.body.receiverAccountNo]);
              await client.query(`INSERT INTO
              transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type)
              VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10) returning *`, [
                  uuid.v4(),
                  req.body.description,
                  req.body.amount,
                  moment(new Date()),
                  req.user.id,
                  req.body.receiverAccountNo,
                  true,
                  req.body.senderAccountType,
                  receiverAccountType,
                  'domestic_transaction'
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
            const { rows } = await client.query(`SELECT balance FROM ${req.body.senderAccountType} WHERE owner_id = $1`, [req.user.id]);
            var sendersBalance = rows[0].balance;
            const sendersUpdatedBalance = +sendersBalance - +req.body.amount;
            
            try{
              if (+sendersBalance > +req.body.amount) {
                await client.query(`UPDATE ${req.body.senderAccountType} SET
                balance = $1 WHERE owner_id = $2 returning *`, [sendersUpdatedBalance, req.user.id]);

                await client.query(`INSERT INTO
                transactions(id, description, amount, created_date, sender_uuid, receiver_uuid, status, sender_account_type, receiver_account_type,type)
                VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10) returning *`, [
                    uuid.v4(),
                    req.body.description,
                    req.body.amount,
                    moment(new Date()),
                    req.user.id,
                    req.body.receiverAccountNo,
                    true,
                    req.body.senderAccountType,
                    'primary_account',
                    'external_transaction'
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