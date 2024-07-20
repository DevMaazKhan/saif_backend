import { PartyModel } from '../model';
import {
  CreatePartyPayload,
  PartyFindOnePayload,
  PartyFindPayload,
  PartyUniqueFindPayload,
  UpdatePartyPayload,
} from '../type/party.type';

class PartyService {
  private moduleName: string;

  private serviceName: string = 'PartyService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find(args?: PartyFindPayload) {
    console.log(this.moduleName);

    const result = await PartyModel.findMany(args);

    return result;
  }

  async findOne(args: PartyFindOnePayload) {
    console.log(this.moduleName);

    const result = await PartyModel.findUnique(args);

    return result;
  }

  async create(body: CreatePartyPayload) {
    console.log(this.moduleName);

    const result = await PartyModel.create({ data: body });

    return result;
  }

  async createWithID(body: CreatePartyPayload & { id: string }) {
    console.log(this.moduleName);

    let area;
    if (body.areaID) {
      area = {
        connect: {
          id: body.areaID,
        },
      };
    }

    const result = await PartyModel.create({
      data: {
        nameFull: body.nameFull,
        nameShort: body.nameShort,
        type: body.type,
        address: body.address,
        email1: body.email1,
        email2: body.email2,
        email3: body.email3,
        phone1: body.phone1,
        phone2: body.phone2,
        phone3: body.phone3,
        id: body.id,
        area,
      },
    });

    return result;
  }

  async update(body: UpdatePartyPayload, where: PartyUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await PartyModel.update({ data: body, where });

    return result;
  }

  async delete(where: PartyUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await PartyModel.delete({ where });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    const result = await PartyModel.deleteMany();

    return result;
  }
}

export default PartyService;
