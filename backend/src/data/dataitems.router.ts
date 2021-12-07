
import express, { Request, Response } from "express";
import * as ItemService from "./dataitems.service";
import { BaseDataItem, BaseItemArray, DataItem } from "./data.interface";
import { debug } from "console";
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

let app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
export const itemsRouter = express.Router();
/**
 * Controller Definitions
 */
// GET parernt
itemsRouter.get("/parent", async (req: Request, res: Response) => {
    try {
        const item: BaseItemArray = await ItemService.findParent();
        res.status(200).send(item);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

itemsRouter.get("/paginatedAll/:pageSize/:pageNumber", async (req: Request, res: Response) => {
    try {
        console.log(req.params.pageSize);
        console.log(req.params.pageNumber);

        const item: ResponseBody = await ItemService.paginatedData(parseInt(req.params.pageSize), parseInt(req.params.pageNumber));
        res.status(200).send(item);
    } catch (e) {

    }
});
// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: DataItem[] = await ItemService.findAll();

        res.status(200).send(items);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const item: DataItem = await ItemService.find(id);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send("item not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseDataItem = req.body;
       

        const newItem = await ItemService.create(item);

        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const itemUpdate: DataItem = req.body;

        const existingItem: DataItem = await ItemService.find(id);

        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }

        const newItem = await ItemService.create(itemUpdate);

        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        await ItemService.remove(id);

        res.sendStatus(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

itemsRouter.post("/updatejson", async (req: Request, res: Response) => {
    debug();
    let Guid: string = "";
    try {
        //lock.acquire(Guid, function () {
            // async work
            ItemService.updateJson(req.body);
            res.sendStatus(204);
        //}, function () {
            // lock released
        //});
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

itemsRouter.post("/setMax/", async (req: Request, res: Response) => {
    try {
        //ItemService.setMaxRowNumber(req.body,parseInt(req.params.id);
        res.sendStatus(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

itemsRouter.get("/getMax", async (req: Request, res: Response) => {
    try {
        let number = ItemService.getMaxRowNumber();

        res.status(200).send(number);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
