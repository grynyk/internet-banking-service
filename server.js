import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
dotenv.config();

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Server for bank app works !'});
})

app.listen(3000)
console.log('app running on port ', 3000);