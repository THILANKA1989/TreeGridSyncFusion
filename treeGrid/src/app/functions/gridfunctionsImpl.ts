import { GridFunction } from "./gridfunctions";

export class GridFunctionImpl<T extends { id: number }> implements GridFunction<T> {
  init(entityName: string, storagePath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async copyElement(entity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async cutElement(entity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async addToNext(entity: T, index: number, treeItems: T[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async addToChild(entity: T, index: number, treeItems: T[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async deleteRow(index: number, treeItems: T[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async exists(index: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async pasteChild(entity: T, index: number): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  async pasteNext(entity: T, index: number, treeItems: T[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }


}
