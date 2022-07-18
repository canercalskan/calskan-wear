export class Item {
    key!: string;
    name!: string;
    url!: string;
    title!: string;
    description!: string;
    price!:string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }