import {IsNotEmpty} from 'class-validator';

export class UserViewModel {
constructor(userLogin: string, userName: string, password: string){
    this.userLogin = userLogin;
    this.userName = userName;
    this.password = password;
}

    @IsNotEmpty()
    readonly userLogin: string;
    
    @IsNotEmpty()
    userName: string;
    
    @IsNotEmpty()
    readonly password: string;
}