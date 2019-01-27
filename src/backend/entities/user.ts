import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Link } from "./Link";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public email!: string;

    @Column()
    public password!: string;

    @OneToMany(type => Link, link => link.user)
    links!: Link[];

    @OneToMany(type => Vote, vote => vote.user)
    votes!: Vote[];

    @OneToMany(type => Comment, comment => comment.user)
    comments!: Comment[];
}