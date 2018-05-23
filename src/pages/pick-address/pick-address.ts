import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

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
    /**Aula 144:Variavel que armazena o pedido**/
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService,
    public clienteService:ClienteService,
        /**Aula 144:carrrinho**/
    public cartService: CartService) {
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
          
        /**Aula 144: Pega o carrinho**/
        let cart = this.cartService.getCart();

     this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            /**Aula 144: Obs: tem que converter a resposta
             *  pois queremos só o id do produto e a modelo do produto tem
             * id : string; nome : string; preco : number;imageUrl? : string;
             * 
             * **/
         itens : cart.items.map(x => { return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }

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
  
/**Aula 144: O nextPage pega o endereço escolhido  e seta no pedido o id do endereco**/
nextPage(item: EnderecoDTO) {
  this.pedido.enderecoDeEntrega = {id: item.id};
  console.log(this.pedido); 
}
}
    
