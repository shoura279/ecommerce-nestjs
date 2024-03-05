import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 15 })
    name: string;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role: string;

    @Column({ type: 'bool', default: false })
    verified: boolean;
}
