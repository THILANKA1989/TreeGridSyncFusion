// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseDataItem, DataItem } from "./data.interface";
import { DataItems } from "./dataitems.interface";
import dataJson from '../database/data.json';
/**
 * In-Memory Store
 */
let dataResults = {} = dataJson;
let dataItems: DataItems = dataResults.data;
/**
 * Service Methods
 */

export const findAll = async (): Promise<DataItem[]> => Object.values(dataItems);

export const find = async (id: number): Promise<DataItem> => dataItems[id];

export const create = async (newItem: BaseDataItem): Promise<DataItem> => {
    const id = new Date().valueOf();

    dataItems[id] = {
        id,
        ...newItem,
    };

    return dataItems[id];
};

export const update = async (
    id: number,
    itemUpdate: BaseDataItem
): Promise<DataItem | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    dataItems[id] = { id, ...itemUpdate };

    return dataItems[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete dataItems[id];
};