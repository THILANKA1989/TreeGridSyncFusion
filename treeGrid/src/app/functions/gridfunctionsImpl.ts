import { GridFunction } from "./gridfunctions";

export class GridFunctionImpl<T extends { id: number }> implements GridFunction<T> {
    init(entityName: string, storagePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    copyElement(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    cutElement(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    addToNext(entity: T, index: number, treeItems: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    addToChild(entity: T, index: number, treeItems: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    deleteRow(index: number, treeItems: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    exists(index: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    pasteChild(entity: T, index: number): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    pasteNext(entity: T, index: number, treeItems: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }


}
