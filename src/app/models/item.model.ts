export class Item {
    key!: string;
    name!: string;
    url!: string;
    title!: string;
    description!: string;
    price!:number;
    quantity : number = 1;
    sizes! : string[];
    selectedSize! : string;
    file: File;
    constructor(file: File) {
      this.file = file;
    }
  }