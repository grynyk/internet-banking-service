'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Accounts = require('./controllers/Accounts');

var _Accounts2 = _interopRequireDefault(_Accounts);

var _User = require('./controllers/User');

var _User2 = _interopRequireDefault(_User);

var _middleware = require('./controllers/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _Transaction = require('./controllers/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _Recepients = require('./controllers/Recepients');

var _Recepients2 = _interopRequireDefault(_Recepients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.post('/api/user/create', _User2.default.create);
app.post('/api/user/login', _User2.default.login);
app.post('/api/user/verifyPassword/:id', _User2.default.verifyPassword);
app.delete('/api/user/delete', _middleware2.default.verifyToken, _User2.default.delete);

app.get('/api/accounts/getAll', _middleware2.default.verifyToken, _Accounts2.default.getAllAcounts);

app.post('/api/accounts/primary/create', _middleware2.default.verifyToken, _Accounts2.default.createPrimary);
app.get('/api/accounts/primary/getAll', _middleware2.default.verifyToken, _Accounts2.default.getPrimaryAll);
app.get('/api/accounts/primary/getById/:id', _middleware2.default.verifyToken, _Accounts2.default.getPrimaryById);
app.put('/api/accounts/primary/update/:id', _middleware2.default.verifyToken, _Accounts2.default.updatePrimary);

app.post('/api/accounts/savings/create', _middleware2.default.verifyToken, _Accounts2.default.createSavings);
app.get('/api/accounts/savings/getAll', _middleware2.default.verifyToken, _Accounts2.default.getSavingsAll);
app.get('/api/accounts/savings/getById/:id', _middleware2.default.verifyToken, _Accounts2.default.getSavingsById);
app.put('/api/accounts/savings/update/:id', _middleware2.default.verifyToken, _Accounts2.default.updateSavings);

app.post('/api/recipients/create', _middleware2.default.verifyToken, _Recepients2.default.create);
app.get('/api/recipients/getAll', _middleware2.default.verifyToken, _Recepients2.default.getAll);
app.put('/api/recipients/update/:id', _middleware2.default.verifyToken, _Recepients2.default.update);
app.delete('/api/recipients/delete/:id', _middleware2.default.verifyToken, _Recepients2.default.delete);

app.get('/api/transaction/getAll', _middleware2.default.verifyToken, _Transaction2.default.getAllTransactions);
app.get('/api/transaction/getIncoming', _middleware2.default.verifyToken, _Transaction2.default.getIncomingTransactions);
app.get('/api/transaction/getOutgoing', _middleware2.default.verifyToken, _Transaction2.default.getOutgoingTransactions);
app.post('/api/transaction/domestic', _middleware2.default.verifyToken, _Transaction2.default.domesticTransaction);
app.post('/api/transaction/external', _middleware2.default.verifyToken, _Transaction2.default.externalTransaction);
app.post('/api/transaction/transfer', _middleware2.default.verifyToken, _Transaction2.default.transfer);

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'Welcome to bank app !' });
});

app.listen(3000);
console.log('app running on port ', 3000);