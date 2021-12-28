import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'deck'})
export class Deck extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  type!: string;

  @Column()
  shuffled!: boolean;

  // @Column()
  // remaining!: number;
  
  @Column({ name: "created_at", default:() => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
}