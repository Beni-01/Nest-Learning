import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecondMiddleware } from 'src/middlewares/second.middleware';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientEntity } from './entite/client.entity';

@Module({
    imports:[TypeOrmModule.forFeature([ClientEntity])],
    controllers:[ClientController],
    providers:[ClientService]
})
export class ClientModule implements NestModule{
    configure(consumer:MiddlewareConsumer){
        consumer.apply(SecondMiddleware).forRoutes('');
    }
}
