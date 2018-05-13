import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../services/domain/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
    /**Faz o Bind na profile.html {{ cliente }} **/
  //email: string;
   cliente: ClienteDTO;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService:ClienteService) {
  }

  /** Carrega o email quando abrir a profile.html**/
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    /** Se tiver o usuario e o seu email, busca o cliente pelo seu email**/
    /**Se inscreve pra pegar a resposta que veio com id; nome; email**/
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente=response;
        this.getImageIfExists();
      },
        error => {});  
  }
 }

 getImageIfExists() {
  this.clienteService.getImageFromBucket(this.cliente.id)
  .subscribe(response => {
    this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.png`;
  },
  error => {});
}

}
