import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Produtos } from 'src/app/model/produto.model';

import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { BancoService } from 'src/app/servico/banco.service';
import { UtilityService } from 'src/app/servico/utility.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
img='https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_960_720.jpg';

  armario: Produtos[] = [];
    constructor(
    private http: HttpClient,

    private loadCtrl: LoadingController,
    //Alerta
    private alertCtrl: AlertController,

    private banco: BancoService,

    private utilidades: UtilityService,

    private actionSheet: ActionSheetController
) {}

  ngOnInit(){
    //this.http.get<Produtos[]>('http://localhost:3000/produtos').subscribe(caixa => this.armario = caixa);
    this.banco.getProdutos().subscribe(results => this.armario = results);
    this.utilidades.carregando("Aguarde", 2000);
  }

  //Deletar 
  deletar(id: number){
    try{
      this.banco.delProdutos(id);
    }catch(err){
      console.log(err);
    }finally{
      this.utilidades.toastando("Item Excluido", "bottom", 2000, "danger");     
    }  
}
  //Método do Carregando (load)

 async carregando(message: string, duration: number) {
  const load = this.loadCtrl.create({
    message,
    duration
  });

  (await load).present();
 }

 //Metodo do Alertando
 async alertando(){
  const alert = this.alertCtrl.create({
    mode:'ios',
    header:'Cadastro de Produtos',
   
    inputs: [
      {
        name: 'item',
        type: 'text',
        placeholder: 'Produto',
      },
      {
        name: 'qtd',
        type: 'text',
        placeholder: 'Quantidade'
      },
    ],

    buttons:[
      {
        text: 'cancelar',
        role: 'cancel',
        handler: () => {
          this.utilidades.toastando("Cancelado", "middle", 2000, "secondy");
        }, 
      },

      {
        text: 'Cadastrar',
        handler: (form) => {
          let item = {
            produto: form.item,
            quant: form.qtd,

            //Vai ser a variavel de controle do  ngIf
            status: false
          }
          try{
            this.banco.postProduto(item);
          }catch(err){
            console.log(err);
          }finally{
            this.utilidades.toastando("Item Excluido", "bottom", 2000, "sucess");
          }
        }
      }
    ],
  });
    
    (await alert).present();
 }

  //Metodo do actionsheet
  async actionMetod(){
    const action = this.actionSheet.create({
      mode: 'ios',
      header: 'Selecione uma Opção',
      buttons: [
        {
          text: 'Marcar',
           
          handler: () => {
            this.utilidades.toastando('Marcando', "middle", 2000, "primary");
          },
        },
          {
            text: 'Desmarcar',
            handler: () => {
              this.utilidades.toastando('Desmarcando o encontro', "middle", 2000, "secondary");
            },
            
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.utilidades.toastando('Cancelando o encontro', "middle", 2000, "secondary");
          }
        }
      
    ]
    }); (await action).present();

 

}

}


