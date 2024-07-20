import { Response } from 'express';
import { AreaService, PartyService } from '../service';
import { AC_TYPE, PARTY_TYPES } from '../util/setup';
import SalesmanCustomerService from '../service/salesmanCustomer.service';
import asyncHandler from '../middleware/asyncHandler';

class PartyController {
  private partyService: PartyService;

  private areaService: AreaService;

  private salesmanCustomerService: SalesmanCustomerService;

  private controller = 'some';

  constructor() {
    this.partyService = new PartyService('PartyController');
    this.areaService = new AreaService('PartyController');
    this.salesmanCustomerService = new SalesmanCustomerService(
      'PartyController'
    );

    this.getAll = this.getAll.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
    this.getAllCompany = this.getAllCompany.bind(this);
    this.getAllCustomer = this.getAllCustomer.bind(this);
    this.getAllSalesman = this.getAllSalesman.bind(this);
    this.getSalesmanCustomers = this.getSalesmanCustomers.bind(this);
    this.create = this.create.bind(this);
  }

  getAll = asyncHandler(async (req: any, res: Response) => {
    const parties = await this.partyService.find({
      orderBy: {
        nameFull: 'desc',
      },
    });

    res.status(200).json({
      message: 'Fetched',
      parties,
    });
  });

  getSingle = asyncHandler(async (req: any, res: Response) => {
    const { partyID } = req.params;

    if (!partyID) throw Error('PartyID not found!');

    const party = await this.partyService.findOne({
      where: {
        id: partyID,
      },
      include: {
        area: true,
        customerSalesman: true,
      },
    });

    if (party?.type === PARTY_TYPES.CUSTOMER) {
      party.salesmanID = party.customerSalesman[0]?.salesmanID;
    }

    res.status(200).json({
      message: 'Fetched',
      party,
    });
  });

  getAllSalesman = asyncHandler(async (req: any, res: Response) => {
    const parties = await this.partyService.find({
      where: {
        type: PARTY_TYPES.SALESMAN,
      },
      orderBy: {
        nameFull: 'desc',
      },
    });

    res.status(200).json({
      message: 'Fetched',
      parties,
    });
  });

  getSalesmanCustomers = asyncHandler(async (req: any, res: Response) => {
    const customers = await this.partyService.find({
      where: {
        type: PARTY_TYPES.CUSTOMER,
        customerSalesman: {
          every: {
            salesmanID: req.params.salesmanID,
          },
        },
      },
      select: {
        id: true,
        nameFull: true,
        area: {
          select: {
            name: true,
          },
        },
        accountTransactions: {
          select: {
            id: true,
            credit: true,
            debit: true,
          },
          where: {
            acType: AC_TYPE.SALE_ACCOUNT,
          },
        },
      },
    });

    res.status(200).json({
      message: 'Fetched',
      customers,
    });
  });

  getAllCompany = asyncHandler(async (req: any, res: Response) => {
    const parties = await this.partyService.find({
      where: {
        type: PARTY_TYPES.COMPANY,
      },
      orderBy: {
        nameFull: 'desc',
      },
    });

    res.status(200).json({
      message: 'Fetched',
      parties,
    });
  });

  getAllCustomer = asyncHandler(async (req: any, res: Response) => {
    const parties = await this.partyService.find({
      where: {
        type: PARTY_TYPES.CUSTOMER,
      },
      include: {
        area: true,
      },
      orderBy: {
        nameFull: 'desc',
      },
    });

    res.status(200).json({
      message: 'Fetched',
      parties,
    });
  });

  create = asyncHandler(async (req: any, res: Response) => {
    const { body } = req;

    let area = null;
    if (body.type === PARTY_TYPES.CUSTOMER) {
      area = await this.areaService.findOne({
        where: {
          name: body.areaName,
        },
      });

      if (!area) {
        const newArea = await this.areaService.create({
          name: body.areaName,
        });

        area = newArea;
      }
    }

    const party = await this.partyService.create({
      email1: body.email1,
      email2: body.email2,
      email3: body.email3,
      phone1: body.phone1,
      phone2: body.phone2,
      phone3: body.phone3,
      nameFull: body.nameFull,
      nameShort: body.nameShort || '',
      address: body.address,
      areaID: body.type === PARTY_TYPES.CUSTOMER ? area?.id || null : null,
      type: body.type,
    });

    if (party.type === PARTY_TYPES.CUSTOMER && body.salesmanID) {
      await this.salesmanCustomerService.create({
        customerID: party.id,
        salesmanID: body.salesmanID,
      });
    }

    res.status(200).send({ message: 'Created', party });
  });

  update = asyncHandler(async (req: any, res: Response) => {
    const { partyID } = req.params;
    const { body } = req;

    let area = null;
    if (body.type === PARTY_TYPES.CUSTOMER) {
      area = await this.areaService.findOne({
        where: {
          name: body.areaName,
        },
      });

      if (!area) {
        const newArea = await this.areaService.create({
          name: body.areaName,
        });

        area = newArea;
      }
    }

    const party = await this.partyService.update(
      {
        email1: body.email1,
        email2: body.email2,
        email3: body.email3,
        phone1: body.phone1,
        phone2: body.phone2,
        phone3: body.phone3,
        nameFull: body.nameFull,
        nameShort: body.nameShort,
        address: body.address,
        areaID: body.type === PARTY_TYPES.CUSTOMER ? area?.id || null : null,
      },
      {
        id: partyID,
      }
    );

    if (party.type === PARTY_TYPES.CUSTOMER && body.salesmanID) {
      await this.salesmanCustomerService.update(
        {
          salesmanID: body.salesmanID,
        },
        {
          customerID: party.id,
        }
      );
    }

    res.status(200).send({ message: 'Created', party });
  });
}

export default PartyController;
