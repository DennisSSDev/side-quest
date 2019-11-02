import { Response, Request } from 'express';
import { AccountModel, AccountSchema } from '../models';

type func = (req: Request, res: Response) => void;

interface Account {
  getToken: func;
  login: func;
  signup: func;
  logout: func;
}

const getToken = (req: Request, res: Response) => {
  const csrfTokenJSON = {
    csrfToken: req.csrfToken()
  };
  res.json(csrfTokenJSON);
};

const login = (req: Request, res: Response) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  return AccountModel.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'incorrect username or password' });
    }
    const reqC = req;
    if (reqC && reqC.session) {
      reqC.session.account = AccountModel.toAPI(account);
    }
    return res.json({ redirect: '/dashboard' });
  });
};

const signup = (req: Request, res: Response) => {
  const { username, pass, pass2 } = req.body;
  if (
    !(typeof username === 'string') ||
    !(typeof pass === 'string') ||
    !(typeof pass2 === 'string')
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: `Passwords don't match` });
  }

  return AccountModel.genHash(pass, (salt, hash) => {
    const accountData = {
      username,
      salt,
      password: hash
    };
    const newAccount = new AccountSchema(accountData);
    const savePromise = newAccount.save();
    savePromise.then(() => {
      const reqC = req;
      if (reqC && reqC.session) {
        reqC.session.account = AccountModel.toAPI(newAccount);
      }
      res.json({ redirect: '/dashboard' });
    });
    savePromise.catch(err => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already used' });
      }
      return res.status(400).json({ error: 'an error occured' });
    });
  });
};

const logout = (req: Request, res: Response) => {
  try {
    if (req.session) {
      req.session.destroy(() => {});
      res.json({ result: 'session disconnected' });
      return;
    }
    throw new Error('there is no active session');
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const Account: Account = {
  getToken,
  login,
  signup,
  logout
};

export default Account;
