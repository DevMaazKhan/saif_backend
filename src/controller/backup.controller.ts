/* eslint-disable no-await-in-loop */
import { Response } from 'express';
import { Parser } from 'json2csv';
import JSZip from 'jszip';
import unzipper from 'unzipper';
import csvtojson from 'csvtojson';
import {
  AccountTransactionService,
  AreaService,
  COAService,
  DocumentCounterService,
  InventoryTransactionService,
  ItemService,
  ItemStockService,
  PartyService,
} from '../service';
import { PARTY_TYPES, TRANSACTION_TYPES } from '../util/setup';
import SalesmanCustomerService from '../service/salesmanCustomer.service';
import asyncHandler from '../middleware/asyncHandler';

const BACKUP_FILES = {
  COA: 'coa.csv',
  COMPANY: 'company.csv',
  AREA: 'area.csv',
  CUSTOMER: 'customer.csv',
  SALESMAN: 'salesman.csv',
  SALESMAN_CUSTOMER: 'salesmanCustomer.csv',
  ITEM: 'item.csv',
  PURCHASE_INVOICE: 'purchaseInvoices.csv',
  SALE_INVOICES: 'saleInvoices.csv',
  STOCK: 'stocks.csv',
  DOCUMENT_COUNTER: 'documentCounter.csv',
};

class BackupController {
  private partyService: PartyService;

  private areaService: AreaService;

  private itemService: ItemService;

  private salesmanCustomerService: SalesmanCustomerService;

  private documentCounterService: DocumentCounterService;

  private itemStockService: ItemStockService;

  private coaService: COAService;

  private inventoryTransactionService: InventoryTransactionService;

  private accountTransactionService: AccountTransactionService;

  constructor() {
    this.partyService = new PartyService('BackupController');
    this.areaService = new AreaService('BackupController');
    this.itemService = new ItemService('BackupController');
    this.salesmanCustomerService = new SalesmanCustomerService(
      'BackupController'
    );
    this.documentCounterService = new DocumentCounterService(
      'BackupController'
    );
    this.inventoryTransactionService = new InventoryTransactionService(
      'BackupController'
    );
    this.coaService = new COAService('BackupController');
    this.itemStockService = new ItemStockService('BackupController');
    this.accountTransactionService = new AccountTransactionService(
      'BackupController'
    );

    this.createBackup = this.createBackup.bind(this);
    this.importBackup = this.importBackup.bind(this);
  }

  importBackup = asyncHandler(async (req: any, res: Response) => {
    const zipFile = req.file;

    const { buffer } = zipFile;

    unzipper.Open.buffer(buffer)
      .then(async (d) => {
        const { files } = d;

        if (files.length !== Object.keys(BACKUP_FILES).length) {
          throw Error('Some Backup Files are missing!');
        }

        // Deleting all data
        // await this.areaService.deleteAll();
        // await this.partyService.deleteAll();
        // await this.itemService.deleteAll();
        // await this.salesmanCustomerService.deleteAll();
        // await this.coaService.deleteAll();
        // await this.inventoryTransactionService.deleteAll();
        // await this.documentCounterService.deleteAll();
        // await this.itemStockService.deleteAll();
        // await this.accountTransactionService.deleteAll();

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (file.path === BACKUP_FILES.AREA) {
            const fileBuffer = await file.buffer();

            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);

            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.areaService.createWithID({
                id: el.id,
                name: el.name,
              });
            }
          }

          if (file.path === BACKUP_FILES.SALESMAN) {
            const fileBuffer = await file.buffer();

            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);

            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.partyService.createWithID({
                id: el.id,
                address: el.address || null,
                areaID: el.areaID || null,
                email1: el.email1 || null,
                email2: el.email2 || null,
                email3: el.email3 || null,
                nameFull: el.nameFull,
                nameShort: el.nameShort,
                phone1: el.phone1 || null,
                phone2: el.phone2 || null,
                phone3: el.phone3 || null,
                type: PARTY_TYPES.SALESMAN,
              });
            }
          }

          if (file.path === BACKUP_FILES.COMPANY) {
            const fileBuffer = await file.buffer();

            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);

            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.partyService.createWithID({
                id: el.id,
                address: el.address || null,
                areaID: el.areaID || null,
                email1: el.email1 || null,
                email2: el.email2 || null,
                email3: el.email3 || null,
                nameFull: el.nameFull,
                nameShort: el.nameShort,
                phone1: el.phone1 || null,
                phone2: el.phone2 || null,
                phone3: el.phone3 || null,
                type: PARTY_TYPES.COMPANY,
              });
            }
          }

          if (file.path === BACKUP_FILES.CUSTOMER) {
            const fileBuffer = await file.buffer();

            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);
            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.partyService.createWithID({
                id: el.id,
                address: el.address || null,
                areaID: el.areaID || null,
                email1: el.email1 || null,
                email2: el.email2 || null,
                email3: el.email3 || null,
                nameFull: el.nameFull,
                nameShort: el.nameShort,
                phone1: el.phone1 || null,
                phone2: el.phone2 || null,
                phone3: el.phone3 || null,
                type: PARTY_TYPES.CUSTOMER,
              });
            }
          }

          if (file.path === BACKUP_FILES.SALESMAN_CUSTOMER) {
            const fileBuffer = await file.buffer();

            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);
            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];
              if (file.path === BACKUP_FILES.SALESMAN_CUSTOMER) {
                await this.salesmanCustomerService.createWithID({
                  id: el.id,
                  customerID: el.customerID,
                  salesmanID: el.salesmanID,
                });
              }
            }
          }

          if (file.path === BACKUP_FILES.ITEM) {
            const fileBuffer = await file.buffer();
            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);
            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.itemService.createWithID({
                id: el.id,
                nameFull: el.nameFull,
                nameShort: el.nameShort,
                purchasePrice: +el.purchasePrice,
                salePrice: +el.salePrice,
                unitsInCarton: el.unitsInCarton,
                companyID: el.companyID,
              });
            }
          }

          if (file.path === BACKUP_FILES.COA) {
            const fileBuffer = await file.buffer();
            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);
            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.coaService.createWithID({
                id: el.id,
                acName: el.acName,
                acType: el.acType,
              });
            }
          }

          if (file.path === BACKUP_FILES.DOCUMENT_COUNTER) {
            const fileBuffer = await file.buffer();
            const csv = fileBuffer.toString('utf-8');

            const jsonArray = await csvtojson().fromString(csv);
            for (let j = 0; j < jsonArray.length; j++) {
              const el = jsonArray[j];

              await this.documentCounterService.createWithID({
                id: el.id,
                availableNo: +el.availableNo,
                increment: +el.increment,
                isLeftPadded: el.isLeftPadded === 'true',
                length: +el.length,
                paddingCharacter: el.paddingCharacter,
                postfix: el.postfix,
                prefix: el.prefix,
                separator: el.separator,
                start: +el.start,
                transactionType: el.transactionType,
              });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    res.status(200).json({
      message: 'something',
    });
  });

  createBackup = asyncHandler(async (req: any, res: Response) => {
    const companies = await this.partyService.find({
      where: { type: PARTY_TYPES.COMPANY },
    });

    const areas = await this.areaService.find();

    const customers = await this.partyService.find({
      where: { type: PARTY_TYPES.CUSTOMER },
    });

    const salesman = await this.partyService.find({
      where: { type: PARTY_TYPES.SALESMAN },
    });

    const salesmanCustomer = await this.salesmanCustomerService.find();

    const items = await this.itemService.find();

    const purchaseInvoices = await this.inventoryTransactionService.find({
      where: { transactionType: TRANSACTION_TYPES.PURCHASE_INVOICE },
    });

    const purchaseInvoicesList = [];

    for (let i = 0; i < purchaseInvoices.length; i++) {
      const invoice = purchaseInvoices[i];
      for (let j = 0; j < invoice.inventoryTransactionItems.length; j++) {
        const item = invoice.inventoryTransactionItems[j];
        purchaseInvoicesList.push({
          transactionNo: invoice.transactionNo,
          transactionDate: invoice.transactionDate,
          transactionType: invoice.transactionType,
          partyID: invoice.partyID,
          promoID: invoice.promoID,
          areaID: invoice.areaID,
          salesmanID: invoice.salesmanID,
          narration: invoice.narration,
          discountAmount: invoice.discountAmount,
          balanceAmount: invoice.balanceAmount,
          netAmount: invoice.netAmount,
          transactionAmount: invoice.transactionAmount,
          cashAmount: invoice.cashAmount,
          creditAmount: invoice.creditAmount,
          bonusQty: +item.bonusQty,
          comQty: +item.comQty,
          itemID: item.itemID,
          price: +item.price,
          total: +(item.comQty * item.price),
        });
      }
    }

    const salesInvoices = await this.inventoryTransactionService.find({
      where: { transactionType: TRANSACTION_TYPES.SALES_INVOICE },
    });

    const salesInvoicesList = [];

    for (let i = 0; i < salesInvoices.length; i++) {
      const invoice = salesInvoices[i];
      for (let j = 0; j < invoice.inventoryTransactionItems.length; j++) {
        const item = invoice.inventoryTransactionItems[j];
        salesInvoicesList.push({
          transactionNo: invoice.transactionNo,
          transactionDate: invoice.transactionDate,
          transactionType: invoice.transactionType,
          partyID: invoice.partyID,
          promoID: invoice.promoID,
          areaID: invoice.areaID,
          salesmanID: invoice.salesmanID,
          narration: invoice.narration,
          discountAmount: invoice.discountAmount,
          balanceAmount: invoice.balanceAmount,
          netAmount: invoice.netAmount,
          transactionAmount: invoice.transactionAmount,
          cashAmount: invoice.cashAmount,
          creditAmount: invoice.creditAmount,
          bonusQty: +item.bonusQty,
          comQty: +item.comQty,
          itemID: item.itemID,
          price: +item.price,
          total: +(item.comQty * item.price),
        });
      }
    }

    const stocks = await this.itemStockService.find();

    const accounts = await this.coaService.find();

    const documentCounters = await this.documentCounterService.find();

    const parser = new Parser();
    const zip = new JSZip();

    const companyCSV =
      companies.length > 0 ? parser.parse(companies || []) : '';
    const areaCSV = areas.length > 0 ? parser.parse(areas || []) : '';
    const customerCSV =
      customers.length > 0 ? parser.parse(customers || []) : '';
    const salesmanCSV = salesman.length > 0 ? parser.parse(salesman || []) : '';
    const salesmanCustomerCSV =
      salesmanCustomer.length > 0 ? parser.parse(salesmanCustomer || []) : '';
    const itemCSV = items.length > 0 ? parser.parse(items || []) : '';
    const purchaseInvoicesCSV =
      purchaseInvoicesList.length > 0
        ? parser.parse(purchaseInvoicesList || [])
        : '';
    const salesInvoicesCSV =
      salesInvoicesList.length > 0 ? parser.parse(salesInvoicesList || []) : '';
    const stocksCSV = stocks.length > 0 ? parser.parse(stocks || []) : '';
    const accountsCSV = accounts.length > 0 ? parser.parse(accounts || []) : '';
    const documentCounterCSV =
      documentCounters.length > 0 ? parser.parse(documentCounters || []) : '';

    zip.file('company.csv', companyCSV, { binary: true });
    zip.file('area.csv', areaCSV, { binary: true });
    zip.file('customer.csv', customerCSV, { binary: true });
    zip.file('salesman.csv', salesmanCSV, { binary: true });
    zip.file('salesmanCustomer.csv', salesmanCustomerCSV, { binary: true });
    zip.file('item.csv', itemCSV, { binary: true });
    zip.file('coa.csv', accountsCSV, { binary: true });
    zip.file('documentCounter.csv', documentCounterCSV, { binary: true });
    zip.file('purchaseInvoices.csv', purchaseInvoicesCSV, { binary: true });
    zip.file('saleInvoices.csv', salesInvoicesCSV, { binary: true });
    zip.file('stocks.csv', stocksCSV, { binary: true });

    const zipFile = await zip.generateAsync({
      type: 'nodebuffer',
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment;filename=backup.zip');
    res.status(200).end(zipFile);
  });
}

export default BackupController;
