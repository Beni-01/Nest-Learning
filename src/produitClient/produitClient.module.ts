import {Global, MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "src/client/entite/client.entity";
import { EntityBody } from "src/entities/produitClient.entity";
import { Logger, LoggerMiddleware } from "src/middlewares/logger.middleware";
import { SecondMiddleware } from "src/middlewares/second.middleware";
import {ProduitClientController} from "./produitClient.controller";
import {ProduitClientService} from './produitClient.service'

@Global()
@Module({
    imports:[TypeOrmModule.forFeature([ClientEntity])],
    controllers:[ProduitClientController],
    providers:[ProduitClientService],
    exports:[]
})
export class ProduitClientModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(SecondMiddleware,LoggerMiddleware).forRoutes(
      {
        path:'produitClient', 
        method:RequestMethod.GET
      },
      {
        path:'produitClient',
        method:RequestMethod.POST
      })
    }
}
