import mongoose, { Schema, Document } from 'mongoose';

mongoose.Promise = global.Promise;

export const convertId = mongoose.Types.ObjectId;

export interface IProjectModel extends Document {
  projectName: string;
  hook: string;
  description: string;
  external: string;
  joinRequirements: string;
  projectIcon: string;
  projectScreenshots: [String];
  startDate: string;
  endDate: string;
  teammates: [mongoose.Types.ObjectId];
  owner: mongoose.Types.ObjectId;
}

/**
 * Simple callback function type definition
 */
export type cb = (...args: any[]) => void;

const schema = new Schema({
  projectName: {
    type: String,
    unique: true,
    required: true
  },
  hook: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  external: {
    type: String
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  joinRequirements: {
    type: String,
    required: true
  },
  projectIcon: {
    type: String
  },
  projectScreenshots: {
    type: [String]
  },
  teammates: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  }
});

export const ProjectSchema = mongoose.model<IProjectModel>('Project', schema);

export class ProjectModel {
  static getLatestProjects = (amount: number, callback: cb) => {
    return ProjectSchema.find()
      .sort({ _id: -1 })
      .limit(amount)
      .exec(callback);
  };

  static findAllProjectsByOwnerID = (ownerID: string, callback: cb) => {
    const search = {
      owner: convertId(ownerID)
    };
    return ProjectSchema.find(search, callback);
  };

  static getProjectsByIDs = (
    projectIDs: [mongoose.Types.ObjectId],
    callback: cb
  ) => {
    return ProjectSchema.find(
      {
        _id: { $in: projectIDs }
      },
      callback
    );
  };

  static getProjectsByName = (amount: number, title: string, callback: cb) => {
    return ProjectSchema.find(
      {
        projectName: { $regex: title, $options: 'i' }
      },
      callback
    );
  };

  static getOwnerAndTeammatesIDs = (projectID: string, callback: cb) => {
    return ProjectSchema.findById(convertId(projectID), (err, doc) => {
      if (err) {
        return callback(err);
      }
      if (!doc) {
        return callback(new Error('Invalid Doc'));
      }
      const { owner } = doc;
      const { teammates } = doc;
      return callback(null, [owner, ...teammates]);
    });
  };

  static addTeammate = (newMember: string, projectID: string, callback: cb) => {
    ProjectSchema.findById(convertId(projectID), (err, doc) => {
      if (err) {
        return callback(err);
      }
      if (!doc) {
        return callback(new Error('The project is empty'));
      }
      const { teammates } = doc;
      const objID = convertId(newMember);
      if (!teammates.includes(objID)) teammates.push(objID);
      const copy = doc;
      copy.teammates = teammates;
      return ProjectSchema.updateOne({ _id: projectID }, doc, callback);
    });
  };
}

Object.seal(ProjectModel);
