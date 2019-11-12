import mongoose, { Schema, Document } from 'mongoose';

/**
 * Data Model that stores user's meta data
 * meta data includes email, twitter handle, fullname, etc
 * It is specifically designed to not be included inside the account model
 * as the account model is more prone to security attacks
 * and needs to be as tidy as possibly
 */

mongoose.Promise = global.Promise;

const convertId = mongoose.Types.ObjectId;
export const HardIDConvert = mongoose.Schema.Types.ObjectId;

export interface IUserDataModel extends Document {
  fullname: string;
  email: string;
  twitter: string;
  photo: string;
  owner: mongoose.Schema.Types.ObjectId;
  joinedProjects: [mongoose.Types.ObjectId];
}

export interface UpdateUserData {
  fullname: string;
  email: string;
  twitter: string;
  photo: string;
  owner: mongoose.Schema.Types.ObjectId;
}

/**
 * Simple callback function type definition
 */
export type cb = (...args: any[]) => void;

const schema = new Schema({
  fullname: {
    type: String
  },
  email: {
    type: String
  },
  twitter: {
    type: String
  },
  photo: {
    type: String
  },
  joinedProjects: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'Account'
  }
});

export const UserDataSchema = mongoose.model<IUserDataModel>(
  'UserData',
  schema
);

export class UserDataModel {
  // returns the first user's meta data based on the doc owner id
  static findUserDataByOwnerID = (ownerID: string, callback: cb) => {
    const search = {
      owner: convertId(ownerID)
    };
    return UserDataSchema.findOne(search, callback);
  };

  /**
   * will create user data if not found by the id,
   * essentially meaning that user updated their info for the first time
   */
  static updateUserDataByOwnerID = (
    ownerID: string,
    data: UpdateUserData,
    callback: cb
  ) => {
    const search = {
      owner: convertId(ownerID)
    };
    return UserDataSchema.findOneAndUpdate(
      search,
      data,
      { upsert: true },
      callback
    );
  };
}

Object.seal(UserDataModel);
