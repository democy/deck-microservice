import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from "typeorm";
import { Deck } from "./deck.entity";
import { Cards } from "./cards.entity";

@Entity({name:'deck_to_cards'})
export class DeckToCards extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // id
  // deckid
  // cardid
  // deckposition
  // seen

// add column explicitly here


@Column()
seen!: boolean;

@Column()
deckposition!: number;

@ManyToOne(_type => Deck, deck => deck.id, {
  cascade: true
})
@JoinTable()
public deck!: Deck[];

@Column()
public deckId!: number;

@ManyToOne(_type => Cards, card => card.id, {
  cascade: true
})
@JoinTable()
public card!: Cards[];

@Column()
public cardId!: number;


@Column({ name: "created_at", default:() => "CURRENT_TIMESTAMP" })
createdAt!: Date;
  
}