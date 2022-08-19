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
    category! : string
    constructor(file: File) {
      this.file = file;
    }
  }