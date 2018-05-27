import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  
    /**Aula 146:Variaveis pra armazenar o 
     * pedido e seus item, o cliente e seu endereço**/
  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  /**Aula 148: Usada para salvar o codigo do pedido 
   * extraido do header location**/
  codpedido: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    /**Aula 147: Usado para salvar o pedido**/
    public pedidoService: PedidoService) {
  /**Aula 146: o pedido vem como parametro da payment.ts**/
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    /**Aula 146: pega os items do carrinho**/
    this.cartItems = this.cartService.getCart().items;
          /**Aula 146: como o pedido só tem o id do cliente
           * busca todos os dados desse cliente no banco**/
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
          /**Aula 146: Como vem todos os dados relacionados,
           * faz o cast pra clienteDTO pra pegar só os dados  do cliente**/
        this.cliente = response as ClienteDTO;
            /**Aula 146: pego o id do endereco de entrega e encontra o endereço na lista**/
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }
    /**Aula 146: percorre a lista, e retorna o endereço do id passado**/
  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }
 
  /**Aula 146: Retorna o total**/
  total() : number {
    return this.cartService.total();
  } 
  /**Aula 147: Volta pra pagina de Carrinho**/
  back() {
    this.navCtrl.setRoot('CartPage');
  }

    /**Aula 147: Salva o pedido e depois limpa o carrinho**/
    checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        /**Aula 147: Cria um carrinho vazio**/
        
        /**Aula 148: limpa o carrinho**/
        this.cartService.createOrClearCart();
        /**Aula 148: Armazena o codigo do pedido
         * pra controlar a mensagem a mostrar na tela**/
        this.codpedido = this.extractId(response.headers.get('location'));
      
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

          /**Aula 148: Volta pra pagina de categorias**/
  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }
 
        /**Aula 148: Extrai o id do location no header**/
  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}