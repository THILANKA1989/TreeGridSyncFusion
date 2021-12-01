export interface GridFunction<T> {
  /**
   * Initialize the storage for the given entity name.
   *
   * This should take care of all setup and initialization efforts.
   */
  init(entityName: string, storagePath: string): Promise<void>;

  copyElement(entity: T): Promise<T>;

  cutElement(entity: T): Promise<T>;

  addToNext(entity: T, index: number, treeItems: T[]): Promise<T[]>;

  addToChild(entity: T, index: number, treeItems: T[]): Promise<T[]>;

  deleteRow(index: number, treeItems: T[]): Promise<T[]>;

  exists(index: number): Promise<boolean>;

  pasteChild(entity: T, index: number): Promise<T[]>;

  pasteNext(entity: T, index: number, treeItems: T[]): Promise<T[]>;

}
