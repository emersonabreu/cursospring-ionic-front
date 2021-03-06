import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   
  /** Pra fazer o bind com os campos input name="email" e input name="senha" da home.html
  */
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth:AuthService) {

  }
  
  /** Quando o Usuário entrar na aplicação se ele tiver um token, 
   * gera um novo a partir do atual e manda ele pra categorias.html**/
  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});  
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
    console.log(this.creds);
    //Imprime o que a resposta
    this.auth.authenticate(this.creds)
    .subscribe(response => {
    this.auth.successfulLogin(response.headers.get('Authorization'));

   this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});   
  }

  /**Método pro usuário se cadastrar leva para a página de SignupPage=signup.html**/
  signup() {
    console.log("Passou em signup()");
    this.navCtrl.push('SignupPage');
  }


}
