import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Link } from "./Link";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    public id!: number;
    
    @Column()
    public positive!: boolean;

    @ManyToOne(type => Link, link => link.votes)
    link!: Link;

    @ManyToOne(type => User, user => user.votes)
    user!: User;
}