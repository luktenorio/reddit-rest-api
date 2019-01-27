import * as express from "express";
import { getUserRepository } from "../repositories/user_repository";
import * as joi from "joi";
import { User } from "../entities/User"
import { Repository } from "typeorm";

export function getHandlers(userRepo: Repository<User>) {
    const getUserByIDHandler = (req: express.Request, res: express.Response) => {
        (async () => {
            const id = req.params.id;
            const user = await userRepo.findOne(id, { relations: ["links", "comments"] });
            if (user) {
                res.json(user);
            } else {
                res.status(404).send();
            }            
        })();
    };

    return {
        getUserByIDHandler: getUserByIDHandler
    }; 
}

export function getUserController() {
    const userRepository = getUserRepository();
    const handlers = getHandlers(userRepository);
    const router = express.Router();

    const userDetailsSchema = {
        email: joi.string().email(),
        password: joi.string()
    };

    // HTTP POST http://localhost:8080/api/v1/users/
    router.post("/", (req, res) => {
        (async () => {
            const newUser = req.body;
            const result = joi.validate(newUser, userDetailsSchema);
            if (result.error || await userRepository.findOne({ email: newUser.email })) {
                res.status(400).send();
            } else {
                await userRepository.save(newUser);
                res.json({ ok: "ok" }).send();
            }
        })();
    });

    // HTTP GET http://localhost:8080/api/v1/users/1
    router.get("/:id", handlers.getUserByIDHandler);

    return router;
}