import { Response, Request } from 'express';

interface Account {
  getToken: (req: Request, res: Response) => void;
}

const getToken = (req: Request, res: Response) => {
  const csrfTokenJSON = {
    csrfToken: req.csrfToken()
  };
  res.json(csrfTokenJSON);
};

const Account: Account = {
  getToken
};

export default Account;
