import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  /**Aula 137: Cria uma lista de CartItem[]**/
  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,

    /**Aula 137: Sevice para Cart e para Produto**/
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }
  
  /**Aula 137: Ao abrir a página ele carrega o carrinho**/
  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    /**Aula 137: Se tiver algum item, ele mostra o junto com a imagem**/
    this.loadImageUrls();
  }

  /**Aula 137: Percorre cada item da lista, e coloca a imagem dele na
   *  item.produto.imageUrl da cart.html**/
  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/prod${item.produto.id}-small.png`;
        },
        error => {});
    }
  }  
}
