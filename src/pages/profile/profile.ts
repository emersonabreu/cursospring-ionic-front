import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
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
  /**Aula 167: Atualizando a imagem de perfil**/ 
  profileImage;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService:ClienteService,
    /**Aula 152: Usa a camera**/ 
    public camera: Camera,
    /**Aula 167: Atualizando a imagem de perfil**/ 
    public sanitizer: DomSanitizer) {
    
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  /** Carrega o email quando abrir a profile.html:
   * OBS: Pode ocorrer um erro 403 pois requer permissão**/
  ionViewDidLoad() {
    this.loadData();
  }

loadData() {
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
    this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    this.blobToDataURL(response).then(dataUrl => {
      let str : string = dataUrl as string;
      this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
    });
    
  },
  error => { 
    this.profileImage = 'assets/imgs/avatar-blank.png';
  });
}

 // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
 blobToDataURL(blob) {
  return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
  })
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
       /**Aula 166: Se cancelar a galeria ou a camera 
        * habilita os botões de Camera e Galeria**/
    this.cameraOn = false;
  });
}

    /**Aula 161: Buscando imagem na galeria**/
getGalleryPicture() {

  this.cameraOn = true;

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   this.picture = 'data:image/png;base64,' + imageData;
   this.cameraOn = false;
  }, (err) => {
    this.cameraOn = false;
  });
}

   /**Aula 153: Metodo que Envia a foto**/
sendPicture() {
  this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
      },
      error => {
      });
}

cancel() {
  this.picture = null;
}
}
