import { Response, Request } from 'express';
import { DefaultFileData } from '../defaults';

type func = (req: Request, res: Response) => void;

interface DefaultData {
  getDefaultImage: func;
}

const getDefaultImage = (req: Request, res: Response) => {
  return res.json({ img: DefaultFileData.img.defaultUserImage });
};

const DefaultData: DefaultData = {
  getDefaultImage
};

export default DefaultData;
