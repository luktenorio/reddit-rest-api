import { getConnection } from "typeorm";
import { User } from "../entities/User";

export function getUserRepository() {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    return userRepository;
}