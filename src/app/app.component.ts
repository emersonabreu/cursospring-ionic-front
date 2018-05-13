import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


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
                       public splashScreen: SplashScreen) 
    {
    this.initializeApp();

    /**
     *Todas as paginas que queremos que sejam acrescentadas no menu devemos acrescentar aqui
     * **/
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Profile', component: 'ProfilePage' }

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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
