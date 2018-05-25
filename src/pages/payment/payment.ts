import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**Aula 145: Controlador da Pagina de 
 * escolha do tipo de pagamento payment.html**/

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  /**Aula 145: Objeto que armazena o pedido 
   * que veio como parametro da pick-address.ts**/
  pedido: PedidoDTO;
  /**Variavel estatica pra preencher a combo com o numero de parcelas**/
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      /**Aula 145:Armazena o pedido que veio**/
    this.pedido = this.navParams.get('pedido');
   /**Aula 145:Cria o formulario do pagamento 
    * com o numero de parcelas padrão/1, 
    * e o tipo de pagamento padrão pagamentoComCartao  **/
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }
  
  /**Aula 145:Mostra o formulário na tela**/
  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);

  }
}