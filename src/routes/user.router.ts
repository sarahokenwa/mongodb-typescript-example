// External Dependencies
import { Request, Response } from "express";
import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import user from "../models/user";
import Users from "../models/user";

// Global Config
export const userRouter = express.Router();

userRouter.use(express.json());

// GET
userRouter.get("/", async (_req: Request, res: Response) => {
    try {
       //const user = (await collections.user.find({}).toArray()) as Users[];
       const user = (await collections.user.find({}).toArray()) as unknown as Users[];

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);

        userRouter.get("/:id", async (req: Request, res: Response) => {
            const id = req?.params?.id;
        
            try {
                
                const query = { _id: new ObjectId(id) };
                //const game = (await collections.user.findOne(query)) as Users;
                const user = (await collections.user.findOne(query)) as unknown as Users[];
        
                if (user) {
                    res.status(200).send(user);
                }
            } catch (error) {
                res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
            }
        });
    }
});
// POST
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUsers = req.body as Users;
        const result = await collections.user.insertOne(newUsers);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
userRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUsers: Users = req.body as Users;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.user.updateOne(query, { $set: updatedUsers });

        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`Users with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.user.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Users with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});