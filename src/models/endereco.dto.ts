import { CidadeDTO } from "./cidade.dto";

/**Aula 142: Classe modelo para o Endereço**/
export interface EnderecoDTO {
    id : string;
    logradouro : string;
    numero : string;
    complemento : string;
    bairro : string;
    cep : string;
    /***Aula 142: Endereco tem 1 cidade***/
    cidade : CidadeDTO;
}