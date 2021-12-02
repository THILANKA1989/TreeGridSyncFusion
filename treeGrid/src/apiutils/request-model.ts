class RequestBody<T> {
  pageNumber: number;
  pageSize: number;
  sorting: sorting[];
  //filters: filters<T>[]; //no filters needed

  constructor() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.sorting = [];
    //this.filters = null;
  }
}

class sorting {
  sortOrder: sortOrder;
  sortColumn: string;
}

enum sortOrder {
  ASC = 1,
  DESC = 2
}

class filters<T> {
  filter: T;
  column: string;

  constructor(column:string, filter:T) {
    this.filter = filter;
    this.column = column;
  }
}

