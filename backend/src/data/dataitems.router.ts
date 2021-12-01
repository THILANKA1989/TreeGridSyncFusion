
import express, { Request, Response } from "express";
import * as ItemService from "./dataitems.service";
import { BaseDataItem, DataItem } from "./data.interface";

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: DataItem[] = await ItemService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const item: DataItem = await ItemService.find(id);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send("item not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseDataItem = req.body;

        const newItem = await ItemService.create(item);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const itemUpdate: DataItem = req.body;

        const existingItem: DataItem = await ItemService.find(id);

        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }

        const newItem = await ItemService.create(itemUpdate);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await ItemService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});