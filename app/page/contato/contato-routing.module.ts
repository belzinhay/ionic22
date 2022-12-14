import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContatoPage } from "./contato.page";

//Variavel que contem o caminho para o componente(Page) que será carregado nessa rota filha
const routes: Routes = [
    {path: '', component: ContatoPage}
];

@NgModule({
    //RouterModule possui as ferramentas para a criaçao de rotas
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContatoPageRoutingModule{}