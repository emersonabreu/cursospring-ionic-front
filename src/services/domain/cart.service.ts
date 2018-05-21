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
    /**Aula 138: Pega o carrinho**/
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        /**Aula 138: Encontra a posição do produto que veio**/
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
          /**Aula 138: Se encontro, então faz a 1 remoção nessa posição**/
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        /**Aula 138: Atualiza o carrinho**/
        this.storage.setCart(cart);
        return cart;
    }
     
    /**Aula 138: Encontra a posição se os produtos forem iguais e acresenta 1 unidade
     * na variavel quantidade**/
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

     /**Aula 138: Encontra a posição se os produtos forem iguais e diminui 1 unidade
     * na variavel quantidade**/
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

                /**Aula 138: Vai decrementando até chegar a 1
                 * chegou em 0, remove o produto do carrinho**/
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        /**Aula 138: Atualiza o carrinho**/
        this.storage.setCart(cart);
        return cart;
    }

    /**Aula 138: Percorre o carrinho para somar o total**/
    total() : number {
        let cart = this.getCart();
        let sum = 0;

        /**Aula 138: Multiplica o preço pela quantidade cada produto do carrinho**/
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}