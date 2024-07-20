import { Router } from 'express';
import ItemRoute from './route/item.route';
import PartyRoute from './route/party.route';
import AreaRoute from './route/area.route';
import InventoryTransactionRoute from './route/inventoryTransaction.route';
import ItemStockRoute from './route/itemStock.route';
import BackupRoute from './route/backup.route';
import COARoute from './route/coa.route';
import AccountTransactionRoute from './route/accountTransaction.route';

class Routes {
  private router: Router = Router();

  private itemRouter: ItemRoute = new ItemRoute();

  private partyRouter: PartyRoute = new PartyRoute();

  private areaRouter: AreaRoute = new AreaRoute();

  private coaRouter: COARoute = new COARoute();

  private itemStockRouter: ItemStockRoute = new ItemStockRoute();

  private accountTransactionRoute: AccountTransactionRoute =
    new AccountTransactionRoute();

  private inventoryTransactionRoute: InventoryTransactionRoute =
    new InventoryTransactionRoute();

  private backupRoute: BackupRoute = new BackupRoute();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use('/item', this.itemRouter.getRouter());
    this.router.use('/party', this.partyRouter.getRouter());
    this.router.use('/area', this.areaRouter.getRouter());
    this.router.use('/coa', this.coaRouter.getRouter());
    this.router.use('/stock', this.itemStockRouter.getRouter());
    this.router.use(
      '/inventoryTransaction',
      this.inventoryTransactionRoute.getRouter()
    );
    this.router.use(
      '/accountTransaction',
      this.accountTransactionRoute.getRouter()
    );
    this.router.use('/backup', this.backupRoute.getRouter());
  }

  getRouter() {
    return this.router;
  }
}

export default Routes;
