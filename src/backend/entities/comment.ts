import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Link } from "./Link";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public content!: string;

    @ManyToOne(type => Link, link => link.comments)
    link!: Link;

    @ManyToOne(type => User, user => user.comments)
    user!: User;
}