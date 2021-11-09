import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entite/client.entity';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(ClientEntity) private clientService:Repository<ClientEntity>){}

    async gets():Promise<ClientEntity[]>{
        return await this.clientService.find()
    }
}
