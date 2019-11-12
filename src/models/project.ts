import mongoose, { Schema, Document } from 'mongoose';

/**
 * Data Model for storing projects.
 * A project is a peice of data that groups users together based on
 * a task they will work together on
 */

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
  // retrieves the latest created projects based on the specified amount number
  static getLatestProjects = (amount: number, callback: cb) => {
    return ProjectSchema.find()
      .sort({ _id: -1 })
      .limit(amount)
      .exec(callback);
  };

  // returns all the projects that were created by the specified owner doc id
  static findAllProjectsByOwnerID = (ownerID: string, callback: cb) => {
    const search = {
      owner: convertId(ownerID)
    };
    return ProjectSchema.find(search, callback);
  };

  // returns the project by the given doc id
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

  // searcches and retrieves all the projects that match the given title based on regex
  static getProjectsByName = (amount: number, title: string, callback: cb) => {
    return ProjectSchema.find(
      {
        projectName: { $regex: title, $options: 'i' }
      },
      callback
    );
  };

  // retrives all the userIDs associated with a project,
  // that is the creator of the project and the members that joined
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

  // updates the projects teammate list by adding a new teammate
  // the teammate is an id of the user
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
