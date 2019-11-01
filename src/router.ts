import { Express } from 'express';
import isHTTPS from './middleware';
import Account from './controllers/account';

const router = (app: Express) => {
  app.get('/token', isHTTPS, Account.getToken);
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
  });
};

export default router;
