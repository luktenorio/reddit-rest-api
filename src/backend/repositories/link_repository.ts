import { getConnection } from "typeorm";
import { Link } from "../entities/Link";

export function getLinkRepository() {
    const connection = getConnection();
    const linkRepository = connection.getRepository(Link);
    return linkRepository;
}