import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  
  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    /**Aula 133: Passando o ProdutoService para ser usado**/
    public produtoService: ProdutoService) {
  }

      /**Aula 133: Carrega os produtos automaticamente**/
  ionViewDidLoad() {
    console.log('Carregou a ProdutosPage');
      /**Aula 133: Recebe o id da categoria 
       * que veio do this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});  **/
    let categoria_id = this.navParams.get('categoria_id');
          /**Busca os produtos de uma determinada categoria**/
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {

          /**Preenche a lista de  items : ProdutoDTO[] na produtos.html
           * Obs: Tem que especificar que só quer o que está no ['content'] da resposta **/
        this.items = response['content'];
      },
      error => {});
  }

    
}
