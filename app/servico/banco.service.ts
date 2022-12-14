import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  readonly API = 'http://localhost:3000/produtos/';

  HttpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) { }

  //Capiturar 
  getProdutos(){
    return this.http.get<Produtos[]>(this.API);
  }
  //Metodo para cadastar 
  postProduto(Produto: any){
    return this.http.post(this.API, JSON.stringify(Produto), this.HttpOptions).subscribe();
  }

  //Metodo de apagar
  delProdutos(id: number){
    return this.http.delete(this.API + id).subscribe();
  }
}
