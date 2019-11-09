import mongoose, { Schema, Document } from 'mongoose';

mongoose.Promise = global.Promise;

const convertId = mongoose.Types.ObjectId;

export interface IPremiumModel extends Document {
  active: boolean;
  owner: mongoose.Schema.Types.ObjectId;
}

export interface UpdateUserData {
  active: boolean;
  owner: mongoose.Schema.Types.ObjectId;
}

/**
 * Simple callback function type definition
 */
export type cb = (...args: any[]) => void;

const schema = new Schema({
  active: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'Account'
  }
});

export const UserDataSchema = mongoose.model<IPremiumModel>('Premium', schema);

export class PremiumModel {
  static getStatusByOwnerID = (ownerID: string, callback: cb) => {
    const search = {
      owner: convertId(ownerID)
    };
    return UserDataSchema.findOne(search, callback);
  };

  /**
   * will create user data if not found by the id,
   * essentially meaning that user updated their info for the first time
   */
  static updateStatusByOwnerID = (
    ownerID: string,
    status: boolean,
    callback: cb
  ) => {
    const search = {
      owner: convertId(ownerID)
    };
    return UserDataSchema.findOneAndUpdate(
      search,
      { active: status, owner: convertId(ownerID) },
      { upsert: true },
      callback
    );
  };
}

Object.seal(PremiumModel);
