import { Router } from 'express';
import COAController from '../controller/coa.controller';

class COARoute {
  private coaController: COAController;

  private route: Router = Router();

  constructor() {
    this.coaController = new COAController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route
      .route('/')
      .post(this.coaController.create)
      .get(this.coaController.getAllExpenseAccounts);

    this.route.route('/:acID').put(this.coaController.update);
  }

  getRouter() {
    return this.route;
  }
}

export default COARoute;
