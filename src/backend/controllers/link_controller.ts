import * as express from "express";
import { getLinkRepository } from "../repositories/link_repository";
import * as joi from "joi";
import { Link } from "../entities/Link"
import { Repository } from "typeorm";
import { authMiddleware } from "../middleware/auth_middeware";
import { getVoteRepository } from "../repositories/vote_repository";
import { Vote } from "../entities/Vote";
import { User } from "../entities/User";

export function getHandlers(linkRepo: Repository<Link>, voteRepo: Repository<Vote>) {
    const getLinkByIDHandler = (req: express.Request, res: express.Response) => {
        (async () => {
            const id = req.params.id;
            const link = await linkRepo.findOne(id, { relations: ["comments"] });
            if (link) {
                res.json(link);
            } else {
                res.status(404).send();
            }            
        })();
    };

    const getAllLinksHandler = (req: express.Request, res: express.Response) => {
        (async () => { res.json(await linkRepo.find()); })();
    };

    const postVote = (req: express.Request, res: express.Response, positive: boolean) => {
        (async () => {
            const id = req.params.id;
            const userId = (req as any).userId;
            const link = await linkRepo.findOne(id);
            if (!link) {
                res.status(404).send();
                return;
            }

            var vote = new Vote();
            vote.positive = positive;
            vote.user = new User();
            vote.user.id = userId;
            vote.link = new Link();
            vote.link.id = link.id;

            if (await voteRepo.findOne({ link: vote.link, user: vote.user })) {
                res.status(404).send({ msg: "You have already voted on this link!" });
                return;
            }
            
            await voteRepo.save(vote);
            res.json({ ok: "ok" });             
        })();
    };

    return {
        getLinkByIDHandler: getLinkByIDHandler,
        getAllLinksHandler: getAllLinksHandler,
        postVote: postVote
    }; 
}

export function getLinkController() {
    const linkRepository = getLinkRepository();
    const voteRepository = getVoteRepository();
    const handlers = getHandlers(linkRepository, voteRepository);
    const router = express.Router();

    const linkDetailsSchema = {
        url: joi.string().uri(),
        title: joi.string(),
        user: {
            id: joi.number().greater(0)
        }
    };

    // HTTP POST http://localhost:8080/api/v1/links/
    router.post("/", authMiddleware, (req, res) => {
        (async () => {
            const newLink = req.body;
            const result = joi.validate(req.body, linkDetailsSchema);
            if (result.error) {
                res.status(400).send({ msg: "Link is not valid!" });
            } else {
                const link = await linkRepository.save(newLink);
                res.json(link);
            }
        })();
    });

    // HTTP DELETE http://localhost:8080/api/v1/links/1
    router.delete("/:id", authMiddleware, (req, res) => {
        (async () => {
            const id = req.params.id;
            const userId = (req as any).userId;
            let user = new User();
            user.id = userId;
            if (await linkRepository.findOne({id: id, user: user })) {
                const link = await linkRepository.delete(id);
                res.json(link);
            } else {
                res.status(400).send({ msg: "You are not the owner of the link!" });
            }
        })();
    });

    // HTTP post http://localhost:8080/api/v1/links/1/upvote
    router.post("/:id/upvote", authMiddleware, (req, res) => {
        handlers.postVote(req, res, true);
    });

    // HTTP post http://localhost:8080/api/v1/links/1/downvote
    router.post("/:id/downvote", authMiddleware, (req, res) => {
        handlers.postVote(req, res, false);
    });

    // HTTP GET http://localhost:8080/api/v1/links/1
    router.get("/:id", handlers.getLinkByIDHandler);

    // HTTP GET http://localhost:8080/api/v1/links/
    router.get("/", handlers.getAllLinksHandler);

    return router;
}