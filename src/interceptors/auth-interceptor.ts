import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

/**
 * Classe que Intercepta a Requisição e verifica se precisa inserir cabeçalho header+token
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**Pega o usuarrio + o token**/
        let localUser = this.storage.getLocalUser();
         /**Verifica se a requisição req.url é igual a http://localhost:8080 **/
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

               /** Se pegou o o storage, e a requisição for pra http://localhost:8080
                * Então clona o Header+token e propaga na requisição **/
        if (localUser && requestToAPI) {

            console.log("Passou no auth-interceptor mandou o token"); 
            console.log(localUser); 
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);

        } else {
                    /**Senão, manda a requisição sem inserir nada**/
            console.log("Passou no auth-interceptor sem token"); 
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};