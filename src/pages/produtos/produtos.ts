import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

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
  
  //items : ProdutoDTO[];
  /**Aula 151: Vai concatenar com as paginas**/
  items : ProdutoDTO[] = [];
  page : number = 0;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    /**Aula 133: Passando o ProdutoService para ser usado**/
    public produtoService: ProdutoService,

    /**Aula 139: Usando o LoadingController**/
    public loadingCtrl: LoadingController) {
  }

      /**Aula 133: Carrega os produtos automaticamente**/
  ionViewDidLoad() {
    console.log('Carregou a ProdutosPage');
      /**Aula 133: Recebe o id da categoria 
       * que veio do this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});  **/
    let categoria_id = this.navParams.get('categoria_id');
          /**Aula 149: Mostra o Loading na tela enquanto carrega 
           * os produtos**/
        let loader = this.presentLoading();
    //this.produtoService.findByCategoria(categoria_id)
    /**Aula 151: Passa os parametros para a buscar**/
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {

          /**Preenche a lista de  items : ProdutoDTO[] na produtos.html
           * Obs: Tem que especificar que só quer o que está no ['content'] da resposta **/
        //this.items = response['content'];
        
        /**Aula 151: a lista esta vazia**/
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        /**Aula 151: a lista passa a ter 10**/
        let end = this.items.length - 1
        /**Aula 149: Para o Loading depois que carregar os produtos**/
        loader.dismiss();
        //this.loadImageUrls();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
      error => {});
  }

          /**Aula 134: Carregando a url dos produtos se ela existir
           * Se não existir coloca a padrão "item.imageUrl || 'assets/imgs/prod.jpg**/
    //loadImageUrls() {
      /**Aula 151:Percorre a lista atualizando sempre o tamanho**/
   loadImageUrls(start: number, end: number) {
      console.log('Atualizando a url da imagem');

                 /**Percorre a lista de produtos pegando cada produto **/
    //for (var i=0; i<this.items.length; i++) {
      for (var i=start; i<=end; i++) {
      let item = this.items[i];
                      /**Chama o metodo busca a url do produto caso exista**/
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
                        /**Atualiza a url da imagem item.imageUrl carregando a  imagem do Produto 1 **/
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;

        },
        error => {});
    }
                /**Percorre todos os produtos**/

  }  


  /**Aula 136: Chama a pagina ProdutoDetailPage 
   * e passa o id do produto pro seu controlador **/
  showDetail(produto_id : string) {
      /**Aula 149: Mostra o Loading***/
    let loader = this.presentLoading();
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
      /**Aula 149: Desfaz o Loading quando carregar a pagina***/
    loader.dismiss();

  }

    /**Aula 149: Metodo que cria e carrega o loading**/
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
  
      /**Aula 150: Metodo que cria o refresher em alguma requisição **/
  doRefresh(refresher) {
  /**Aula 151: Sempre 0 a lista quando chamar o doRefresh(refresher)**/
    this.page = 0;
    this.items = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
    /**Aula 151: Chama o infinitScroll acrescenta 1 na pagina**/
  doInfinite(infiniteScroll) {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}

    

