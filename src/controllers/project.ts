import { Response, Request } from 'express';
import mongoose from 'mongoose';
import isStringCheck, { isStringCheckArray } from '../util';
import { ProjectSchema, ProjectModel } from '../models/project';
import { UserDataSchema } from '../models/userdata';
import { AccountSchema } from '../models';

type func = (req: Request, res: Response) => void;

interface Project {
  createProject: func;
  getProjectsWithOwner: func;
  getAllProjects: func;
  joinProject: func;
  getProjectByID: func;
  getAllUserDataByProjectID: func;
}

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

const getAllProjects: func = (req, res) => {
  return res.status(501);
};

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
  return ProjectModel.addTeammate(req.session.account._id, id, err => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.json({ result: 'teammate added' });
  });
};

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

const Project: Project = {
  createProject,
  getProjectsWithOwner,
  getAllProjects,
  getProjectByID,
  joinProject,
  getAllUserDataByProjectID
};

export default Project;