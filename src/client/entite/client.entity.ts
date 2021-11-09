import { EntityBody } from "src/entities/produitClient.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategorieEntity } from "./categorie.entity";
import { ClientEnum } from "./client-role.enum";

@Entity('produit')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    idProd:number;
    @Column()
    produit:string;
    @Column()
    prix:number;

    @Column()
    password:string;

    @Column()
    salt:string;

    @Column(
        {
            type:'enum',
            enum:ClientEnum,
            default:ClientEnum.USER
        }
    )
    role:string

    @OneToMany(type=>EntityBody, (produitclient)=>produitclient.produit)
    facture: EntityBody;

    @ManyToOne(type=>CategorieEntity, (categorie)=>categorie.produit)
    categorie:CategorieEntity;
}
