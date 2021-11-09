import { Module, ParseArrayPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { ProduitClientModule } from './ProduitClient/ProduitClient.module';
import { YupModule } from './yup/yup.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ClientModule,ProduitClientModule, YupModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:parseInt(process.env.DB_PORT),
      username:'root',
     // password:process.env.DB_PASSWORD,
      database:'store',
      entities:['dist/**/*/*.entity{.ts,.js}'],
     synchronize:true,
  }),
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
