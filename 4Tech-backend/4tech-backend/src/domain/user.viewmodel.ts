import { IsNotEmpty } from 'class-validator';

export class UserViewModel {
    constructor(userId: string, userLogin: string, userName: string, password: string) {
        this.userId = userId;
        this.userLogin = userLogin;
        this.userName = userName;
        this.password = password;
    }
 
    readonly userId: string;

    @IsNotEmpty()
    readonly userLogin: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    readonly password: string;
}