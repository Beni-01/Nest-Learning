import {Get,Post,Delete,Body,Param, Query, NotFoundException, Put,Injectable, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entite/client.entity';
import { Repository } from 'typeorm';
import{ProduitDTO} from './dto/produit.dto'
import * as bcrypt from 'bcrypt'


@Injectable()
export class ProduitClientService{
    
    constructor(@InjectRepository(ClientEntity) private produitEntity:Repository<ClientEntity>){}

    produitID:number;
    clientID:number;
    list=[];


    async subscribe(produit:Partial<ClientEntity>):Promise<ClientEntity>{
        const newProduit= await this.produitEntity.create({
            ...produit
        })
        newProduit.salt= await bcrypt.genSalt();
        newProduit.password=await bcrypt.hash(newProduit.password,newProduit.salt);

        try{
            await this.produitEntity.save(newProduit);
        }
        catch(e){
            throw new ConflictException('duplicate user');
        }
        return newProduit;
    }

    async getElements(id:number):Promise<ClientEntity>{
        return this.produitEntity.findOne(id)
    }

    async addProduits(body:Partial<ClientEntity>):Promise<any>{
        return await this.produitEntity.save(body)
    }
         
    async updatePrixById(idProd:number,prix:number){
        const getElementById= await this.produitEntity.preload({
            idProd,
            prix
        })
        if(!getElementById){
            throw new NotFoundException(`l'id ${idProd} n'existe pas`);
        }
        await this.produitEntity.save(getElementById);
        return {message:`${idProd} a été modifié avec succès`}
    }

    async updateByCriteria(criteriaBody):Promise<any>{
        const {updateCriteria,updateBody}=criteriaBody;
        await this.produitEntity.update(updateCriteria,updateBody);

        return {message:'votre modification a été fait avec succès'}
    }

    async deleteProduit(id:number):Promise<any>{
        await this.produitEntity.delete(id);
        return {message:"suppression reussi"}
    }

    async removeProduit(id:number):Promise<any>{
        const produitItem= await this.produitEntity.findOne(id);
        if(!produitItem){
            throw new NotFoundException(`${id} n'existe pas`)
        }
        await this.produitEntity.remove(produitItem);
        return {message:"suppression reussi avec remove"}
    }

    async softRemove(id:number):Promise<any>{
        const item= await this.produitEntity.findOne(id);
        if(!item){
            throw new NotFoundException();
        }
       await this.produitEntity.softRemove(item)
       return {message:"softRemove a reussi"}
    }

    async softDelete(id:number):Promise<any>{
        this.produitEntity.softDelete(id);
        return {message:"softDelete a reussi"}
    }

    async restore(id:number):Promise<any>{
        await this.produitEntity.restore(id);
        return {message:'element restauré avec succes'}
    }

    async countProduit(min=1):Promise<ClientEntity[]>{
        const queryBuilder= await this.produitEntity.createQueryBuilder("produit");
        const count=await queryBuilder.select("COUNT(produit.idProd) nbreProd, produit.produit").groupBy("produit.produit").having("COUNT(produit.idProd) <> :min").setParameters({min});
    
        console.log(count.getSql());

        return count.getRawMany();
    }
    








    getQuery(@Query('clientID') query){
        return typeof query
    }
getProduitClient(){
    return {idProduit:this.produitID,idClient:this.clientID}
}

getProduitlists(){
    return this.list;
}

getByID(@Param('id') ID){
    const IDString=ID.toString()
    if(Object.keys(this.list).includes(IDString))
      return this.list[IDString];
    throw new NotFoundException(`${ID} is not found`);
}

postProduit(@Body() body){
    this.clientID=body.clientID;
    this.produitID=body.produitID;
    return {"message":"votre enregistrement à reussi"}
}

postProduits(@Body() body){
    const ID=this.list.length;
    this.list.push({ID,...body});
    return {"message":"votre enregistrement de votre element sur la liste"}
}

}