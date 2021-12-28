import { Entity, BaseEntity, PrimaryGeneratedColumn, Column,Unique } from "typeorm";

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

// "value": "ACE",

// "suit": "SPADES",

// "code": "AS",

// cardId: "uuid"
@Entity({name:'cards'})
@Unique('my_unique_constraint', ['code']) 
export class Cards extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  value!: string;

  @Column()
  suit!: string;
  

  @Column({unique: true})
  code!: string;

  @Column({ name: "created_at", default:() => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
}