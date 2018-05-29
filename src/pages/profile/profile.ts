import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
    /**Faz o Bind na profile.html {{ cliente }} **/
  //email: string;
   cliente: ClienteDTO;
   
   /**Aula 152: Armazena a foto tirada**/
   picture: string;
   /**Aula 152: Controla se a camera esta ligada e desabilita o botão**/
  cameraOn: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService:ClienteService,
    /**Aula 152: Usa a camera**/ 
    public camera: Camera) {
  }

  /** Carrega o email quando abrir a profile.html:
   * OBS: Pode ocorrer um erro 403 pois requer permissão**/
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    /** Se tiver o usuario e o seu email, busca o cliente pelo seu email**/
    /**Se inscreve pra pegar a resposta que veio com id; nome; email**/
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
      /**Aula 143:casting, corrigindo a tipagem pra ClienteDTO**/
        this.cliente=response as ClienteDTO;
        this.getImageIfExists();
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

   /** Pega a Imagem pelo id do cliente**/
 getImageIfExists() {
  this.clienteService.getImageFromBucket(this.cliente.id)
     /** Se inscreve pra pegar a resposta e faz o bind da imagem cliente.imageUrl pelo id**/
  .subscribe(response => {
    this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.png`;
  },
  error => {});
}

   /**Aula 152: Metodo que tira a foto**/
getCameraPicture() {
     /**Aula 152: Deixa o botão ativo**/
  this.cameraOn = true;
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
   this.camera.getPicture(options).then((imageData) => {
   this.picture = 'data:image/png;base64,' + imageData;
    /**Aula 152: Tirou a foto desativa o botão**/
   this.cameraOn = false;
  }, (err) => {
  });
}
 
}
