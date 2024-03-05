import { Injectable } from '@nestjs/common';

@Injectable()
export class DBMethod {
  constructor() {}
  // create document
  async createDocument(model: any, data: any) {
    const document = await model.create(data);
    return document;
  }

  // get all document
  async getAll(model: any, data: object) {
    // data can be empty object to get all and can pass condition like api feature
    const document = await model.find(data);
    return document;
  }

  // get by id
  async findById(model: any, id: any) {
    const document = await model.findById(id);
    return document;
  }

  // delete document
  async deleteDocument(model: any, id: any) {
    const document = await model.findByIdAndDelete(id);
    return document;
  }

  // update order
  async updateDocumet(model: any, data: object, id: any) {
    const document = await model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return document;
  }
}
