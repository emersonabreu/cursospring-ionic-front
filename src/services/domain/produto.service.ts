import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

/*Aula 133: Services que acessa os EndPoints da API em  Produtos */
@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

    /*Aula 133: Metodo que busca os produtos de determinada categoria*/
  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }
}