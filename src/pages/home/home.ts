import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

 /** Quando estiver fora da aplicação o menu está desabilitado
  */
  ionViewWillEnter() {
  this.menu.swipeEnable(false);
  }
   
  /** Quando estiver logado na aplicação o menu fica habilitado
  */
  ionViewDidLeave() {
  this.menu.swipeEnable(true);
  }

  /**
   * Metodo que é chamado na home.html:  OBS push=cria o icone pra voltar pra home
   *                                         setRoot=não cria o icone, só leva pra pagina  
  */
  login() {
        this.navCtrl.setRoot('CategoriasPage');
        
  }

}
