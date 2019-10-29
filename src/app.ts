import path from 'path';
import express, { Request, Response } from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose, { ConnectionOptions } from 'mongoose';
import expressHandlebars from 'express-handlebars';
import expsession from 'express-session';
import url, { UrlWithStringQuery } from 'url';
import csrf from 'csurf';

// engrave all the routes here
import router from './router';

interface ResponseError extends Error {
  status?: number;
  code?: string;
}

type Engine = (
  path: string,
  options: object,
  callback: (e: any, rendered: string) => void
) => void;

const RedisStore = require('connect-redis')(expsession);

const port = process.env.PORT || process.env.NODE_PORT || 5000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/DomoMaker';

mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true } as ConnectionOptions,
  err => {
    if (err) {
      console.log('unable to init the mongo db');
      throw err;
    }
  }
);

let redisURL: UrlWithStringQuery = {
  hostname: 'redis-17436.c84.us-east-1-2.ec2.cloud.redislabs.com',
  port: '17436',
  query: ''
};

let redisPASS = 'Nx1R0REyrFlJYTdaGhwzxRC31uI6EUai';

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  if (redisURL.auth) {
    const [, el] = redisURL.auth.split(':');
    redisPASS = el;
  }
}

const app = express();

app.use(
  '/assets',
  express.static(path.resolve(`${__dirname}/../client/public/`))
);
app.use(express.static(path.resolve(`${__dirname}/../client/build`)));
app.use(favicon(`${__dirname}/../client/public/favicon.ico`));
app.disable('x-powered-by');
app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  expsession({
    // key: 'sessionid',
    store: new RedisStore({
      host: redisURL.hostname,
      port: redisURL.port,
      pass: redisPASS
    }),
    secret: 'Domo Not Artigato',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true
    }
  })
);

app.engine('handlebars', expressHandlebars() as Engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

app.use(csrf());
app.use(
  (
    err: ResponseError,
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    console.log('Missing CSRF token');
    return false;
  }
);

router(app);

const appListener = (...args: any[]) => {
  if (args[0] as Error) {
    console.log(args[0]);
    throw args[0];
  }
  console.log(`Listening on port: ${port}`);
};

app.listen(port, appListener);
