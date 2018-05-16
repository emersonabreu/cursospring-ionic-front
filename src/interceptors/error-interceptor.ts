import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    /**Construtor que traz a StorageService pra pegar o header com o  storage.getLocalUser**/
    constructor(public storage: StorageService,public alertCtrl: AlertController) {

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
             /**Erro 401: falha de autenticação**/
                case 401:
                this.handle401();
                break;

        /**Erro 403 falha de requisição protegida**/
                case 403:
                this.handle403();
                break;
                
        /**Senão for nem o 401 nem o 403 cai no default**/
                default:
                this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;

    }
     
     /**Se for o Erro 403 limpa o Storage Localuser**/
    handle403() {
    this.storage.setLocalUser(null);
    }

    /**Cria um Alert na tela pra tratar o Erro 401: falha de autenticação**/
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
         /**o false diz que tem que apertar no botão "ok" pra sair **/
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }


    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();        
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};