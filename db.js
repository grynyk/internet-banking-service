const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});


const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
		    firstname VARCHAR(128) NOT NULL,
		    lastname VARCHAR(128) NOT NULL,
	    	address VARCHAR(128) NOT NULL,
	    	admin BOOLEAN DEFAULT FALSE,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createSavingsAccountTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
    savings_account(
      id UUID PRIMARY KEY,
      owner_id UUID NOT NULL,
      balance decimal(12,2),
      created_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createPrimaryAccountTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
    primary_account(
      id UUID PRIMARY KEY,
      owner_id UUID NOT NULL,
      balance decimal(12,2) DEFAULT 0.00,
      created_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createRecipientTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      recipient(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        AccountNumber UUID NOT NULL,
		    FOREIGN KEY (AccountNumber) REFERENCES primary_account (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createTransactionTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      transaction(
        id UUID PRIMARY KEY,
        description VARCHAR(128) NOT NULL,
        amount decimal(12,2) NOT NULL,
        created_date TIMESTAMP,
        sender_uuid UUID NOT NULL,
        FOREIGN KEY (sender_uuid) REFERENCES users (id) ON DELETE CASCADE,
        receiver_uuid UUID NOT NULL,
		    FOREIGN KEY (receiver_uuid) REFERENCES recipient (id) ON DELETE CASCADE)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropSavingsAccountTable = () => {
  const queryText = 'DROP TABLE IF EXISTS savings_account returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropPrimaryAccountTable = () => {
  const queryText = 'DROP TABLE IF EXISTS primary_account returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createAllTables = () => {
  createUserTable();
  createSavingsAccountTable();
  createPrimaryAccountTable();
  createRecipientTable();
  createTransactionTable();
}

const dropAllTables = () => {
  dropSavingsAccountTable();
  dropPrimaryAccountTable();
  dropUserTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createUserTable,
  createSavingsAccountTable,
  createPrimaryAccountTable,
  createRecipientTable,
  createTransactionTable,
  createAllTables,
  dropPrimaryAccountTable,
  dropSavingsAccountTable,
  dropUserTable,
  dropAllTables
};

require('make-runnable');