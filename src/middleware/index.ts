import { Request, Response, NextFunction } from 'express';

const isHTTPS = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // return a link
      return res.json({link:`https://${req.hostname}${req.url}`});
    }
  }
  return next();
};

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

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.account) {
    return next();
  }
  return res.json({ result: 'requires log in' }).status(400);
};

export const auth = (req: Request, res: Response) => {
  if (req.session && req.session.account) {
    return res.json({ redirect: '' });
  }
  return res.json({ redirect: '/login' });
};

export const pub = (req: Request, res: Response) => {
  if (!req.session || !req.session.account) {
    return res.json({ redirect: '' });
  }
  return res.json({ redirect: '/dashboard' });
};

export default isHTTPS;
