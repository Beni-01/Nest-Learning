import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "./client.entity";

@Entity('categorie')
export class CategorieEntity{

@PrimaryGeneratedColumn()
idCat:number;

@Column({
    update:false,
    length:50,
    nullable:false
})
categorie:string;

@OneToMany(type=>ClientEntity,(produit)=>produit.categorie)
produit:ClientEntity[]
}