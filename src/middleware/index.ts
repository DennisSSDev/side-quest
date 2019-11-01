import { Request, Response, NextFunction } from 'express';

const isHTTPS = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
  }
  return next();
};

export default isHTTPS;
