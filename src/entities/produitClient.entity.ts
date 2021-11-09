import { ClientEntity } from "src/client/entite/client.entity";
import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import { GlobalInfo } from "./globalInfo";

@Entity('produitclient')
export class EntityBody extends GlobalInfo{
    @PrimaryGeneratedColumn()
    ID:number;
    @Column()
    produitID:number;
    @Column()
    clientID:number;

    @ManyToOne(type=>ClientEntity, (produit)=>produit.facture)
    produit: ClientEntity[];

}


