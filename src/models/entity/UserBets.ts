import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class UserBets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: string;

    @Column()
    bet_id!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    odd!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: 'enum', enum: ['open', 'won', 'lost'] })
    state!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
    
    /*  BUG_ERROR WITH FIELD DELETED
        @Column({ type: "char", default: 't' })
        deleted: string | undefined; 
    */
    @DeleteDateColumn()
    deleted_at!: Date;
}
