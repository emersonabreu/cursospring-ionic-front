import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    /**Construtor que traz a StorageService pra pegar o header com o  storage.getLocalUser**/
    constructor(public storage: StorageService) {

    }
     
/**
 * Intercepta o erro 
 */
    intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        
        console.log("Passou no interceptor"); 
        
        return next.handle(req)
         /**Se houve um erro então mostra ele**/
        .catch((error, caught) => {
                
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            //Verifica se é um JSON
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:"+errorObj.status);
            console.log(errorObj);

        /**Faz o tratamento de erros especificos**/
            switch(errorObj.status) {
        /**Erro 403 para as requisições protegidas**/
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(errorObj);
        }) as any;

    }
     
     /**Se for o Erro 403 limpa o Storage Localuser**/
    handle403() {
    this.storage.setLocalUser(null);
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};