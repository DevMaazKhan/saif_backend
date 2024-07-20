import { DocumentCounterModel } from '../model';
import {
  CreateDocumentCounterPayload,
  DocumentCounterUniqueFindPayload,
  GetNextDocumentCounterPayload,
} from '../type/documentCounter.type';
import addPadding from '../util/addPadding';

class DocumentCounterService {
  private moduleName: string;

  private serviceName: string = 'DocumentCounterService';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async find() {
    console.log(this.moduleName);

    const result = await DocumentCounterModel.findMany();

    return result;
  }

  async createWithID(data: CreateDocumentCounterPayload & { id: string }) {
    console.log(this.moduleName);

    const result = await DocumentCounterModel.create({ data });

    return result;
  }

  async getNextDocumentNumber(payload: GetNextDocumentCounterPayload) {
    const documentCount = await DocumentCounterModel.findUnique({
      where: {
        transactionType: payload.transactionType,
      },
    });

    if (!documentCount) throw Error('Document Counter not found');

    let documentNumber = '';
    let currentDocumentNumber = documentCount.start;
    let availableDocumentNumber = 0;

    if (documentCount.increment && documentCount.increment > 0) {
      const newDocumentCounter = await this.incrementDocumentNumber({
        transactionType: payload.transactionType,
      });

      availableDocumentNumber = newDocumentCounter.availableNo;
    }

    if (availableDocumentNumber && availableDocumentNumber > 0) {
      currentDocumentNumber = availableDocumentNumber;
    }

    if (documentCount.prefix) documentNumber += documentCount.prefix;

    if (documentCount.separator) documentNumber += documentCount.separator;

    if (documentCount.isLeftPadded) {
      if (documentCount.paddingCharacter) {
        documentNumber += addPadding(
          currentDocumentNumber,
          documentCount.length,
          documentCount.paddingCharacter
        );
      }
    } else {
      documentNumber += currentDocumentNumber;
    }

    if (documentCount.postfix) {
      if (documentCount.separator) documentNumber += documentCount.separator;
      documentNumber += documentCount.postfix;
    }

    return documentNumber;
  }

  async incrementDocumentNumber(where: DocumentCounterUniqueFindPayload) {
    console.log(this.moduleName);

    const documentCounter = await DocumentCounterModel.update({
      data: {
        availableNo: {
          increment: 1,
        },
      },
      where,
    });

    return documentCounter;
  }

  async deleteAll() {
    console.log(this.moduleName);

    return DocumentCounterModel.deleteMany();
  }
}

export default DocumentCounterService;
