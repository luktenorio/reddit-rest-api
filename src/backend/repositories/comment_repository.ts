import { getConnection } from "typeorm";
import { Comment } from "../entities/Comment";

export function getCommentRepository() {
    const connection = getConnection();
    const commentRepository = connection.getRepository(Comment);
    return commentRepository;
}