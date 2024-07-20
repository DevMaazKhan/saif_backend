import ItemStockService from '../service/itemStock.service';
import { UpdateItemStockPayload } from '../type/itemStock.type';

class ItemStockAction {
  private itemStockService: ItemStockService;

  constructor() {
    this.itemStockService = new ItemStockService('ItemStockAction');
  }

  async increaseItemStockQty(payload: UpdateItemStockPayload) {
    const itemStock = await this.itemStockService.findOne({
      where: {
        itemID: payload.itemID,
      },
    });

    if (itemStock) {
      await this.itemStockService.updateAndIncrementStock(
        {
          balanceBonusQty: payload.balanceBonusQty,
          balanceComQty: payload.balanceComQty,
          itemID: payload.itemID,
          transactionDate: payload.transactionDate,
          transactionNumber: payload.transactionNumber,
          purchasePrice: payload.purchasePrice,
          salePrice: payload.salePrice,
        },
        { id: itemStock.id }
      );
    } else {
      await this.itemStockService.create({
        balanceBonusQty: payload.balanceBonusQty,
        balanceComQty: payload.balanceComQty,
        itemID: payload.itemID,
        purchasePrice: payload.purchasePrice,
        salePrice: payload.salePrice,
        receivedBonusQty: payload.balanceBonusQty,
        receivedComQty: payload.balanceComQty,
        transactionDate: payload.transactionDate,
        transactionNumber: payload.transactionNumber,
      });
    }
  }

  async decreaseItemStockQty(payload: UpdateItemStockPayload) {
    const itemStock = await this.itemStockService.findOne({
      where: {
        itemID: payload.itemID,
      },
    });

    if (!itemStock) return;

    if (itemStock) {
      await this.itemStockService.updateAndDecrementStock(
        {
          balanceBonusQty: payload.balanceBonusQty,
          balanceComQty: payload.balanceComQty,
          itemID: payload.itemID,
          transactionDate: payload.transactionDate,
          transactionNumber: payload.transactionNumber,
          purchasePrice: payload.purchasePrice,
          salePrice: payload.salePrice,
        },
        { id: itemStock.id }
      );
    }
  }
}

export default ItemStockAction;
