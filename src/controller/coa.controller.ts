import { Response } from 'express';
import { COAService } from '../service';
import { AC_TYPE } from '../util/setup';
import asyncHandler from '../middleware/asyncHandler';

class COAController {
  private coaService: COAService;

  constructor() {
    this.coaService = new COAService('COAController');

    this.create = this.create.bind(this);
    this.getAllExpenseAccounts = this.getAllExpenseAccounts.bind(this);
    this.update = this.update.bind(this);
  }

  getAllExpenseAccounts = asyncHandler(async (req: any, res: Response) => {
    const expenseAccounts = await this.coaService.find({
      where: {
        acType: AC_TYPE.EXPENSE_ACCOUNT,
      },
      orderBy: {
        acName: 'asc',
      },
    });

    res.status(200).json({
      message: 'Fetched',
      expenseAccounts,
    });
  });

  create = asyncHandler(async (req: any, res: Response) => {
    await this.coaService.create({
      acName: req.body.acName,
      acType: req.body.acType,
    });

    res.status(200).send('Hello world');
  });

  update = asyncHandler(async (req: any, res: Response) => {
    const { acID } = req.params;

    if (!acID) throw Error('Account not found!');

    await this.coaService.update(
      {
        acName: req.body.acName,
      },
      { id: acID }
    );

    res.status(200).send('Hello world');
  });
}

export default COAController;
