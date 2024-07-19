import express from 'express';
import dotenv from 'dotenv';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';

import blockRouter from './routes/block-routes.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import userRouter from './routes/user-routes.mjs';
import authRouter from './routes/auth-routes.mjs';

import PubNubServer from './pubnub-server.mjs';
import { connectDb } from './config/mongo.mjs';

import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

import ErrorResponse from './utilities/ErrorResponseModel.mjs';
import logger from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config/config.env' });

connectDb();

//!!!!!!!!  MOVE TO CONFIG.ENV
const credentials = {
  publishKey: 'pub-c-81117db3-5cbf-4a58-85e1-fb6f27d423f3',
  subscribeKey: 'sub-c-1d813246-a082-4360-8fbc-d183f17223eb',
  secretKey: 'sec-c-YTY2ZTM3N2ItNzczOC00MTZjLThiNjctMTJjMTJlNGI1YWY4',
  userId: 'masha-test',
};

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({
  blockchain: blockchain,
  transactionPool: transactionPool,
  wallet: wallet,
  credentials: credentials,
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(helmet({ contentSecurityPolicy: false }));
app.use(xss());

const limit = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
});

app.use(limit);
app.use(hpp());

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(cors());

app.use(logger);

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/wallet', transactionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.replaceTransactionMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});
