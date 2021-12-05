class ResponseBody {
    content: any;
    nextPage?: number;
    prevPage?: number;
    statusCode?: number;
    totalRowCount: number;
    pageCount: number;

    constructor() {
        this.content = {};
        this.nextPage = 2;
        this.totalRowCount = 0;
        this.pageCount = 0;
    }
}