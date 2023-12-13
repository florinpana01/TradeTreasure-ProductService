import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    user_id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({default: 0})
    likes: number;
}