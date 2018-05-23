import { EstadoDTO } from "./estado.dto";

/**Classe usada para a busca das cidades**/
export interface CidadeDTO {
    id : string;
    nome : string;

    /***Aula 142: Cidade tem 1 estado***/
    estado? : EstadoDTO;
}