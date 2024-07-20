import { Router } from 'express';
import BackupController from '../controller/backup.controller';
import upload from '../util/multer';

class BackupRoute {
  private backupController: BackupController;

  private route: Router = Router();

  constructor() {
    this.backupController = new BackupController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.route('/').get(this.backupController.createBackup);
    this.route
      .route('/import')
      .post(upload.single('file'), this.backupController.importBackup);
  }

  getRouter() {
    return this.route;
  }
}

export default BackupRoute;
