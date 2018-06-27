import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";


@Injectable()
export class AuthService {
     
    /**Objeto JwtHelper pra extrair o email do token*/
    jwtHelper : JwtHelper=new JwtHelper();
    constructor(public http: HttpClient,public storage: StorageService) {
    }

    /**
     * Pra autenticar tem de enviar as credenciais creds pro Backend
     * no EndPoint: baseUrl: "http://localhost:8080/login"
     * e Retornar no Header o  'response', e o 'text'
     * : OBS: No front tem de colocar text pra evitar erro do JSON
     */
    authenticate(creds : CredenciaisDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    /**Pega o token e extrai o email  que veio a partir da palavra bearer se o login for bem sucedido*/
    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = { 
            token: tok,
            email:this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }  

        /**Método que faz o App aproveitar o usuário logado Usando o método post auth/refresh_token 
         do EndPoint AuthResource :OBS::Atualiza o Token a partir do atual***/
    refreshToken() {
        console.log("Atualizou o token"); 
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    
    
    /**Limpa o storage quando sair*/
    /**Aula 137: Limpa o carrinho**/
    logout() {
        this.storage.setLocalUser(null);
        this.storage.setCart(null);
    }
}