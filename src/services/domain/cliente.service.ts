import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ClienteService {

    /**Usa o HttpClient para fazer o get no EndPoint
     * E o StorageService pra armazenar o token do cliente
     *  **/
    constructor(public http: HttpClient) {
    }



     /**Faz uma requisição no BackEnd pra buscar o cliente pelo email passado**/
    findByEmail(email: string) : Observable<ClienteDTO> {

             /**Pega o token e lança no Header**/
       // let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        
        /**Retorna o Cliente pelo seu email que foi passado inserindo o token **/
        return this.http.get<ClienteDTO>( `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);     
    }
    
    /**Pega a imagem do cliente
     * Exemplo: url/cp1.jpg 
     * Obs: a Observable<any> aceita qualquer coisa
     * **/
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.png`
       /**Dá um get passando a url e fala que a resposta será uma imagem**/
        return this.http.get(url, {responseType : 'blob'});
    }
        
}