import { Router } from 'express';
import AreaController from '../controller/area.controller';

class AreaRoute {
  private areaController: AreaController;

  private route: Router = Router();

  constructor() {
    this.areaController = new AreaController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.route('/').get(this.areaController.getAll);
    this.route
      .route('/:areaID/customers')
      .get(this.areaController.getAreaCustomers);
  }

  getRouter() {
    return this.route;
  }
}

export default AreaRoute;
