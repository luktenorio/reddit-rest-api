import * as express from "express";
import { getCommentRepository } from "../repositories/comment_repository";
import * as joi from "joi";
import { authMiddleware } from "../middleware/auth_middeware";
import { User } from "../entities/user";


export function getCommentController() {
    const commentRepository = getCommentRepository();
    const router = express.Router();

    const commentDetailsSchema = {
        content: joi.string(),
        user: {
            id: joi.number().greater(0)
        },
        link: {
            id: joi.number().greater(0)
        }
    };

    const commentPutSchema = {
        content: joi.string()
    };

    // HTTP POST http://localhost:8080/comments/
    router.post("/", authMiddleware, (req, res) => {
        (async () => {
            const newComment = req.body;
            const result = joi.validate(req.body, commentDetailsSchema);
            if (result.error) {
                res.status(400).send({ msg: "Comment is not valid!" });
            } else {
                const comment = await commentRepository.save(newComment);
                res.json(comment);
            }
        })();
    });

    // HTTP PUT http://localhost:8080/comments/
    router.put("/:id", authMiddleware, (req, res) => {
        (async () => {
            const id = req.params.id;
            const newComment = req.body;
            const userId = (req as any).userId;

            const result = joi.validate(req.body, commentPutSchema);

            if (result.error) {
                res.status(400).send();
                return;
            }

            let comment = await commentRepository.findOne(id, { relations: ["user"] });
            if (!comment) {
                res.status(404).send({ msg: "Comment not found!" });
            } else if (comment.user.id === userId) {
                comment.content = newComment.content;
                await commentRepository.save(comment);
                res.json({ ok: "ok" });
            } else {
                res.status(400).send({ msg: "You are not the owner of the comment!" });
            }
        })();
    });
    

    // HTTP DELETE http://localhost:8080/comments/1
    router.delete("/:id", authMiddleware, (req, res) => {
        (async () => {
            const id = req.params.id;
            const userId = (req as any).userId;
            const comment = await commentRepository.findOne(id, { relations: ["user"] });
            if (!comment) {
                res.status(404).send({ msg: "Comment not found!" });
            } else if (comment.user.id === userId) {
                await commentRepository.delete(id);
                res.json({ ok: "ok" });
            } else {
                res.status(400).send({ msg: "You are not the owner of the comment!" });
            }
        })();
    });

    return router;
}