import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    /**Usa o HttpClient para fazer o get no EndPoint
     * E o StorageService pra armazenar o token do cliente
     *  **/
    constructor(public http: HttpClient,  public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }



     /**Faz uma requisição no BackEnd pra buscar o cliente pelo email passado**/
    /**Aula 143: Corrigindo a tipagem pra buscar todos os dados do cliente**/
    findByEmail(email: string) : Observable<ClienteDTO> {

             /**Pega o token e lança no Header**/
       let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        
        /**Retorna o Cliente pelo seu email que foi passado inserindo o token **/
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeader});  
    }

    /**Aula 146: busca o cliente pelo seu id**/
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    
    /**Pega a imagem do cliente
     * Exemplo: url/cp1.jpg 
     * Obs: a Observable<any> aceita qualquer coisa
     * **/
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
       /**Dá um get passando a url e fala que a resposta será uma imagem**/
        return this.http.get(url, {responseType : 'blob'});
    }

           /**Aula 131: Salvando um novo Cliente com ClienteDTO**/
    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    /**Aula 153: Pega a Imagem na base64 converte pra blob e coloca no formdata e salva**/
    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.jpg');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

        
}