import { AccountTransactionModel } from '../model';
import {
  CreateAccountTransactionPayload,
  AccountTransactionFindPayload,
  AccountTransactionUniqueFindPayload,
} from '../type/accountTransaction.type';

class AccountTransactionService {
  private moduleName: string;

  private serviceName: string = 'AccountTransactionService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async findOne(args?: AccountTransactionUniqueFindPayload) {
    console.log(this.moduleName);

    const result = await AccountTransactionModel.findFirst({ where: args });

    return result;
  }

  async find(args?: AccountTransactionFindPayload) {
    console.log(this.moduleName);

    const result = await AccountTransactionModel.findMany(args);

    return result;
  }

  async create(body: CreateAccountTransactionPayload) {
    console.log(this.moduleName);

    const result = await AccountTransactionModel.create({
      data: {
        accountID: body.accountID,
        acType: body.acType,
        partyID: body.partyID,
        transactionID: body.transactionID,
        credit: body.credit,
        debit: body.debit,
        narration: body.narration,
      },
    });

    return result;
  }

  async update(
    body: Partial<CreateAccountTransactionPayload>,
    expenseId: string
  ) {
    console.log(this.moduleName);

    const result = await AccountTransactionModel.update({
      data: {
        credit: body.credit,
        narration: body.narration,
      },
      where: {
        id: expenseId,
      },
    });

    return result;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return AccountTransactionModel.deleteMany();
  }
}

export default AccountTransactionService;
