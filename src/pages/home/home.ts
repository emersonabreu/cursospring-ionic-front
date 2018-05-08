import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * Metodo que é chamado na home.html:  OBS push=cria o icone pra voltar pra home
   *                                         setRoot=não cria o icone, só leva pra pagina  
  */
  login() {
        this.navCtrl.setRoot('CategoriasPage');
        
  }

}
