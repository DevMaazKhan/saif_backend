import { ItemModel } from '../model';
import {
  CreateItemPayload,
  ItemFindPayload,
  ItemUniqueFindPayload,
  UpdateItemPayload,
} from '../type/item.type';

class ItemService {
  private moduleName: string;

  private serviceName: string = 'ItemService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: ItemFindPayload) {
    console.log(this.moduleName);

    const result = await ItemModel.findMany(args);

    return result;
  }

  async findOne(args?: ItemUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await ItemModel.findFirst({
      where: args,
    });

    return result;
  }

  async create(body: CreateItemPayload) {
    console.log(this.moduleName);

    const result = await ItemModel.create({ data: body });

    return result;
  }

  async createWithID(body: CreateItemPayload & { id: string }) {
    console.log(this.moduleName);

    const result = await ItemModel.create({ data: body });

    return result;
  }

  async update(body: Partial<UpdateItemPayload>, where: ItemUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await ItemModel.update({ data: body, where });

    return result;
  }

  async delete(where: ItemUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await ItemModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return ItemModel.deleteMany();
  }
}

export default ItemService;
