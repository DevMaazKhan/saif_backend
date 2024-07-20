import { Response } from 'express';
import { AreaService, PartyService } from '../service';
import { PARTY_TYPES } from '../util/setup';
import asyncHandler from '../middleware/asyncHandler';

class AreaController {
  private areaService: AreaService;

  private privateService: PartyService;

  private controller = 'some';

  constructor() {
    this.areaService = new AreaService('AreaController');
    this.privateService = new PartyService('AreaController');

    this.getAll = this.getAll.bind(this);
    this.getAreaCustomers = this.getAreaCustomers.bind(this);
  }

  getAll = asyncHandler(async (req: any, res: Response) => {
    const areas = await this.areaService.find();

    res.status(200).json({
      message: 'Fetched',
      areas,
    });
  });

  getAreaCustomers = asyncHandler(async (req: any, res: Response) => {
    const customers = await this.privateService.find({
      where: {
        type: PARTY_TYPES.CUSTOMER,
        areaID: req.params.areaID,
      },
    });

    res.status(200).json({
      message: 'Fetched',
      customers,
    });
  });
}

export default AreaController;
