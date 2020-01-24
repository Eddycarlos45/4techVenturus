import {IsNotEmpty} from 'class-validator';

export class LoginViewModel {

    @IsNotEmpty()
    readonly userLogin: string;
    
    @IsNotEmpty()
    readonly password: string;
}