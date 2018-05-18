import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],

  /**Aula:129: Registrando os serviços nos providers na signup.module.ts  **/
  providers: [
    /**Aula 129**/
    CidadeService,
    EstadoService
    /************/

  ]
  
})
export class SignupPageModule {}
