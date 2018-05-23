import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

/**Aula 144: O Pedido tem o id do cliente, o id do endereço,O Pagamento
 * e tem uma lista de endereços**/
export interface PedidoDTO {
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
}

/**Aula 144: 
 * {
    "cliente" : {"id" : 1},
    
    "enderecoDeEntrega" : {"id" : 1},

    "pagamento" : {"numeroDeParcelas" : 10,
                  "@type": "pagamentoComCartao"},

    "itens" : [ { "quantidade" : 2,"produto" : {"id" : 3} }, 
                { "quantidade" : 1, "produto" : {"id" : 1} }
              ]
}
 * 
 * 
 * **/
