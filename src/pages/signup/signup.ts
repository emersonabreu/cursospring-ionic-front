import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';

/**Página que controla a 'signup.html' **/
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  formGroup: FormGroup;
 /****** Aula 129: Criando as listas*****/
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
/***************************************/

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,

    /****** Aula 129 Usando os services*****/
    public cidadeService: CidadeService,
    public estadoService: EstadoService) 
    /**************************************/

    {

      /**Cria um Formulário na 'signup.html'**/
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]      
      });
  }

    /******************Chamado ao carregar a pagina****************************/
    /**Aula 129: Metodo que preenche a combobox do estado e atualiza a cidade**/
  ionViewDidLoad() {
      /**Busca os estados pelo id**/
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;

        /**Deixa a combo selecionada na primeira posição**/
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }
      /******************************************************************************/

  
  /**Aula 129: Metodo que atualiza a combobox da cidade**/
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
      /**Busca as cidades pelo id do estado**/
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;

        /***Deixa a combo vazia enquanto não for selecionada***/
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  /**Método chamado quando o usuário clicar em no botão "Criar Conta"**/
  signupUser()  {
    console.log('Enviou o Formulário');
  }

}
