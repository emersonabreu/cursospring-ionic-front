import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";

 /**Aula 147: Service para os pedidos**/
@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {
    }
    
     /**Aula 147: Insere o pedido no banco**/
    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos/salvar`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}