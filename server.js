import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Accounts from './controllers/Accounts';
import User from './controllers/User';
import Auth from './controllers/middleware';
import Transaction from './controllers/Transaction';
import Recipients from './controllers/Recepients';
import Statistics from './controllers/Statistics';

dotenv.config();

const app = express();

app.use(express.json())

app.post('/api/user/create', User.create);
app.post('/api/user/login',User.login);
app.post('/api/user/verifyPassword/:id',User.verifyPassword);
app.delete('/api/user/delete', Auth.verifyToken, User.delete);

app.get('/api/accounts/getAll', Auth.verifyToken, Accounts.getAllAcounts);

app.post('/api/accounts/primary/create', Auth.verifyToken, Accounts.createPrimary);
app.get('/api/accounts/primary/getAll', Auth.verifyToken, Accounts.getPrimaryAll);
app.get('/api/accounts/primary/getById/:id', Auth.verifyToken, Accounts.getPrimaryById);
app.put('/api/accounts/primary/update/:id', Auth.verifyToken, Accounts.updatePrimary);

app.post('/api/accounts/savings/create', Auth.verifyToken, Accounts.createSavings);
app.get('/api/accounts/savings/getAll', Auth.verifyToken, Accounts.getSavingsAll);
app.get('/api/accounts/savings/getById/:id', Auth.verifyToken, Accounts.getSavingsById);
app.put('/api/accounts/savings/update/:id', Auth.verifyToken, Accounts.updateSavings);

app.post('/api/recipients/create', Auth.verifyToken, Recipients.create);
app.get('/api/recipients/getAll', Auth.verifyToken, Recipients.getAll);
app.put('/api/recipients/update/:id', Auth.verifyToken, Recipients.update);
app.delete('/api/recipients/delete/:id', Auth.verifyToken, Recipients.delete);

app.get('/api/transaction/getAll', Auth.verifyToken, Transaction.getAllTransactions);
app.get('/api/transaction/getIncoming', Auth.verifyToken, Transaction.getIncomingTransactions);
app.get('/api/transaction/getOutgoing', Auth.verifyToken, Transaction.getOutgoingTransactions);
app.post('/api/transaction/custom', Auth.verifyToken, Transaction.addCustomTransaction);
app.post('/api/transaction/domestic', Auth.verifyToken, Transaction.domesticTransaction);
app.post('/api/transaction/external', Auth.verifyToken, Transaction.externalTransaction);
app.post('/api/transaction/transfer', Auth.verifyToken, Transaction.transfer);
app.delete('/api/transaction/delete/:id', Auth.verifyToken, Transaction.deleteTransaction);

app.get('/api/statistics/getAll', Auth.verifyToken, Statistics.getStatistics);

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Welcome to bank app !'});
});

app.listen(3000)
console.log('app running on port ', 3000);