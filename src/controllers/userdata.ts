import { Response, Request } from 'express';
import { UserDataModel, UpdateUserData } from '../models/userdata';
import isStringCheck from '../util';

type func = (req: Request, res: Response) => void;

interface UserData {
  getUserData: func;
  updateUserData: func;
}

const getUserData = (req: Request, res: Response) => {
  if (!req.session || !req.session.account) {
    res.status(400).json({ error: 'no valid session' });
    return;
  }
  UserDataModel.findUserDataByOwnerID(req.session.account._id, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    // todo: potentially a problem here. Dual data nesting
    return res.json({ data: doc });
  });
};

const updateUserData = (req: Request, res: Response) => {
  const { fullname, email, twitter, photo } = req.body;
  try {
    isStringCheck(fullname, email, twitter, photo);
  } catch (err) {
    res.status(400).json({ error: err });
    return;
  }
  if (!req.session) {
    res.status(400).json({ error: 'no valid session' });
    return;
  }

  const userData: UpdateUserData = {
    fullname: fullname || '',
    email: email || '',
    twitter: twitter || '',
    photo: photo || '',
    owner: req.session.account._id
  };

  UserDataModel.updateUserDataByOwnerID(
    req.session.account._id,
    userData,
    err => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.json({ result: 'data updated' });
    }
  );
};

const UserData: UserData = {
  getUserData,
  updateUserData
};

export default UserData;
