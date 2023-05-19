import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'varchar', nullable: true })
    user_id: string | undefined

    @Column({ type: 'double', nullable: true })
    amount: number | undefined

    @Column({ type: 'varchar', nullable: true })
    category: string | undefined 

    @Column({ type: 'varchar', nullable: true })
    status: string | undefined

    @Column({ type: 'int', nullable: true })
    user_bet_id: number | undefined

    @CreateDateColumn({ type: Date})
    created_at: Date | undefined;

    @UpdateDateColumn({ type: Date})
    updated_at: Date | undefined;

    /*  BUG_ERROR WITH FIELD DELETED
        @Column({ type: "char", default: 't' })
        deleted: string | undefined; 
    */

    @DeleteDateColumn({ type: Date})
    deleted_at: Date | undefined
}