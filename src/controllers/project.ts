import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { ProjectSchema, ProjectModel, convertId } from '../models/project';
import isStringCheck, { isStringCheckArray } from '../util';

import { UserDataSchema, UserDataModel } from '../models/userdata';
import { AccountSchema } from '../models';

type func = (req: Request, res: Response) => void;

interface Project {
  createProject: func;
  getProjectsWithOwner: func;
  getAllProjects: func;
  joinProject: func;
  getProjectByID: func;
  getAllUserDataByProjectID: func;
  getJoinedProjects: func;
}

/**
 * generate a new project record in the db
 * grabs all the form data supplied by the user, validates it
 */
const createProject: func = (req, res) => {
  if (!req.session || !req.session.account) {
    res.status(400).json({ error: 'no valid session' });
    return;
  }
  const {
    projectName,
    external,
    hook,
    description,
    joinRequirements,
    startDate,
    endDate,
    projectIcon,
    projectScreenshots
  } = req.body;
  try {
    isStringCheck(
      projectName,
      hook,
      description,
      external,
      joinRequirements,
      startDate,
      endDate,
      projectIcon
    );
    isStringCheckArray(projectScreenshots);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  // checks if the strings are === ''. projectIcon, projectScreenshots & external are allowed to be empty
  if (
    !projectName ||
    !hook ||
    !description ||
    !joinRequirements ||
    !startDate ||
    !endDate
  ) {
    res.status(400).json({ error: "provided parameters can't be empty" });
    return;
  }

  const data = {
    projectName,
    hook,
    description,
    external,
    joinRequirements,
    startDate,
    endDate,
    projectIcon,
    projectScreenshots,
    owner: req.session.account._id
  };

  const newProject = new ProjectSchema(data);
  const promise = newProject.save();

  promise.then(() => {
    res.json({ redirect: '/dashboard' });
  });
  promise.catch(err => {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'project name already in use' });
    }
    return res.status(400).json({ error: 'an error occured' });
  });
};

/**
 * get all projects data information based on the owner id
 */
const getProjectsWithOwner: func = (req, res) => {
  if (!req.session || !req.session.account) {
    res.status(400).json({ error: 'no valid session' });
    return;
  }
  ProjectModel.findAllProjectsByOwnerID(req.session.account._id, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ doc });
  });
};

/**
 * find the first few latest created projects
 * if a title is provided, find the first few that match it
 */
const getAllProjects: func = (req, res) => {
  const { query } = req;
  if (!query) {
    return res.status(400).json({ error: 'no valid query' });
  }
  const { title } = query;
  if (!title) {
    // then it's a defualt request, just give the latest 10 entries
    return ProjectModel.getLatestProjects(10, (err, docs) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.json({ docs });
    });
  }
  // regex
  const formattedTitle = title.replace(/[+]/g, ' ');
  // if the title is provided, search by it and return the first 10 elements
  return ProjectModel.getProjectsByName(10, formattedTitle, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ docs });
  });
};

/**
 * get project data by its own id
 */
const getProjectByID: func = (req, res) => {
  const { query } = req;
  if (!query) {
    return res.status(400).json({ error: 'no valid query' });
  }

  const { id } = query;
  if (!id) {
    return res.status(400).json({ error: 'no valid id' });
  }
  return ProjectSchema.findById(query.id, (err, doc) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.json({ doc });
  });
};

/**
 * create a new member in a project
 */
const joinProject: func = (req, res) => {
  if (!req.session || !req.session.account) {
    return res.status(400).json({ error: 'no valid session' });
  }
  const { id } = req.body;
  try {
    isStringCheck(id);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
  const userID = req.session.account._id;
  return ProjectModel.addTeammate(userID, id, err => {
    if (err) {
      return res.status(400).json({ err });
    }
    return UserDataSchema.findOne({ owner: userID }, (error, doc) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (!doc) {
        return res
          .status(400)
          .json({ error: 'could not find the userdata by user id' });
      }
      let { joinedProjects } = doc;
      if (!joinedProjects) {
        joinedProjects = [convertId(id)];
      } else if (!joinedProjects.includes(convertId(id)))
        joinedProjects.push(convertId(id));
      const copy = doc;
      copy.joinedProjects = joinedProjects;
      return UserDataSchema.updateOne({ owner: userID }, copy, error_ => {
        if (error_) {
          return res.status(400).json({ error: error_ });
        }
        return res.json({ result: 'teammate added' });
      });
    });
  });
};

/**
 * returns all user meta data of the owner and members of the project
 * + their usernames
 */
const getAllUserDataByProjectID: func = (req, res) => {
  const { query } = req;
  if (!query) {
    return res.status(400).json({ error: 'no valid query' });
  }

  const { id } = query;
  if (!id) {
    return res.status(400).json({ error: 'no valid id' });
  }
  return ProjectModel.getOwnerAndTeammatesIDs(
    id,
    (err, userIDs: [mongoose.Types.ObjectId]) => {
      if (err) {
        return res.json({ error: err });
      }
      return UserDataSchema.find(
        {
          owner: { $in: userIDs }
        },
        (error, docs) => {
          if (error) {
            return res.json({ error });
          }

          return AccountSchema.find(
            {
              _id: { $in: userIDs }
            },
            (error_, docos) => {
              if (error_) {
                return res.json({ error: err });
              }
              const dataOut: Array<{}> = [];
              docos.forEach((val, i) => {
                dataOut.push({ ...docs[i], username: val.username });
              });
              return res.json({ dataOut });
            }
          );
        }
      );
    }
  );
};

/**
 * retrieves all the data on all the projects that
 * a user has joined by the user id
 */
const getJoinedProjects: func = (req, res) => {
  if (!req.session || !req.session.account) {
    res.status(400).json({ error: 'no valid session' });
    return;
  }
  const userID = req.session.account._id;

  UserDataModel.findUserDataByOwnerID(userID, (err, doc) => {
    if (err) {
      return res.json({ error: err });
    }
    if (!doc) {
      return res.json({ error: 'no valid user data has been found' });
    }
    return ProjectModel.getProjectsByIDs(doc.joinedProjects, (error, docs) => {
      if (error) {
        return res.json({ error });
      }
      if (!docs) {
        return res.json({
          error: 'no project has been found with the provided ids'
        });
      }
      return res.json({ docs });
    });
  });
};

const Project: Project = {
  createProject,
  getProjectsWithOwner,
  getAllProjects,
  getProjectByID,
  joinProject,
  getAllUserDataByProjectID,
  getJoinedProjects
};

export default Project;
