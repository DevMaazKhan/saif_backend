import { Response } from 'express';
import { ItemStockService } from '../service';
import asyncHandler from '../middleware/asyncHandler';

class ItemStockController {
  private itemStockService: ItemStockService;

  private controller = 'some';

  constructor() {
    this.itemStockService = new ItemStockService('ItemStockController');

    this.getItemStock = this.getItemStock.bind(this);
  }

  getItemStock = asyncHandler(async (req: any, res: Response) => {
    const { itemID } = req.query;

    const stock = await this.itemStockService.findOne({
      where: {
        itemID,
      },
      include: {
        item: {
          select: {
            salePrice: true,
          },
        },
      },
    });

    const itemStock = {
      comQty: stock?.balanceComQty || 0,
      bonusQty: stock?.balanceBonusQty || 0,
      salePrice: (stock as any)?.item?.salePrice || 0,
      purchasePrice: stock?.purchasePrice || 0,
    };

    res.status(200).json({
      message: 'Fetched',
      itemStock,
    });
  });
}

export default ItemStockController;
