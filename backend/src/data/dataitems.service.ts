// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseDataItem, BaseItemArray, DataItem } from "./data.interface";
import { DataItems } from "./dataitems.interface";
import dataJson from '../database/data.json';
const fs = require('fs');
/**
 * In-Memory Store
 */
let dataItems: BaseItemArray = dataJson as unknown as BaseItemArray;
/**
 * Service Methods
 */

export const findAll = async (): Promise<DataItem[]> => Object.values(dataItems.data);

export const find = async (id: number): Promise<DataItem> => dataItems.data[id];

export const create = async (newItem: BaseDataItem): Promise<DataItem> => {
    const id = new Date().valueOf();

    dataItems.data[id] = {
        id,
        ...newItem,
    };

    return dataItems.data[id];
};

export const update = async (
    id: number,
    itemUpdate: BaseDataItem
): Promise<DataItem | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    dataItems.data[id] = { id, ...itemUpdate };

    return dataItems.data[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete dataItems.data[id];
};

export const updateJson = async (container: BaseItemArray): Promise<null | void> => {
    const json = JSON.stringify(container, null, 2);
    fs
    fs.writeFile('../database/data.json', json, (err: any) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('File saved!');
    });
    if (!container) {
        return null;
    }
};