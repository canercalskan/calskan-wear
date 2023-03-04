export class Item {
    key!: string;
    slug! : string;
    name!: string;
    url!: string[];
    title!: string;
    description!: string;
    price!:number;
    quantity : number = 1;
    sizes! : string[];
    selectedSize! : string;
    file: FileList;
    category! : string
    constructor(files: FileList) {
      this.url = []
      this.file = files;
    }
  }