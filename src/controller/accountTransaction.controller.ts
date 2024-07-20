import { Response } from 'express';
import { AccountTransactionService, COAService } from '../service';
import { AC_TYPE } from '../util/setup';
import asyncHandler from '../middleware/asyncHandler';
import moment from 'moment';

class AccountTransactionController {
  private accountTransactionService: AccountTransactionService;

  private coaService: COAService;

  private controller = 'some';

  constructor() {
    this.accountTransactionService = new AccountTransactionService(
      'AccountTransactionController'
    );
    this.coaService = new COAService('AccountTransactionController');

    this.getAllExpenses = this.getAllExpenses.bind(this);
    this.getMonthClose = this.getMonthClose.bind(this);
    this.getAllExpensesByAccount = this.getAllExpensesByAccount.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
  }

  getAllExpenses = asyncHandler(async (req: any, res: Response) => {
    const expenses = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.EXPENSE_ACCOUNT,
      },
      select: {
        id: true,
        credit: true,
        narration: true,
        accountID: true,
        account: {
          select: {
            acName: true,
          },
        },
      },
    });

    console.log(expenses);

    res.status(200).json({
      message: 'Fetched',
      expenses,
    });
  });

  getMonthClose = asyncHandler(async (req: any, res: Response) => {
    const { dateFrom, dateTo } = req.query;

    const createdAt = {
      gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
      lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
    };

    const purchases = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.PURCHASE_ACCOUNT,
        createdAt,
      },
    });
    const sales = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.SALE_ACCOUNT,
        createdAt,
      },
    });
    const saleReturns = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.SALE_RETURN_ACCOUNT,
        createdAt,
      },
    });
    const expenses = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.EXPENSE_ACCOUNT,
        createdAt,
      },
    });

    const totalPurchases = purchases.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalSales = sales.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalSalesReturns = saleReturns.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalExpenses = expenses.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );

    const data = {
      totalPurchases,
      totalSales,
      totalSalesReturns,
      totalExpenses,
    };

    res.status(200).json({
      message: 'Fetched',
      data,
    });
  });

  getAllExpensesByAccount = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.params;
    const { withDate, dateFrom, dateTo } = req.query;

    let createdAt;
    if (withDate !== 'false' && dateFrom && dateTo) {
      createdAt = {
        gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
        lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
      };
    }

    const expenses = await this.accountTransactionService.find({
      where: {
        acType: AC_TYPE.EXPENSE_ACCOUNT,
        accountID: id,
        createdAt,
      },
      select: {
        id: true,
        credit: true,
        narration: true,
        accountID: true,
        account: {
          select: {
            acName: true,
          },
        },
      },
    });

    console.log(expenses);

    res.status(200).json({
      message: 'Fetched',
      expenses,
    });
  });

  createExpense = asyncHandler(async (req: any, res: Response) => {
    const { amount, narration, acID } = req.body;

    const account = await this.coaService.findOne({
      acType: AC_TYPE.EXPENSE_ACCOUNT,
      id: acID,
    });

    if (!account) throw Error('Account not found!');

    const expense = await this.accountTransactionService.create({
      accountID: acID,
      acType: AC_TYPE.EXPENSE_ACCOUNT,
      credit: +amount,
      debit: 0,
      partyID: null,
      transactionID: null,
      narration,
    });

    res.status(200).json({
      message: 'Fetched',
      expense,
    });
  });

  updateExpense = asyncHandler(async (req: any, res: Response) => {
    const { amount, narration, acID } = req.body;
    const { id } = req.params;

    const account = await this.coaService.findOne({
      acType: AC_TYPE.EXPENSE_ACCOUNT,
      id: acID,
    });

    if (!account) throw Error('Account not found!');

    const expense = await this.accountTransactionService.update(
      {
        credit: +amount,
        narration,
      },
      id
    );

    res.status(200).json({
      message: 'Fetched',
      expense,
    });
  });
}

export default AccountTransactionController;
