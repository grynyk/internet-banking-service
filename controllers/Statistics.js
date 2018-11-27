import moment from 'moment';
import uuid from 'uuid';
import db from '../index';
import Helper from './Helper';

const Statistics = {
    async getStatistics(req, res) {
        try {

            let overral = (await db.query(`
            SELECT count(*) FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1)`, [
                    req.user.id
                ])).rows[0];

            let depositStats = (await db.query(`
            SELECT count(*) AS all FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2`, [
                    req.user.id,
                    'deposit'
                ])).rows;

            depositStats[0].primary = (await db.query(`
            SELECT count(*) AS primary FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND receiver_account_type = $3`, [
                    req.user.id,
                    'deposit',
                    'primary_account'
                ])).rows[0].primary;

            depositStats[0].savings = (await db.query(`
            SELECT count(*) AS savings FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND receiver_account_type = $3`, [
                    req.user.id,
                    'deposit',
                    'savings_account'
                ])).rows[0].savings;

            //------------------------//

            let withdrawalStats = (await db.query(`
            SELECT count(*) AS all FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2`, [
                    req.user.id,
                    'withdrawal'
                ])).rows;

            withdrawalStats[0].primary = (await db.query(`
            SELECT count(*) AS primary FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND sender_account_type = $3`, [
                    req.user.id,
                    'withdrawal',
                    'primary_account'
                ])).rows[0].primary;

            withdrawalStats[0].savings = (await db.query(`
            SELECT count(*) AS savings FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND sender_account_type = $3`, [
                    req.user.id,
                    'withdrawal',
                    'savings_account'
                ])).rows[0].savings;

            //----------------------------------------//

            let domesticStats = (await db.query(`
                   SELECT count(*) AS all FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2`, [
                    req.user.id,
                    'domestic_transaction'
                ])).rows;

            domesticStats[0].outgoing = (await db.query(`
                       SELECT count(*) AS outgoing FROM transactions where sender_uuid = $1 AND type = $2`, [
                    req.user.id,
                    'domestic_transaction'
                ])).rows[0].outgoing;

            domesticStats[0].incoming = (await db.query(`
                           SELECT count(*) AS incoming FROM transactions where receiver_uuid = $1 AND type = $2`, [
                    req.user.id,
                    'domestic_transaction'
                ])).rows[0].incoming;

            domesticStats[0].primary = (await db.query(`
                   SELECT count(*) AS primary FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND sender_account_type = $3`, [
                    req.user.id,
                    'domestic_transaction',
                    'primary_account'
                ])).rows[0].primary;

            domesticStats[0].savings = (await db.query(`
                   SELECT count(*) AS savings FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND sender_account_type = $3`, [
                    req.user.id,
                    'domestic_transaction',
                    'savings_account'
                ])).rows[0].savings;

            //-------------------------------------------/

            let externalStats = (await db.query(`
                SELECT count(*) AS all FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2`, [
                    req.user.id,
                    'external_transaction'
                ])).rows;

                externalStats[0].outgoing = (await db.query(`
                    SELECT count(*) AS outgoing FROM transactions where sender_uuid = $1 AND type = $2`, [
                    req.user.id,
                    'external_transaction'
                ])).rows[0].outgoing;

                externalStats[0].incoming = (await db.query(`
                        SELECT count(*) AS incoming FROM transactions where receiver_uuid = $1 AND type = $2`, [
                    req.user.id,
                    'external_transaction'
                ])).rows[0].incoming;

                externalStats[0].primary = (await db.query(`
                SELECT count(*) AS primary FROM transactions where (sender_uuid = $1 OR receiver_uuid = $1) AND type = $2 AND sender_account_type = $3`, [
                    req.user.id,
                    'external_transaction',
                    'primary_account'
                ])).rows[0].primary;

            let dailySpendingsPerMonth = (await db.query(`
            SELECT
            date_part('year', created_date) as year,
            date_part('month', created_date) as month,
            date_part('day', created_date) as day,
            sum(amount) AS amount
                FROM   transactions
                WHERE  sender_uuid = $1 AND (type = $2 OR type = $3 OR type = $4 OR type = $5) AND created_date > current_date - 14
                GROUP  BY 1,2,3
                ORDER  BY 1,2,3`, [
                    req.user.id,
                    'domestic_transaction',
                    'external_transaction',
                    'deposit',
                    'withdrawal'
                ])).rows;

            const stats = {
                "overral": overral.count,
                "daily_spendings_per_month": dailySpendingsPerMonth,
                "deposits": depositStats,
                "withdrawals": withdrawalStats,
                "domestic_transactions": domesticStats,
                "external_transaction": externalStats
            }

            return res.status(200).send(stats);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Statistics;