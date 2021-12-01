export interface GridFunction<T> {
  /**
   * Initialize the storage for the given entity name.
   *
   * This should take care of all setup and initialization efforts.
   */
  init(entityName: string, storagePath: string): Promise<void>;

  copyElement(entity: T): Promise<T[]>;

  cutElement(entity: T): Promise<T[]>;

  pasteElement(entity: T): Promise<T[]>;

  addToNext(entity: T): Promise<T[]>;

  addToChild(entity: T): Promise<T[]>;

  deleteRow(index: number): Promise<void>;

  exists(id: number): Promise<boolean>;

  pasteChild(entity: T): Promise<T[]>;

  pasteNext(entity: T): Promise<T[]>;

}
