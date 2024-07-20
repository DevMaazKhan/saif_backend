import { COAModel } from '../model';
import {
  COAFindPayload,
  COAUniqueFindPayload,
  CreateCOAPayload,
  UpdateCOAPayload,
} from '../type/coa.types';

class COAService {
  private moduleName: string;

  private serviceName: string = 'COAService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: COAFindPayload) {
    console.log(this.moduleName);

    const result = await COAModel.findMany(args);

    return result;
  }

  async create(body: CreateCOAPayload) {
    console.log(this.moduleName);

    const result = await COAModel.create({ data: body });

    return result;
  }

  async createWithID(body: CreateCOAPayload & { id: string }) {
    console.log(this.moduleName);

    const result = await COAModel.create({ data: body });

    return result;
  }

  async update(body: UpdateCOAPayload, where: COAUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await COAModel.update({ data: body, where });

    return result;
  }

  async findOne(args: COAUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await COAModel.findFirst({ where: args });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return COAModel.deleteMany();
  }
}

export default COAService;
