export class Store {
    constructor(fields: any) {
      for (const f in fields) {
        this[f] = fields[f];
      }
    }
  }
  
  export interface Store {
    storeName: string,
    storeLocation: string
  }