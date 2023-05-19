import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ unique: true  })
    id!: string

    @Column({ type: 'enum', enum: ['user', 'admin'] })
    role: string | undefined

    @Column({ type: 'varchar', nullable: true })
    firstName: string | undefined

    @Column({ type: 'varchar', nullable: true })
    lastName: string | undefined
    
    @Column({ type: 'varchar', nullable: true })
    phone: string | undefined

    @Column({ type: 'varchar', nullable: true })
    email: string | undefined

    @Column({ type: 'varchar', nullable: true })
    username: string | undefined

    @Column({ type: 'varchar', nullable: true })
    address: string | undefined

    @Column({ type: 'varchar', nullable: true })
    gender: string | undefined

    @Column({ type: 'varchar', nullable: true })
    birth_date: string | undefined

    @Column({ type: 'varchar', nullable: true })
    country_id: string | undefined

    @Column({ type: 'varchar', nullable: true })
    city: string | undefined
    
    @Column({ type: 'varchar', nullable: true })
    category: string | undefined
    
    @Column({ type: 'varchar', nullable: true })
    document_id: string | undefined
    
    @Column({ type: 'varchar', nullable: true })
    user_state: string | undefined

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