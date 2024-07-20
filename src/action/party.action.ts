import { PartyService } from '../service';
import { CreatePartyPayload } from '../type/party.type';

class PartyAction {
  private partyService: PartyService;

  constructor() {
    this.partyService = new PartyService('PartyAction');

    this.create = this.create.bind(this);
  }

  create(data: CreatePartyPayload) {}
}
