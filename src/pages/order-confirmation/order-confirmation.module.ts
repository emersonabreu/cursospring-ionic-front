import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationPage } from './order-confirmation';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
  ],
   /**Aula 147: PedidoService só vai ser instanciado 
    * quando chamar a order-confirmation.ts OBS: Poderia ser global**/
  providers: [
    PedidoService
  ]
})
export class OrderConfirmationPageModule {}
