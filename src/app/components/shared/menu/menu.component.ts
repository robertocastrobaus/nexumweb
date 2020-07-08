import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
//import { Modulo } from './modulo';
import { ModuloService } from '../modulo/modulo.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  nombre = localStorage.getItem('nombre'); 
  usuario = localStorage.getItem('user');
  moduloUsr = localStorage.getItem('modulo'); 
  rol = localStorage.getItem('rol');
  public menuItems: any[];
 // public modselec: Modulo[]; 
  constructor(private menu : MenuService, private  modulo: ModuloService) {
    if (this.moduloUsr == null|| this.moduloUsr == ''){
     
      modulo.getmod('T1',this.usuario).subscribe( (e: any) => {
         localStorage.setItem('modulo',e[0].modulo);
         this.moduloUsr=e[0].modulo; 
         this.obtinenMenu();
      },(error)=>{
      })
    }else{
      this.obtinenMenu();
    };
   
   }

   public obtinenMenu(){
     this.moduloUsr = localStorage.getItem('modulo');
     this.menu.getmenu('T1',this.usuario, this.moduloUsr).subscribe(data=>{
      this.menuItems =data;
      if (data.length > 0){
        localStorage.setItem('rol',data[0].rol);    
      }
    
    })
   }

  ngOnInit() {
  }

}
