import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
      /*--Aula 135: Service pra buscar os detalhes do produto*/
    public produtoService: ProdutoService,

    public cartService: CartService) {
  }

  /*--Aula 136: Carrega automaticamente ao entrar na produto-detail.html */
  ionViewDidLoad() {
      /*--Aula 136: Recebe o id do produto 
      que veio do controlador produtos.ts*/
    let produto_id = this.navParams.get('produto_id');
      /*--Aula 136: Busca os dados do produto pelo seu id*/
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
              /*Aula 136: E busca a sua imagem*/
        this.getImageUrlIfExists();
      },
      error => {});
  }
  
    /***Aula 136: Busca a imagem do produto se ela existir ***/
  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
            /***Aula 136: Caso a resposta for verdadeira 
             * joga a imagem na item.imageUrl da produto-detail.html ***/
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/prod${this.item.id}-small.png`;
      },
      error => {});
  }

    /*--Aula 137: Adiciona o item que veio da produto-detail.html ao carrinho */
  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
}