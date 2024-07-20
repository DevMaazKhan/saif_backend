import { Router } from 'express';
import ItemController from '../controller/item.controller';

class ItemRoute {
  private itemController: ItemController;

  private route: Router = Router();

  constructor() {
    this.itemController = new ItemController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route
      .route('/')
      .get(this.itemController.getAll)
      .post(this.itemController.create);

    this.route
      .route('/:itemID')
      .get(this.itemController.getSingle)
      .put(this.itemController.update);
  }

  getRouter() {
    return this.route;
  }
}

export default ItemRoute;
