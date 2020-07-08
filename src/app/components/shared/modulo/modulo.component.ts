import { Component, OnInit, Output, EventEmitter
 } from '@angular/core';
import { ModuloService } from './modulo.service';
import { Modulo } from './modulo';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  usuario = localStorage.getItem('user');
  public modselec: Modulo
  public modulo : String ;
  constructor(modulo: ModuloService ,private _route: Router , private menu: MenuComponent ) {
    modulo.getmod('T1',this.usuario).subscribe( (e: any) => {
      this.modselec =e;
    },(error)=>{
  });
  this.modulo=localStorage.getItem('modulo');
   };
   
   actualizamodulo(modulo: any){
    localStorage.setItem('modulo',modulo.target.value);
    this.modulo=modulo.target.value;
    this.menu.obtinenMenu();
    this._route.navigate(['/home']);
   }
   valida_select(modulo: any){
     console.log(modulo.target.value);
   }

  ngOnInit() {
  }

}
