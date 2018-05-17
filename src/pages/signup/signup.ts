import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**Página que controla a 'signup.html' **/
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /**Método chamado quando o usuário clicar em no botão "Criar Conta"**/
  signupUser()  {
    console.log('Enviou o Formulário');
  }

}
