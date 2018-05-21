import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

/**Aula 137: Classe que cria o carrinho com os produtos**/
@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    /**Aula 137: Cria um carrinho com uma lista de iems vazio
     * e armazena na Storage**/
    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    /**Aula 137: Pega o carrinho ou cria um se tiver vazio**/
    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }
    
    /**Aula 137: Pega o carrinho com a sua lista de items**/
    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
            /**Aula 137: Verifica se já existe esse produto nessa lista**/
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        /**Aula 137: Se não existir, então adiciona ele na lista**/
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
                /**Aula 137: Se inseriu, então atualiza o carrinho no Storage adicionando mais um**/
        this.storage.setCart(cart);
        return cart;
    }
}