import { InventoryTransactionModel } from '../model';
import {
  CreateInventoryTransactionPayload,
  InventoryTransactionFindPayload,
  InventoryTransactionUniqueFindPayload,
  UpdateInventoryTransactionPayload,
} from '../type/inventoryTransaction.type';

class InventoryTransactionService {
  private moduleName: string;

  private serviceName: string = 'InventoryTransactionService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async findOne(args: InventoryTransactionUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await InventoryTransactionModel.findUnique({
      where: args,
      select: {
        id: true,
        partyID: true,
        salesmanID: true,
        transactionAmount: true,
        transactionDate: true,
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
        inventoryTransactionItems: {
          select: {
            id: true,
            itemID: true,
            comQty: true,
            bonusQty: true,
            price: true,
            item: {
              select: {
                nameFull: true,
                unitsInCarton: true,
              },
            },
          },
        },
      },
    });

    return result;
  }

  async find(args?: InventoryTransactionFindPayload) {
    console.log(this.moduleName);

    return InventoryTransactionModel.findMany({
      ...args,
      select: {
        id: true,
        transactionNo: true,
        transactionDate: true,
        transactionType: true,
        partyID: true,
        promoID: true,
        areaID: true,
        salesmanID: true,
        narration: true,
        discountAmount: true,
        balanceAmount: true,
        netAmount: true,
        transactionAmount: true,
        cashAmount: true,
        creditAmount: true,
        createdAt: true,
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
        inventoryTransactionItems: {
          select: {
            bonusQty: true,
            comQty: true,
            itemID: true,
            price: true,
            total: true,
          },
        },
      },
    });
  }

  async create(body: CreateInventoryTransactionPayload) {
    console.log(this.moduleName);

    let salesmanData = {};
    if (body.salesmanID) {
      salesmanData = {
        salesman: {
          connect: {
            id: body.salesmanID,
          },
        },
      };
    }

    const result = await InventoryTransactionModel.create({
      data: {
        areaID: body.areaID,
        balanceAmount: body.balanceAmount,
        cashAmount: body.cashAmount,
        creditAmount: body.creditAmount,
        discountAmount: body.discountAmount,
        narration: body.narration,
        netAmount: body.netAmount,
        promoID: body.promoID,
        transactionAmount: body.transactionAmount,
        transactionDate: body.transactionDate,
        transactionNo: body.transactionNo,
        transactionType: body.transactionType,
        inventoryTransactionItems: {
          createMany: {
            data: body.inventoryTransactionItems,
          },
        },
        ...salesmanData,
        party: {
          connect: {
            id: body.partyID,
          },
        },
      },
    });

    return result;
  }

  async update(
    body: UpdateInventoryTransactionPayload,
    where: InventoryTransactionUniqueFindPayload
  ) {
    console.log(this.moduleName);

    const result = await InventoryTransactionModel.update({
      data: body,
      where,
    });

    return result;
  }

  async delete(where: InventoryTransactionUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await InventoryTransactionModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return InventoryTransactionModel.deleteMany();
  }
}

export default InventoryTransactionService;
