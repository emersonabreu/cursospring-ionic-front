import { RefDTO } from "./ref.dto";

/**Aula 144: ItemPedido tem a quantidade e o prroduto **/
export interface ItemPedidoDTO {
    quantidade: number;
    produto: RefDTO;
}