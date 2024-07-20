import { Response } from 'express';
import ItemService from '../service/item.service';
import asyncHandler from '../middleware/asyncHandler';

class ItemController {
  private itemService: ItemService;

  private controller = 'some';

  constructor() {
    this.itemService = new ItemService('ItemController');

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
  }

  getAll = asyncHandler(async (req: any, res: Response) => {
    const { companyID } = req.query;

    let items = [];
    if (companyID) {
      items = await this.itemService.find({
        where: {
          companyID,
        },
        orderBy: {
          nameFull: 'asc',
        },
      });
    } else {
      items = await this.itemService.find({
        orderBy: {
          nameFull: 'asc',
        },
      });
    }
    res.status(200).json({
      message: 'Fetched',
      items,
    });
  });

  getSingle = asyncHandler(async (req: any, res: Response) => {
    const { itemID } = req.params;

    const item = await this.itemService.findOne({
      id: itemID,
    });

    res.status(200).json({
      message: 'Fetched',
      item,
    });
  });

  create = asyncHandler(async (req: any, res: Response) => {
    await this.itemService.create({
      companyID: req.body.companyID,
      nameFull: req.body.nameFull,
      nameShort: req.body.nameShort || '',
      purchasePrice: +req.body.purchasePrice,
      salePrice: +req.body.salePrice,
      unitsInCarton: req.body.unitsInCarton,
    });
    res.status(200).send('Hello world');
  });

  update = asyncHandler(async (req: any, res: Response) => {
    const { itemID } = req.params;

    if (!itemID) throw Error('ItemID not found!');

    await this.itemService.update(
      {
        companyID: req.body.companyID,
        nameFull: req.body.nameFull,
        nameShort: req.body.nameShort || '',
        purchasePrice: +req.body.purchasePrice,
        salePrice: +req.body.salePrice,
        unitsInCarton: req.body.unitsInCarton,
      },
      { id: itemID }
    );
    res.status(200).send('Hello world');
  });
}

export default ItemController;
