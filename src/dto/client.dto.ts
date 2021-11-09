import { Type } from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";
import {IsString } from "class-validator";

export class ClientDTO{
   @IsNumber()
   @IsOptional()
    produitID:number;

    @Type(()=>Number)
    @IsNumber()
    clientID:number;

    @IsIn(["solde","dette"])
    @IsOptional()
    status:string
   
}



export class ProduitDTO{
    @IsNumber()
    idProd:number;
    @IsString()
    produit:string;
    @IsNumber()
    prix:number;
}