import { Router } from 'express';
import PartyController from '../controller/party.controller';

class PartyRoute {
  private PartyController: PartyController;

  private route: Router = Router();

  constructor() {
    this.PartyController = new PartyController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.route('/').post(this.PartyController.create);
    this.route.route('/customer').get(this.PartyController.getAllCustomer);
    this.route.route('/salesman').get(this.PartyController.getAllSalesman);
    this.route.route('/company').get(this.PartyController.getAllCompany);
    this.route
      .route('/:partyID')
      .get(this.PartyController.getSingle)
      .put(this.PartyController.update);

    this.route
      .route('/salesman/:salesmanID/customers')
      .get(this.PartyController.getSalesmanCustomers);
  }

  getRouter() {
    return this.route;
  }
}

export default PartyRoute;
