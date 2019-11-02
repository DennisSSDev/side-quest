import { Express } from 'express';
import isHTTPS, { isLoggedOut, auth, pub } from './middleware/index';
import Account from './controllers/account';

const router = (app: Express) => {
  app.get('/auth', isHTTPS, auth);
  app.get('/public', isHTTPS, pub);
  app.get('/token', isHTTPS, Account.getToken);
  app.post('/signup', isHTTPS, isLoggedOut, Account.signup);
  app.post('/login', isHTTPS, isLoggedOut, Account.login);
  app.get('*', isHTTPS, (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
  });
};

export default router;
