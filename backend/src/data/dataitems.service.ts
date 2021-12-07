// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseDataItem, BaseItemArray, DataItem } from "./data.interface";
import { DataItems } from "./dataitems.interface";
import dataJson from '../database/data.json';
import { debug } from "console";
const fs = require('fs');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();
/**
 * In-Memory Store
 */
const dataItems: BaseItemArray = dataJson as unknown as BaseItemArray;
/**
 * Service Methods
 */

export const findParent = async (): Promise<BaseItemArray> => dataItems;
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
    debug();
    let json = {};
    if (container.data == null || container.data == undefined) {
        return null;
    }
    if (dataItems.data == null || dataItems.data == undefined) {
        json = JSON.stringify({ "data": [], "lastIndex": 0 }, null, 2);
    } else {
        dataItems.data.map(obj => container.data.find(o => o.id === obj.id) || obj);
    }
    
    (async () => {
        await new Promise((resolve, reject) => {
          fs.writeFileSync(
            `src/database/data.json`, 
            JSON.stringify(dataItems,null,2),
            function(err: any) {
              if (err) {
                reject()
                return console.log(err)
              }
              resolve(err)
            }
          )
        });
      })();
      
    if (!container) {
        return null;
    }
};

export const getMaxRowNumber = async (): Promise<number> => {
    console.log(dataItems.lastIndex);
    return dataItems.lastIndex;
};

export const setMaxRowNumber = async (currentIndex: number): Promise<number> => {
    dataItems.lastIndex = currentIndex;
    return currentIndex;
};

export const paginatedData = async (pageSize: any, pageNumber: any): Promise<ResponseBody> => {
    console.log(pageSize);
    console.log(pageNumber);
    const baseItems = {
        "data": dataItems.data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        "lastIndex": dataItems.lastIndex
    } as BaseItemArray;

    const response = {
        "content": baseItems,
        "nextPage": pageNumber == (dataItems.data.length / pageSize) ? null : pageNumber + 1,
        "prevPage": pageNumber == 1 ? null : pageNumber - 1,
        "statusCode": 200,
        "pageCount": Math.ceil(dataItems.data.length / pageSize),
        "totalRowCount": dataItems.data.length
    } as ResponseBody

    return response;
}