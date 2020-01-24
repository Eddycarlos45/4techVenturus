import { Injectable } from "@nestjs/common";
import{Strategy, ExtractJwt} from 'passport-jwt';
import{PassportStrategy} from '@nestjs/passport';

//NUNCA DEVE SER EXPOSTA PUBLICAMENTE
//
//A chave secreta so esta amostra afim de deixar claro o que o codigo esta fazendo.
//em um ambiente de produção, a chave deve estar protegida
//por medidas apropriadas(como por exemplor secret vaults, variaveis de ambiente ou servicos de configuracao)
export const secretKey = ' wingardium leviosoa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
            ignoreExpiration: false, //tempo de validade do token
            secretOrKey: secretKey,
        })
    }
    async validate(payLoad:any){
        return{userLogin:payLoad.userLogin};
    } 
}