import { Express } from 'express';
import isHTTPS, {
  isLoggedOut,
  auth,
  pub,
  isLoggedIn
} from './middleware/index';
import Account from './controllers/account';
import UserData from './controllers/userdata';
import DefaultData from './controllers/default';

const router = (app: Express) => {
  app.get('/default/image', isHTTPS, isLoggedIn, DefaultData.getDefaultImage);
  app.get('/userdata', isHTTPS, isLoggedIn, UserData.getUserData);
  app.get('/auth', isHTTPS, auth);
  app.get('/public', isHTTPS, pub);
  app.get('/logout', isHTTPS, isLoggedIn, Account.logout);
  app.get('/token', isHTTPS, Account.getToken);
  app.get('/meta', isHTTPS, Account.meta);

  app.post('/signup', isHTTPS, isLoggedOut, Account.signup);
  app.post('/login', isHTTPS, isLoggedOut, Account.login);
  app.post('/userdata', isHTTPS, isLoggedIn, UserData.updateUserData);
  app.post('/changePassword', isHTTPS, isLoggedIn, Account.changePassword);

  app.get('*', isHTTPS, (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
  });
};

export default router;
