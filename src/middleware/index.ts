import { Request, Response, NextFunction } from 'express';

/**
 * detects if the request is coming from a secure connection.
 * If it's not secure, return a secure url back to the home page
 */
const isHTTPS = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // return a link
      return res.json({ link: `https://${req.hostname}` });
    }
  }
  return next();
};

/**
 * detects whether the request is coming from a user that is logged out.
 * if the user is logged out, continue the request process
 * otherwise return a require json to log out
 */
export const isLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.account) {
    return next();
  }
  return res.json({ result: 'requires log out' });
};

/**
 * check for whether the user is logged in
 */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.account) {
    return next();
  }
  return res.json({ result: 'requires log in' }).status(400);
};

/**
 * authentication check
 * if the user doesn't have a valid session, redirect them to the login
 */
export const auth = (req: Request, res: Response) => {
  if (req.session && req.session.account) {
    return res.json({ redirect: '' });
  }
  return res.json({ redirect: '/login' });
};

/**
 * detect if this is a public session (i.e, no session)
 * if this is not a public session, redirect user to the dashboard
 */
export const pub = (req: Request, res: Response) => {
  if (!req.session || !req.session.account) {
    return res.json({ redirect: '' });
  }
  return res.json({ redirect: '/dashboard' });
};

export default isHTTPS;
