class ResponseBody {
  content: any;
  nextPage: number;
  prevPage: number;
  statusCode?: number;
  totalRowCount: number;

  constructor() {
    this.content = {};
    this.nextPage = 2;
    this.prevPage = 0;
    this.statusCode = null;
    this.totalRowCount = 0;
  }
}
