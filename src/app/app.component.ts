import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //Vista asociada
  styleUrls: ['./app.component.css'],  //Estilos asociados
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title:string;
  public identity;


  constructor(
      private _userService : UserService
  ){
      this.title  = 'Ruben Diaz WEBAPP ';
  }

  ngOnInit(){
      this.identity = this._userService.getIdentity(); // Objeto del usuario identificado
      console.log(this.identity);
  }

  ngDoCheck(){ // Cada vez que se hace un cambio(refresco dinamico de la web)
      this.identity = this._userService.getIdentity();
  }

}
