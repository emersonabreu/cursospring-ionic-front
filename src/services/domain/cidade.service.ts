import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

/** Aula 129: Classe que busca todas as cidades de um determinado estado no Enpoint**/
@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }
    /** Aula 129: Dá um Get no EndPoint, passando o id do estado**/
    findAll(estado_id : string) : Observable<CidadeDTO[]>  {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}