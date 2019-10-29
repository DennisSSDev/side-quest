import { Express } from 'express';

const router = (app: Express) => {
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
  });
};

export default router;
