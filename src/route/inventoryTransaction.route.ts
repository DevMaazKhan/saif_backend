import { Router } from 'express';
import InventoryTransactionController from '../controller/inventoryTransaction.controller';

class InventoryTransactionRoute {
  private inventoryTransaction: InventoryTransactionController;

  private route: Router = Router();

  constructor() {
    this.inventoryTransaction = new InventoryTransactionController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.get('/item', this.inventoryTransaction.getItemInvoices);
    this.route.get('/customer', this.inventoryTransaction.getCustomerSales);
    this.route.get('/company', this.inventoryTransaction.getCompanyPurchases);
    this.route.get('/salesman', this.inventoryTransaction.getSalesmanSales);
    this.route.get(
      '/customer/accountData',
      this.inventoryTransaction.getCustomerAccountData
    );
    this.route.get(
      '/company/accountData',
      this.inventoryTransaction.getCompanyAccountData
    );
    this.route.post(
      '/customer/receiveCash',
      this.inventoryTransaction.customerReceiveCash
    );
    this.route.post('/customer/addCredit', this.inventoryTransaction.addCredit);
    this.route.post(
      '/company/receiveCash',
      this.inventoryTransaction.companyReceiveCash
    );
    this.route.post(
      '/customer/return',
      this.inventoryTransaction.customerSaleReturn
    );

    this.route
      .route('/purchaseInvoice')
      .post(this.inventoryTransaction.createPurchaseInvoice)
      .get(this.inventoryTransaction.getAllPurchaseInvoices);
    this.route
      .route('/salesInvoice')
      .post(this.inventoryTransaction.createSalesInvoice)
      .get(this.inventoryTransaction.getAllSalesInvoice);

    this.route.get(
      '/purchase/:id',
      this.inventoryTransaction.getSinglePurchaseInvoice
    );
    this.route.get(
      '/sale/:id',
      this.inventoryTransaction.getSingleSalesInvoice
    );
  }

  getRouter() {
    return this.route;
  }
}

export default InventoryTransactionRoute;
