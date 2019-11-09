import { Response, Request } from 'express';
import { PremiumModel } from '../models/premium';

type func = (req: Request, res: Response) => void;

interface Premium {
  activatePremium: func;
  getUserPremiumStatus: func;
}

const activatePremium = (req: Request, res: Response) => {
  if (!req.session || !req.session.account) {
    return res.status(400).json({ error: 'no valid session' });
  }
  const ownerID = req.session.account._id;
  return PremiumModel.updateStatusByOwnerID(ownerID, true, error => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.json({ result: 'premium activated' });
  });
};

const getUserPremiumStatus = (req: Request, res: Response) => {
  if (!req.session || !req.session.account) {
    return res.status(400).json({ error: 'no valid session' });
  }
  const ownerID = req.session.account._id;
  return PremiumModel.getStatusByOwnerID(ownerID, (error, doc) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (!doc) {
      return res.json({
        status: false
      });
    }
    return res.json({ status: doc.active });
  });
};

const Premium: Premium = {
  activatePremium,
  getUserPremiumStatus
};

export default Premium;
