import { IsNumber, IsString } from "class-validator";

export class ProduitDTO{
    @IsNumber()
    idProd:number;
    @IsString()
    produit:string;
    @IsNumber()
    prix:number;
}