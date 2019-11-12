import fs from 'fs';

/**
 * Helpers for generating default server assets that are not stored in a db
 */

/**
 * helper to make a base64 asset
 * @param filename dir for file
 */
const genAsset = (filename: string) => {
  let path = `${__dirname}/img/${filename}`;
  if (process.env.NODE_ENV === 'production') {
    path = `${__dirname}/../../src/defaults/img/${filename}`;
  }
  const binary = fs.readFileSync(path);
  return Buffer.from(binary).toString('base64');
};

/**
 * Local Storage for images
 */
export const DefaultFileData = {
  img: { defaultUserImage: '' }
};

/**
 * "main" function that will generate all the default files.
 *  if new files are added they must be generated here
 */
const generateDefaultFiles = () => {
  DefaultFileData.img.defaultUserImage = `data:image/png;base64, ${genAsset(
    'default-user.png'
  )}`;
};

export default generateDefaultFiles;
