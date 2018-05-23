import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {
  /**Aula 143:Variavel que armazena os dados do cliente logado**/
  items: EnderecoDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService,
    public clienteService:ClienteService) {
  }

  ionViewDidLoad() {
    /**Aula 143: Se o usuario for o logado, então busca os seus dados pelo seu email**/
    console.log('ionViewDidLoad PickAddressPage');
    let localUser = this.storage.getLocalUser();
    /**Se inscreve pra pegar a resposta que veio**/
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
      /**Aula 143: armazena os enderecos**/
        this.items=response ['enderecos'];
        
      },
        /**Se houver algum erro faz algo**/
      error => {
        /**Se for o 403, redireciona para a HomePage**/
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });

  /**Se houve erro no let localUser = this.storage.getLocalUser(); vai pra HomePage**/
    } else {
    this.navCtrl.setRoot('HomePage');
  }
}
}
    
