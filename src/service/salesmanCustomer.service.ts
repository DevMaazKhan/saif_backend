import { SalesmanCustomerModel } from '../model';
import {
  CreateSalesmanCustomerPayload,
  SalesmanCustomerFindPayload,
  SalesmanCustomerUniqueFindPayload,
  UpdateSalesmanCustomerPayload,
} from '../type/salesmanCustomer.type';

class SalesmanCustomerService {
  private moduleName: string;

  private serviceName: string = 'SalesmanCustomerService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: SalesmanCustomerFindPayload) {
    console.log(this.moduleName);

    const result = await SalesmanCustomerModel.findMany(args);

    return result;
  }

  async create(body: CreateSalesmanCustomerPayload) {
    console.log(this.moduleName);

    const result = await SalesmanCustomerModel.create({ data: body });

    return result;
  }

  async createWithID(body: CreateSalesmanCustomerPayload & { id: string }) {
    console.log(this.moduleName);

    const result = await SalesmanCustomerModel.create({
      data: {
        id: body.id,
        salesman: {
          connect: {
            id: body.salesmanID,
          },
        },
        customer: {
          connect: {
            id: body.customerID,
          },
        },
      },
    });

    return result;
  }

  async update(
    body: UpdateSalesmanCustomerPayload,
    where: SalesmanCustomerUniqueFindPayload
  ) {
    console.log(this.moduleName);

    const result = await SalesmanCustomerModel.update({ data: body, where });

    return result;
  }

  async delete(where: SalesmanCustomerUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await SalesmanCustomerModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return SalesmanCustomerModel.deleteMany();
  }
}

export default SalesmanCustomerService;
