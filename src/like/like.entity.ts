import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    userId: number;
}