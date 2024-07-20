import { ItemStockModel } from '../model';
import {
  CreateItemStockPayload,
  ItemStockFindOnePayload,
  ItemStockFindPayload,
  ItemStockUniqueFindPayload,
  UpdateItemStockPayload,
} from '../type/itemStock.type';

class ItemStockService {
  private moduleName: string;

  private serviceName: string = 'ItemStockService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: ItemStockFindPayload) {
    console.log(this.moduleName);

    const result = await ItemStockModel.findMany(args);

    return result;
  }

  async findOne(args: ItemStockFindOnePayload) {
    console.log(this.moduleName);

    const result = await ItemStockModel.findUnique(args);

    return result;
  }

  async create(body: CreateItemStockPayload) {
    console.log(this.moduleName);

    const result = await ItemStockModel.create({
      data: {
        balanceBonusQty: body.balanceBonusQty,
        balanceComQty: body.balanceComQty,
        batchNumber: 'ABC',
        manufactureDate: new Date(),
        purchasePrice: body.purchasePrice,
        salePrice: body.salePrice,
        receivedBonusQty: body.receivedBonusQty,
        receivedComQty: body.receivedComQty,
        transactionDate: body.transactionDate,
        transactionNumber: body.transactionNumber,
        itemID: body.itemID,
      },
    });

    return result;
  }

  async updateAndIncrementStock(
    body: UpdateItemStockPayload,
    where: ItemStockUniqueFindPayload
  ) {
    console.log(this.moduleName);

    const result = await ItemStockModel.update({
      data: {
        transactionDate: body.transactionDate,
        transactionNumber: body.transactionNumber,
        purchasePrice: body.purchasePrice,
        salePrice: body.salePrice,
        balanceBonusQty: {
          increment: body.balanceBonusQty,
        },
        balanceComQty: {
          increment: body.balanceComQty,
        },
      },
      where,
    });

    return result;
  }

  async updateAndDecrementStock(
    body: UpdateItemStockPayload,
    where: ItemStockUniqueFindPayload
  ) {
    console.log(this.moduleName);

    const result = await ItemStockModel.update({
      data: {
        balanceBonusQty: {
          decrement: body.balanceBonusQty,
        },
        balanceComQty: {
          decrement: body.balanceComQty,
        },
      },
      where,
    });

    return result;
  }

  async delete(where: ItemStockUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await ItemStockModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return ItemStockModel.deleteMany();
  }
}

export default ItemStockService;
