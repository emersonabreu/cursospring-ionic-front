import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/image-util.service';





/**
 * Modulo Principal da Aplicação MyApp
 */
@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,AuthInterceptorProvider,
    ErrorInterceptorProvider,AuthService,StorageService,ClienteService,
  /*Aula 133: Adicionando a ProdutoService para ser Usada na Aplicação*/
    ProdutoService,

   /**Aula 137: Disponibiliza o CartService para a aplicação**/
    CartService,
       /**Aula 153: Disponibiliza o ImageUtilService para a aplicação**/
    ImageUtilService
  ]
})
/** O export garante que essa Classe AppModule pode ser enxergado por outro lugar 
 */
export class AppModule {}
