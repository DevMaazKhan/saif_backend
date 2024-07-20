/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Response } from 'express';
import moment from 'moment';
import {
  DocumentCounterService,
  InventoryTransactionService,
  PartyService,
  COAService,
  AccountTransactionService,
  ItemService,
} from '../service';
import {
  AC_TYPE,
  INVOICE_PAYMENT_TYPES,
  PARTY_TYPES,
  TRANSACTION_TYPES,
} from '../util/setup';
import ItemStockAction from '../action/itemStock.action';
import asyncHandler from '../middleware/asyncHandler';
import lodash from 'lodash';

class InventoryTransactionController {
  private inventoryTransactionService: InventoryTransactionService;

  private accountTransactionService: AccountTransactionService;

  private documentCounterService: DocumentCounterService;

  private partyService: PartyService;

  private coaService: COAService;

  private itemStockAction: ItemStockAction;

  private itemService: ItemService;

  private controller = 'some';

  constructor() {
    this.inventoryTransactionService = new InventoryTransactionService(
      'InventoryTransactionController'
    );
    this.documentCounterService = new DocumentCounterService(
      'InventoryTransactionController'
    );
    this.partyService = new PartyService('InventoryTransactionController');
    this.coaService = new COAService('InventoryTransactionController');
    this.accountTransactionService = new AccountTransactionService(
      'InventoryTransactionController'
    );
    this.itemStockAction = new ItemStockAction();
    this.itemService = new ItemService('InventoryTransactionController');

    this.createPurchaseInvoice = this.createPurchaseInvoice.bind(this);
    this.createSalesInvoice = this.createSalesInvoice.bind(this);
    this.getAllSalesInvoice = this.getAllSalesInvoice.bind(this);
    this.getAllPurchaseInvoices = this.getAllPurchaseInvoices.bind(this);
    this.getItemInvoices = this.getItemInvoices.bind(this);
    this.getCustomerSales = this.getCustomerSales.bind(this);
    this.getCompanyPurchases = this.getCompanyPurchases.bind(this);
    this.getSalesmanSales = this.getSalesmanSales.bind(this);
    this.getCustomerAccountData = this.getCustomerAccountData.bind(this);
    this.getCompanyAccountData = this.getCompanyAccountData.bind(this);
    this.customerReceiveCash = this.customerReceiveCash.bind(this);
    this.companyReceiveCash = this.companyReceiveCash.bind(this);
    this.customerSaleReturn = this.customerSaleReturn.bind(this);
    this.getSinglePurchaseInvoice = this.getSinglePurchaseInvoice.bind(this);
    this.getSingleSalesInvoice = this.getSingleSalesInvoice.bind(this);
  }

  getItemInvoices = asyncHandler(async (req: any, res: Response) => {
    const { itemID, invoiceType, withDate, dateFrom, dateTo } = req.query;

    const select = {
      transactionDate: true,
      transactionNo: true,
      transactionAmount: true,
      transactionType: true,
      inventoryTransactionItems: {
        where: {
          itemID,
        },
        select: {
          price: true,
          comQty: true,
          bonusQty: true,
        },
      },
      party: {
        select: {
          nameFull: true,
        },
      },
      salesman: {
        select: {
          nameFull: true,
        },
      },
    };

    let invoices: any[] = [];
    let transactionDate;
    if (withDate !== 'false' && dateFrom && dateTo) {
      transactionDate = {
        lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
        gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
      };
    }

    switch (invoiceType) {
      case 'sales':
        invoices = await this.inventoryTransactionService.find({
          where: {
            transactionType: TRANSACTION_TYPES.SALES_INVOICE,
            transactionDate,
            inventoryTransactionItems: {
              some: {
                itemID,
              },
            },
          },
          select,
        });
        break;
      case 'purchase':
        invoices = await this.inventoryTransactionService.find({
          where: {
            transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE,
            transactionDate,

            inventoryTransactionItems: {
              some: {
                itemID,
              },
            },
          },
          select,
        });
        break;
      case 'both':
        invoices = await this.inventoryTransactionService.find({
          where: {
            transactionDate,
            inventoryTransactionItems: {
              some: {
                itemID,
              },
            },
          },
          select,
        });
        break;
      default:
        invoices = [];
    }

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  getSinglePurchaseInvoice = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.params;

    const invoice = await this.inventoryTransactionService.findOne({ id });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoice,
    });
  });

  getSingleSalesInvoice = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.params;

    const invoice = await this.inventoryTransactionService.findOne({ id });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoice,
    });
  });

  getCustomerSales = asyncHandler(async (req: any, res: Response) => {
    const { customerID, withDate, dateFrom, dateTo } = req.query;

    const select = {
      transactionDate: true,
      transactionNo: true,
      transactionAmount: true,
      transactionType: true,
      party: {
        select: {
          nameFull: true,
        },
      },
    };

    let invoices: any[] = [];
    let transactionDate;
    if (withDate !== 'false' && dateFrom && dateTo) {
      transactionDate = {
        lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
        gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
      };
    }

    invoices = await this.inventoryTransactionService.find({
      where: {
        transactionType: TRANSACTION_TYPES.SALES_INVOICE,
        transactionDate,
        partyID: customerID,
      },
      select,
    });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  getCompanyPurchases = asyncHandler(async (req: any, res: Response) => {
    const { companyID, withDate, dateFrom, dateTo } = req.query;

    const select = {
      transactionDate: true,
      transactionNo: true,
      transactionAmount: true,
      transactionType: true,
      party: {
        select: {
          nameFull: true,
        },
      },
    };

    let invoices: any[] = [];
    let transactionDate;
    if (withDate !== 'false' && dateFrom && dateTo) {
      transactionDate = {
        lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
        gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
      };
    }

    invoices = await this.inventoryTransactionService.find({
      where: {
        transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE,
        transactionDate,
        partyID: companyID,
      },
      select,
    });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  getCustomerAccountData = asyncHandler(async (req: any, res: Response) => {
    const { customerID } = req.query;

    const customerSales = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.SALE_ACCOUNT,
        partyID: customerID,
      },
    });
    const customerSaleReturns = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.SALE_RETURN_ACCOUNT,
        partyID: customerID,
      },
    });
    const customerCash = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.CASH_ACCOUNT,
        partyID: customerID,
      },
    });
    const customerCredit = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.CREDIT_ACCOUNT,
        partyID: customerID,
      },
    });

    const totalCustomerSales = customerSales.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalCustomerSaleReturns = customerSaleReturns.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalCustomerCash = customerCash.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalCustomerCredit = customerCredit.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );

    const data = {
      totalCustomerSales,
      totalCustomerSaleReturns,
      totalCustomerCash,
      totalCustomerCredit,
      list: lodash.orderBy(
        [...(customerCash || []), ...(customerCredit || [])].filter(
          (el) => +el.credit > 0
        ),
        'createdAt',
        'desc'
      ),
    };

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      data,
    });
  });

  getCompanyAccountData = asyncHandler(async (req: any, res: Response) => {
    const { companyID } = req.query;

    const companyPurchases = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.PURCHASE_ACCOUNT,
        partyID: companyID,
      },
    });
    const companyCash = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.CASH_ACCOUNT,
        partyID: companyID,
      },
    });
    const companyCredit = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.CREDIT_ACCOUNT,
        partyID: companyID,
      },
    });

    const totalCompanyPurchases = companyPurchases.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalCompanyCash = companyCash.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );
    const totalCompanyCredit = companyCredit.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );

    const data = {
      totalCompanyCash,
      totalCompanyCredit,
      totalCompanyPurchases,
    };

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      data,
    });
  });

  getSalesmanSales = asyncHandler(async (req: any, res: Response) => {
    const { salesmanID, withDate, dateFrom, dateTo, withProduct, productID } =
      req.query;

    const select = {
      transactionDate: true,
      transactionNo: true,
      transactionAmount: true,
      transactionType: true,
      party: {
        select: {
          nameFull: true,
        },
      },
    };

    let invoices: any[] = [];
    let transactionDate;
    let inventoryTransactionItems;
    if (withDate !== 'false' && dateFrom && dateTo) {
      transactionDate = {
        lte: moment(dateTo, 'YYYY-MM-DD').toDate(),
        gte: moment(dateFrom, 'YYYY-MM-DD').toDate(),
      };
    }

    if (withProduct !== 'false' && productID) {
      inventoryTransactionItems = {
        some: {
          itemID: productID,
        },
      };
    }

    invoices = await this.inventoryTransactionService.find({
      where: {
        transactionType: TRANSACTION_TYPES.SALES_INVOICE,
        transactionDate,
        salesmanID,
        inventoryTransactionItems,
      },
      select,
    });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  getAllPurchaseInvoices = asyncHandler(async (req: any, res: Response) => {
    const invoices = await this.inventoryTransactionService.find({
      where: {
        transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  createPurchaseInvoice = asyncHandler(async (req: any, res: Response) => {
    const { body } = req;

    const transactionNumber =
      await this.documentCounterService.getNextDocumentNumber({
        transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE,
      });

    if (body.lineItems.length === 0) return;

    const total = body.lineItems.reduce(
      (prev: number, curr: any) => (prev += curr.purchasePrice * curr.comQty),
      0
    );

    let cashAmount = 0;
    let creditAmount = 0;

    switch (body.paymentType) {
      case INVOICE_PAYMENT_TYPES.ON_CASH:
        cashAmount = total;
        creditAmount = 0;
        break;
      case INVOICE_PAYMENT_TYPES.ON_CREDIT:
        cashAmount = 0;
        creditAmount = total;
        break;
      case INVOICE_PAYMENT_TYPES.PARTIAL:
        cashAmount = body.cashAmount;
        creditAmount = total - body.cashAmount;
        break;
      default:
        cashAmount = 0;
        creditAmount = 0;
    }

    const transaction = await this.inventoryTransactionService.create({
      transactionNo: transactionNumber,
      transactionDate: new Date(),
      transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE,
      partyID: body.companyID,
      promoID: null,
      areaID: null,
      salesmanID: null,
      narration: body.narration || '',
      discountAmount: body.discountNumber || 0,
      balanceAmount: +total,
      netAmount: +total + (body.discountNumber || 0),
      transactionAmount: +total + (body.discountNumber || 0),
      cashAmount: +cashAmount,
      creditAmount: +creditAmount,
      inventoryTransactionItems: body.lineItems.map((item: any) => ({
        bonusQty: +item.bonusQty,
        comQty: +item.comQty,
        itemID: item.itemID,
        price: +item.purchasePrice,
        total: +(item.comQty * item.purchasePrice),
      })),
    });

    for (let i = 0; i < body.lineItems.length; i++) {
      const lineItem = body.lineItems[i];

      await this.itemStockAction.increaseItemStockQty({
        balanceBonusQty: +lineItem.bonusQty,
        balanceComQty: +lineItem.comQty,
        itemID: lineItem.itemID,
        transactionDate: new Date(),
        transactionNumber: transaction.transactionNo,
        purchasePrice: lineItem.purchasePrice,
        salePrice: lineItem.salePrice,
      });

      await this.itemService.update(
        {
          purchasePrice: +lineItem.purchasePrice,
          salePrice: +lineItem.salePrice,
        },
        {
          id: lineItem.itemID,
        }
      );
    }

    const purchaseAccount = await this.coaService.findOne({
      id: AC_TYPE.PURCHASE_ACCOUNT,
    });

    if (!purchaseAccount) throw Error('Purchase Account is not defined!');

    await this.accountTransactionService.create({
      accountID: purchaseAccount.id,
      acType: purchaseAccount.acType,
      partyID: body.companyID,
      transactionID: transaction.id,
      credit: +total,
      debit: 0,
      narration: null,
    });

    if (cashAmount > 0) {
      const cashAccount = await this.coaService.findOne({
        id: AC_TYPE.CASH_ACCOUNT,
      });

      if (!cashAccount) throw Error('Cash Account is not defined!');

      await this.accountTransactionService.create({
        accountID: cashAccount.id,
        acType: cashAccount.acType,
        partyID: body.companyID,
        transactionID: transaction.id,
        credit: +cashAmount,
        debit: 0,
        narration: null,
      });
    }

    if (creditAmount > 0) {
      const creditAccount = await this.coaService.findOne({
        id: AC_TYPE.CREDIT_ACCOUNT,
      });

      if (!creditAccount) throw Error('Credit Account is not defined!');

      await this.accountTransactionService.create({
        accountID: creditAccount.id,
        acType: creditAccount.acType,
        partyID: body.companyID,
        transactionID: transaction.id,
        credit: +creditAmount,
        debit: 0,
        narration: null,
      });
    }

    res.status(200).send({
      message: 'Created',
      transaction,
    });
  });

  getAllSalesInvoice = asyncHandler(async (req: any, res: Response) => {
    const invoices = await this.inventoryTransactionService.find({
      where: {
        transactionType: TRANSACTION_TYPES.SALES_INVOICE,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    res.status(200).send({
      message: 'Purchase Invoices Fetched',
      invoices,
    });
  });

  createSalesInvoice = asyncHandler(async (req: any, res: Response) => {
    const { body } = req;

    const transactionNumber =
      await this.documentCounterService.getNextDocumentNumber({
        transactionType: TRANSACTION_TYPES.SALES_INVOICE,
      });

    if (body.lineItems.length === 0) return;

    const customer = await this.partyService.findOne({
      where: {
        type: PARTY_TYPES.CUSTOMER,
        id: body.customerID,
      },
    });

    if (!customer) throw Error('Customer not found!');

    const salesman = await this.partyService.findOne({
      where: {
        type: PARTY_TYPES.SALESMAN,
        id: body.salesmanID,
      },
    });

    const total = body.lineItems.reduce(
      (prev: number, curr: any) => (prev += curr.price * curr.comQty),
      0
    );

    let cashAmount = 0;
    let creditAmount = 0;

    switch (body.paymentType) {
      case INVOICE_PAYMENT_TYPES.ON_CASH:
        cashAmount = total;
        creditAmount = 0;
        break;
      case INVOICE_PAYMENT_TYPES.ON_CREDIT:
        cashAmount = 0;
        creditAmount = total;
        break;
      case INVOICE_PAYMENT_TYPES.PARTIAL:
        cashAmount = body.cashAmount;
        creditAmount = total - body.cashAmount;
        break;
      default:
        cashAmount = 0;
        creditAmount = 0;
    }

    const transaction = await this.inventoryTransactionService.create({
      transactionNo: transactionNumber,
      transactionDate: new Date(),
      transactionType: TRANSACTION_TYPES.SALES_INVOICE,
      partyID: customer.id || '',
      promoID: null,
      areaID: customer.areaID || null,
      salesmanID: salesman?.id || null,
      narration: body.narration || '',
      discountAmount: body.discountNumber || 0,
      balanceAmount: total,
      netAmount: total + (body.discountNumber || 0),
      transactionAmount: total + (body.discountNumber || 0),
      cashAmount: +cashAmount,
      creditAmount: +creditAmount,
      inventoryTransactionItems: body.lineItems.map((item: any) => ({
        bonusQty: +item.bonusQty,
        comQty: +item.comQty,
        itemID: item.itemID,
        price: +item.price,
        total: +(item.comQty * item.price),
      })),
    });

    for (let i = 0; i < body.lineItems.length; i++) {
      const lineItem = body.lineItems[i];

      await this.itemStockAction.decreaseItemStockQty({
        balanceBonusQty: +lineItem.bonusQty,
        balanceComQty: +lineItem.comQty,
        itemID: lineItem.itemID,
        transactionDate: new Date(),
        transactionNumber: transaction.transactionNo,
        purchasePrice: lineItem.purchasePrice,
        salePrice: lineItem.salePrice,
      });
    }

    const saleAccount = await this.coaService.findOne({
      id: AC_TYPE.SALE_ACCOUNT,
    });

    if (!saleAccount) throw Error('Sale Account is not defined!');

    await this.accountTransactionService.create({
      accountID: saleAccount.id,
      acType: saleAccount.acType,
      partyID: body.customerID,
      transactionID: transaction.id,
      credit: +cashAmount + +creditAmount,
      debit: 0,
      narration: null,
    });

    if (cashAmount > 0) {
      const cashAccount = await this.coaService.findOne({
        id: AC_TYPE.CASH_ACCOUNT,
      });

      if (!cashAccount) throw Error('Cash Account is not defined!');

      await this.accountTransactionService.create({
        accountID: cashAccount.id,
        acType: cashAccount.acType,
        partyID: body.customerID,
        transactionID: transaction.id,
        credit: +cashAmount,
        debit: 0,
        narration: `Cash for ${transaction.transactionNo}`,
      });
    }

    if (creditAmount > 0) {
      const creditAccount = await this.coaService.findOne({
        id: AC_TYPE.CREDIT_ACCOUNT,
      });

      if (!creditAccount) throw Error('Credit Account is not defined!');

      await this.accountTransactionService.create({
        accountID: creditAccount.id,
        acType: creditAccount.acType,
        partyID: body.customerID,
        transactionID: transaction.id,
        credit: +creditAmount,
        debit: 0,
        narration: `Credit for ${transaction.transactionNo}`,
      });
    }

    res.status(200).send({
      message: 'Created',
      transaction,
    });
  });

  customerReceiveCash = asyncHandler(async (req: any, res: Response) => {
    const { customerID, amount } = req.body;

    const customer = await this.partyService.findOne({
      where: {
        id: customerID,
        type: PARTY_TYPES.CUSTOMER,
      },
    });

    if (!customer) throw Error('Customer not found!');

    const cashAccount = await this.coaService.findOne({
      id: AC_TYPE.CASH_ACCOUNT,
    });

    if (!cashAccount) throw Error('Cash Account not defined!');

    await this.accountTransactionService.create({
      accountID: cashAccount.id,
      acType: cashAccount.acType,
      credit: +amount,
      debit: 0,
      partyID: customer.id,
      transactionID: null,
      narration: `Cash Receive`,
    });

    const creditAccount = await this.coaService.findOne({
      id: AC_TYPE.CREDIT_ACCOUNT,
    });

    if (!creditAccount) throw Error('Credit Account not defined!');

    const accountTransaction = await this.accountTransactionService.create({
      accountID: creditAccount.id,
      acType: creditAccount.acType,
      credit: 0,
      debit: +amount,
      partyID: customer.id,
      transactionID: null,
      narration: `Cash Receive`,
    });

    res.status(200).send({
      message: 'Created',
      accountTransaction,
    });
  });

  addCredit = asyncHandler(async (req: any, res: Response) => {
    const { customerID, amount, message } = req.body;

    const customer = await this.partyService.findOne({
      where: {
        id: customerID,
        type: PARTY_TYPES.CUSTOMER,
      },
    });

    if (!customer) throw Error('Customer not found!');

    const creditAccount = await this.coaService.findOne({
      id: AC_TYPE.CREDIT_ACCOUNT,
    });

    if (!creditAccount) throw Error('Credit Account not defined!');

    const accountTransaction = await this.accountTransactionService.create({
      accountID: creditAccount.id,
      acType: creditAccount.acType,
      credit: +amount,
      debit: 0,
      partyID: customer.id,
      transactionID: null,
      narration: message,
    });

    res.status(200).send({
      message: 'Created',
      accountTransaction,
    });
  });

  companyReceiveCash = asyncHandler(async (req: any, res: Response) => {
    const { companyID, amount } = req.body;

    const company = await this.partyService.findOne({
      where: {
        id: companyID,
        type: PARTY_TYPES.COMPANY,
      },
    });

    if (!company) throw Error('Company not found!');

    const cashAccount = await this.coaService.findOne({
      id: AC_TYPE.CASH_ACCOUNT,
    });

    if (!cashAccount) throw Error('Cash Account not defined!');

    await this.accountTransactionService.create({
      accountID: cashAccount.id,
      acType: cashAccount.acType,
      credit: +amount,
      debit: 0,
      partyID: company.id,
      transactionID: null,
      narration: null,
    });

    const creditAccount = await this.coaService.findOne({
      id: AC_TYPE.CREDIT_ACCOUNT,
    });

    if (!creditAccount) throw Error('Credit Account not defined!');

    const accountTransaction = await this.accountTransactionService.create({
      accountID: creditAccount.id,
      acType: creditAccount.acType,
      credit: 0,
      debit: +amount,
      partyID: company.id,
      transactionID: null,
      narration: null,
    });

    res.status(200).send({
      message: 'Created',
      accountTransaction,
    });
  });

  customerSaleReturn = asyncHandler(async (req: any, res: Response) => {
    const { customerID, lineItems } = req.body;

    const customer = await this.partyService.findOne({
      where: {
        id: customerID,
        type: PARTY_TYPES.CUSTOMER,
      },
    });

    if (!customer) throw Error('Customer not found!');

    for (let i = 0; i < lineItems.length; i++) {
      const lineItem = lineItems[i];

      await this.itemStockAction.increaseItemStockQty({
        balanceBonusQty: 0,
        balanceComQty: +lineItem.comQty,
        itemID: lineItem.itemID,
        transactionDate: new Date(),
        transactionNumber: '',
        purchasePrice: lineItem.purchasePrice,
        salePrice: lineItem.salePrice,
      });
    }

    const amount = lineItems.reduce(
      (prev: number, curr: any) => (prev += curr.price * curr.comQty),
      0
    );

    const returnAccount = await this.coaService.findOne({
      id: AC_TYPE.SALE_RETURN_ACCOUNT,
    });

    if (!returnAccount) throw Error('Sale Return Account not defined!');

    await this.accountTransactionService.create({
      accountID: returnAccount.id,
      acType: returnAccount.acType,
      credit: +amount,
      debit: 0,
      partyID: customer.id,
      transactionID: null,
      narration: null,
    });

    const saleAccount = await this.coaService.findOne({
      id: AC_TYPE.SALE_ACCOUNT,
    });

    if (!saleAccount) throw Error('Sale Account not defined!');

    await this.accountTransactionService.create({
      accountID: saleAccount.id,
      acType: saleAccount.acType,
      credit: 0,
      debit: +amount,
      partyID: customer.id,
      transactionID: null,
      narration: null,
    });

    let cashAmount = 0;

    const customerCredit = await this.accountTransactionService.find({
      where: {
        accountID: AC_TYPE.CREDIT_ACCOUNT,
        partyID: customerID,
      },
    });

    const totalCustomerCredit = customerCredit.reduce(
      (prev, curr) => prev + (curr.credit ? curr.credit : -curr.debit),
      0
    );

    if (totalCustomerCredit > 0) {
      cashAmount = amount - totalCustomerCredit;

      let creditAmount = 0;

      if (+cashAmount > 0) {
        creditAmount = totalCustomerCredit;
      } else {
        creditAmount = amount;
      }

      if (totalCustomerCredit > 0) {
        const creditAccount = await this.coaService.findOne({
          id: AC_TYPE.CREDIT_ACCOUNT,
        });

        if (!creditAccount) throw Error('Credit Account not defined!');

        await this.accountTransactionService.create({
          accountID: creditAccount.id,
          acType: creditAccount.acType,
          credit: 0,
          debit: +creditAmount,
          partyID: customer.id,
          transactionID: null,
          narration: null,
        });
      }
    } else {
      cashAmount = amount;
    }

    if (+cashAmount > 0) {
      const cashAccount = await this.coaService.findOne({
        id: AC_TYPE.CASH_ACCOUNT,
      });

      if (!cashAccount) throw Error('Cash Account not defined!');

      await this.accountTransactionService.create({
        accountID: cashAccount.id,
        acType: cashAccount.acType,
        credit: 0,
        debit: +cashAmount,
        partyID: customer.id,
        transactionID: null,
        narration: null,
      });
    }

    res.status(200).send({
      message: 'Created',
      undefined,
    });
  });
}

export default InventoryTransactionController;
