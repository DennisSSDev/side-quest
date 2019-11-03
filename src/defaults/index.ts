import fs from 'fs';

const genAsset = (filename: string) => {
  const binary = fs.readFileSync(`${__dirname}/img/${filename}`);
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
