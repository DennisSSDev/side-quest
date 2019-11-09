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
import Project from './controllers/project';
import Premium from './controllers/premium';

const router = (app: Express) => {
  app.get('/default/image', isHTTPS, isLoggedIn, DefaultData.getDefaultImage);

  app.get('/userdata', isHTTPS, isLoggedIn, UserData.getUserData);

  app.get('/auth', isHTTPS, auth);
  app.get('/public', isHTTPS, pub);
  app.get('/logout', isHTTPS, isLoggedIn, Account.logout);

  app.get('/token', isHTTPS, Account.getToken);
  app.get('/meta', isHTTPS, Account.meta);

  app.get('/myProjects', isHTTPS, isLoggedIn, Project.getProjectsWithOwner);
  app.get('/joinedProjects', isHTTPS, isLoggedIn, Project.getJoinedProjects);
  app.get('/project', isHTTPS, isLoggedIn, Project.getProjectByID);
  app.get(
    '/project/userdata',
    isHTTPS,
    isLoggedIn,
    Project.getAllUserDataByProjectID
  );
  app.get('/projects', isHTTPS, isLoggedIn, Project.getAllProjects);

  app.get('/premium', isHTTPS, isLoggedIn, Premium.activatePremium);
  app.get('/premium/status', isHTTPS, isLoggedIn, Premium.getUserPremiumStatus);

  app.post('/signup', isHTTPS, isLoggedOut, Account.signup);
  app.post('/login', isHTTPS, isLoggedOut, Account.login);
  app.post('/userdata', isHTTPS, isLoggedIn, UserData.updateUserData);
  app.post('/changePassword', isHTTPS, isLoggedIn, Account.changePassword);

  app.post('/createProject', isHTTPS, isLoggedIn, Project.createProject);
  app.post('/joinProject', isHTTPS, isLoggedIn, Project.joinProject);

  app.get('*', isHTTPS, (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
  });
};

export default router;
