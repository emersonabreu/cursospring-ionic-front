import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
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
}