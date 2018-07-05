export class Category {
  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }
}

export interface Category {
  categoryName: string,
  description: string
}