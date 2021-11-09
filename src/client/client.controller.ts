import { Controller,Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './entite/client.entity';


@Controller('client')
export class ClientController {
    constructor(private clientService:ClientService){}

    @Get()
    async gets():Promise<ClientEntity[]>{
        return await this.clientService.gets()
    }
 
}
