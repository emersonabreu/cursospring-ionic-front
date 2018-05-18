import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";

/** Aula 129: Classe que busca todos estados no Enpoint**/
@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

    /** Aula 129:Busca todos estados no Enpoint**/
    findAll() : Observable<EstadoDTO[]>  {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}