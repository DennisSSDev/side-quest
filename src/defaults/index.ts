import fs from 'fs';

const genAsset = (filename: string) => {
  let path = `${__dirname}/img/${filename}`;
  if (process.env.NODE_ENV === 'production') {
    path = `${__dirname}/../../src/defaults/img/${filename}`;
  }
  const binary = fs.readFileSync(path);
  return Buffer.from(binary).toString('base64');
};

export const DefaultFileData = {
  img: { defaultUserImage: '' }
};

const generateDefaultFiles = () => {
  DefaultFileData.img.defaultUserImage = `data:image/png;base64, ${genAsset(
    'default-user.png'
  )}`;
};

export default generateDefaultFiles;
