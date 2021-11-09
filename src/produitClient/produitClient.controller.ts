import {Controller,Get,Post,Delete,Body,Param, Query, NotFoundException, Put,ParseIntPipe, HttpStatus, ValidationPipe, UseInterceptors, Patch} from '@nestjs/common'
import {EntityBody} from '../entities/produitClient.entity'
import{ClientDTO} from '../dto/client.dto'
import{ProduitDTO} from './dto/produit.dto'
import{QueryDTO} from '../dto/query.dto'
import {ProduitClientService} from './produitClient.service'
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe'
import { FirstInterceptor } from 'src/intercepteurs/first.interceptor'
import { ConfigService } from '@nestjs/config'
import { ClientEntity } from 'src/client/entite/client.entity'


interface Gets{
    idProduit:number;
    idClient:number;
}

@UseInterceptors(FirstInterceptor)
@Controller('produitClient')
export class ProduitClientController{

    constructor(private readonly produitClientService:ProduitClientService,private readonly configService:ConfigService){
    }

   

    @Get(':id')
    async getElement(@Param('id', ParseIntPipe) id:number) :Promise<ClientEntity>{
        return await this.produitClientService.getElements(id);
    }

    @Post("addProduit")
    async addProduit(@Body() newProduit:Partial<ClientEntity>,):Promise<any>{
        await this.produitClientService.addProduits(newProduit);
        return {message:"enregistrer avec succes"};
    }
    @Patch(':id')
    async updatePrixById(@Body('prix', ParseIntPipe) prix:number, @Param('id', ParseIntPipe) idProd:number):Promise<any>{
      return  this.produitClientService.updatePrixById(idProd,prix);
    }

    @Patch()
    async updateByCriteria(@Body() criteriaObjet){
        return this.produitClientService.updateByCriteria(criteriaObjet);
    }

    @Delete(':id')
    async deleteProduitById(@Param('id', ParseIntPipe) id:number):Promise<any>{
        return this.produitClientService.deleteProduit(id);
    }

    @Delete('/remove/:id')
    async removeProduit(@Param('id', ParseIntPipe) id:number):Promise<any>{
        return this.produitClientService.removeProduit(id);
    }

    @Delete('/softdelete/:id')
    async softdelete(@Param('id',ParseIntPipe) id:number):Promise<any>{
        return this.produitClientService.softDelete(id);
    }

    @Delete('/softremove/:id')
    async softremove(@Param('id',ParseIntPipe) id:number):Promise<any>{
        return this.produitClientService.softRemove(id);
    }

    @Get('/restore/:id')
    async restoreProduit(@Param('id', ParseIntPipe) id:number):Promise<any>{
        return this.produitClientService.removeProduit(id)
    }

    @Get("/count/produit")
    async count():Promise<ClientEntity[]>{
        return await this.produitClientService.countProduit();
    }

  


    @Get()
    getProduitClient():Gets{
        // console.log(this.configService.get('APP_PORT'))
        return this.produitClientService.getProduitClient()
    }
  

    @Get('lists')
    getProduitlits():EntityBody[]{
        return this.produitClientService.getProduitlists()
    }

    @Get('query')
    getQuery(@Query('clientID') query:QueryDTO){
        
        return this.produitClientService.getQuery(query)
    }

    // @Get('/:id')
    // getByID(@Param('id') ID:Partial<EntityBody>){
    //     return this.produitClientService.getByID(ID);
    // }
    
    @Post()
    postProduit(@Body() body:ClientDTO){
        return this.produitClientService.postProduit(body);
    }

    @Post("lists")
    postProduits(@Body() body:ClientDTO){
        return this.produitClientService.postProduits(body);
    }

    @Post("pipe")
    pipe(@Body(new UpperAndFusionPipe()) data){
        return data;
    }

    @Post("pipe/:id")
    pipe2(@Body(new UpperAndFusionPipe()) data, @Param('id', ParseIntPipe) id:number){
        return {data,id};
    }

    @Delete('/:id')
    deleteProduit(@Param('id', new ParseIntPipe({
        errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE
    })) id,){
        
        return typeof id;
    }

    @Put()
    updateProduit(){
        return 'update with success'
    }
}

