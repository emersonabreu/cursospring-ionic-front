import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

/*Aula 133: Services que acessa os EndPoints da API em  Produtos */
@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

    /*Aula 133: Metodo que busca os produtos de determinada categoria*/
  findByCategoria(categoria_id : string,page : number = 0, linesPerPage : number = 24) {
        /*Aula 151: Incluindo o InfinitScroll*/
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }
  
    /*Aula 134: Buscando a imagem pequena do produto */
  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/produtos/prod${id}-small.png`
    return this.http.get(url, {responseType : 'blob'});
  } 

  /*Aula 136: Buscando os dados do produto pelo seu id */
  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

    /*Aula 136: Busca a imagem do produto */
  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/produtos/prod${id}-small.png`
    return this.http.get(url, {responseType : 'blob'});
  }  

}