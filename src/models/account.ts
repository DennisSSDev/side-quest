import crypto from 'crypto';
import mongoose, { Schema, Document } from 'mongoose';

mongoose.Promise = global.Promise;

const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

export interface IAccountModel extends Document {
  username: string;
  salt: Buffer;
  password: string;
  createdAt: Date;
}

/**
 * Simple callback function type definition
 */
export type cb = (...args: any[]) => void;

const validatePassword = (
  doc: IAccountModel,
  password: string,
  callback: cb
) => {
  const pass = doc.password;
  return crypto.pbkdf2(
    password,
    doc.salt,
    iterations,
    keyLength,
    'RSA-SHA512',
    (err, hash) => {
      if (hash.toString('hex') !== pass) {
        return callback(false);
      }
      return callback(true);
    }
  );
};

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
  },
  salt: {
    type: Buffer,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const AccountSchema = mongoose.model<IAccountModel>('Account', schema);

export class AccountModel {
  static findByUsername = (name: string, callback: cb) => {
    const search = {
      username: name
    };
    return AccountSchema.findOne(search, callback);
  };

  static genHash = (password: string, callback: cb) => {
    const salt = crypto.randomBytes(saltLength);

    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      'RSA-SHA512',
      (err, hash) => callback(salt, hash.toString('hex'))
    );
  };

  static toAPI = (doc: IAccountModel) => ({
    username: doc.username,
    _id: doc._id
  });

  static authenticate = (username: string, password: string, callback: cb) =>
    AccountModel.findByUsername(username, (err, doc) => {
      if (err) {
        return callback(err);
      }

      if (!doc) {
        return callback();
      }

      return validatePassword(doc, password, result => {
        if (result === true) {
          return callback(null, doc);
        }

        return callback();
      });
    });
}

Object.seal(AccountModel);
