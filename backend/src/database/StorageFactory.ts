import { Storage } from './IStorage';
import { StorageImpl } from './Storage';

export class StorageFactory {
    private static storage: Storage<any>;

    static getStorage<T>(): Storage<T> {
        if (this.storage == null) {
            this.storage = new StorageImpl();
        }
        return this.storage;
    }
}