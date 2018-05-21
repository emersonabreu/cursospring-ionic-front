import { ProdutoDTO } from "./produto.dto";

/***Aula 137: Model dos Itens da compra no carrinho***/
export interface CartItem {
    quantidade: number,
    produto: ProdutoDTO
}