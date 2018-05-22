import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';


/**
 * Controlador principal app.html 
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**Pagina que é chamada no inicio da aplicação**/
  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public auth: AuthService) 
    {
    this.initializeApp();

    /**
     *Todas as paginas que queremos que sejam acrescentadas no menu devemos acrescentar aqui
     * **/
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Carrinho', component: 'CartPage'},
      { title: 'Logout', component: '' }
    


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /** O open page com a tipagem {title:string, component:string}
   * Permite que os <button (click)="openPage(p)"> sejam manipulados**/
  openPage(page : {title:string, component:string}) {

    switch (page.title) {

      /**Se clicou no botão Logout limpa o Storage e manda pra HomePage**/
      case 'Logout':
      this.auth.logout();
      this.nav.setRoot('HomePage');
      break;
      
      /**Senão, manda pra padrão que ele clicar**/
      default:
      this.nav.setRoot(page.component);
    }
 }


}
