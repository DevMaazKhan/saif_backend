import express, { type Express } from 'express';
import config from './util/config';
import logger from './util/logger';
import prisma from './util/db';
import Routes from './routes';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

const app = express();

class Server {
  private app: Express;

  private routes: Routes = new Routes();

  // eslint-disable-next-line no-shadow
  constructor(app: Express) {
    this.app = app;

    this.initBeforeMiddleware();
    this.initServer();
    this.initAppRoutes();
    this.initDatabase();
    this.initAfterMiddleware();
  }

  private initServer() {
    this.app.listen(config.PORT, () => {
      logger.info(`v1.0 Server listening on PORT -> ${config.PORT}`);
    });
  }

  private initAppRoutes() {
    this.app.use('/api/v1', this.routes.getRouter());
  }

  // eslint-disable-next-line class-methods-use-this
  initDatabase() {
    if (config.ENV === 'development') {
      prisma.$connect().then(() => {
        logger.info(`Connected to DB ${config.DATABASE_URL}`);
      });
    }
  }

  private initBeforeMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(errorHandler);
  }

  private initAfterMiddleware() {
    this.app.use(errorHandler);
  }
}

// eslint-disable-next-line no-unused-vars
const server = new Server(app);
