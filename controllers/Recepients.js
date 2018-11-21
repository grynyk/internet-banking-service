import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Helper from './Helper';

const Recipients = {

    async create(req, res) {
        try {

            const recipientAccountInfo = (await db.query(`SELECT * FROM primary_account
    WHERE id = $1 UNION ALL SELECT * FROM savings_account
    WHERE id = $1 ORDER BY type`, [req.body.account_number])).rows[0];

            let type = 'external_transaction';
            let name = '';
            if (recipientAccountInfo) {
                const recipientUserInfo = (await db.query(`SELECT * FROM users
        WHERE id = $1`, [recipientAccountInfo.owner_id])).rows[0];

                type = 'domestic_transaction';
                name = recipientUserInfo.firstname + ' ' + recipientUserInfo.lastname;
            }

            const { rows } = await db.query(`INSERT INTO
      recipient(id, name,account_type, description, title, account_number,owner_id,type)
      VALUES($1, $2, $3, $4, $5, $6, $7,$8)
      returning *`, [
                    uuid.v4(),
                    name,
                    'primary_account' || recipientAccountInfo.type,
                    req.body.description,
                    req.body.title,
                    req.body.account_number,
                    req.user.id,
                    type
                ]);

            return res.status(201).send({ 'message': 'Recipient created successfully' });
        } catch (error) {
            return res.status(400).send({ 'message': 'Unable to create recepient' });
        }
    }, async getAll(req, res) {
        try {
            const { rows, rowCount } = await db.query(`SELECT * FROM recipient where owner_id = $1`, [req.user.id]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    }, async update(req, res) {
        try {

            const recipientAccountInfo = (await db.query(`SELECT * FROM primary_account
    WHERE id = $1 UNION ALL SELECT * FROM savings_account
    WHERE id = $1 ORDER BY type`, [req.body.account_number])).rows[0];

            let type = 'external_transaction';
            let name = '';
            if (recipientAccountInfo) {
                const recipientUserInfo = (await db.query(`SELECT * FROM users
        WHERE id = $1`, [recipientAccountInfo.owner_id])).rows[0];

                type = 'domestic_transaction';
                name = recipientUserInfo.firstname + ' ' + recipientUserInfo.lastname;
            }


            const { rows } = await db.query(`UPDATE recipient
      SET account_type=$1, description=$2, title=$3, account_number=$4, name=$5
      WHERE id=$6 AND owner_id = $7 returning *`, [
                    'primary_account' || recipientAccountInfo.type,
                    req.body.description,
                    req.body.title,
                    req.body.account_number,
                    name,
                    req.params.id,
                    req.user.id
                ]);

            return res.status(201).send({ 'message': 'Recipient updated successfully' });
        } catch (error) {
            return res.status(400).send({ 'message': 'Unable to updated recepient' });
        }
    },
    async delete(req, res) {
        try {
            const { rows } = await db.query(`DELETE FROM recipient WHERE id=$1 returning *`, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'recipient not found' });
            }
            return res.status(200).send({ 'message': 'recipient successfully deleted' });
        } catch (error) {
            return res.status(400).send({ 'message': 'unable to delete recipient' });
        }
    }
}

export default Recipients;