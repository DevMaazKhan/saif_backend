import { AreaModel } from '../model';
import {
  CreateAreaPayload,
  UpdateAreaPayload,
  AreaFindPayload,
  AreaUniqueFindPayload,
  AreaFindOnePayload,
} from '../type/area.type';

class AreaService {
  private moduleName: string;

  private serviceName: string = 'AreaService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: AreaFindPayload) {
    console.log(this.moduleName);

    const result = await AreaModel.findMany(args);

    return result;
  }

  async findOne(args: AreaFindOnePayload) {
    console.log(this.moduleName);

    const result = await AreaModel.findUnique(args);

    return result;
  }

  async create(body: CreateAreaPayload) {
    console.log(this.moduleName);

    const result = await AreaModel.create({ data: body });

    return result;
  }

  async createWithID(body: CreateAreaPayload & { id: string }) {
    console.log(this.moduleName);

    const result = await AreaModel.create({ data: body });

    return result;
  }

  async update(body: UpdateAreaPayload, where: AreaUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await AreaModel.update({ data: body, where });

    return result;
  }

  async delete(where: AreaUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await AreaModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return AreaModel.deleteMany();
  }
}

export default AreaService;
