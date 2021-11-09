import { Type } from "class-transformer";
import {IsNumber, min} from "class-validator";

export class QueryDTO{
    
    @Type(()=>Number)
    //@IsNumber()
    clientID:Number;
}