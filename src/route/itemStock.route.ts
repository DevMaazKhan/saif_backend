import { Router } from 'express';
import ItemStockController from '../controller/itemStock.controller';

class ItemStock {
  private itemStockController: ItemStockController;

  private route: Router = Router();

  constructor() {
    this.itemStockController = new ItemStockController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.route('/').get(this.itemStockController.getItemStock);
  }

  getRouter() {
    return this.route;
  }
}

export default ItemStock;
