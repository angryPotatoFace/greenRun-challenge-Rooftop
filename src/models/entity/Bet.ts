import { boolean } from "joi"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class Bet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'int', nullable: true })
    bet_option: number | undefined

    @Column({ type: 'varchar', nullable: true })
    sport: string | undefined

    @Column({ type:'enum', enum: ['active','cancelled','settled'] })
    status: string | undefined 
    
    @Column({ type: 'varchar', nullable: true })
    name: string | undefined
        
    @Column({ type: 'int', nullable: true })
    event_id: number | undefined

    @Column({ type: 'double', nullable: true })
    odd: number | undefined

    @Column({ type: 'enum', enum: ['won','lost','open'] })
    result: string | undefined

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