import { Router } from 'express';
import AccountTransactionController from '../controller/accountTransaction.controller';

class AccountTransactionRoute {
  private accountTransaction: AccountTransactionController;

  private route: Router = Router();

  constructor() {
    this.accountTransaction = new AccountTransactionController();

    this.initRoutes();
  }

  private initRoutes() {
    this.route.get('/close', this.accountTransaction.getMonthClose);
    this.route.get('/expense/list', this.accountTransaction.getAllExpenses);
    this.route.post('/expense/add', this.accountTransaction.createExpense);
    this.route.put(
      '/expense/update/:id',
      this.accountTransaction.updateExpense
    );
    this.route.get(
      '/expense/list/:id',
      this.accountTransaction.getAllExpensesByAccount
    );
  }

  getRouter() {
    return this.route;
  }
}

export default AccountTransactionRoute;
