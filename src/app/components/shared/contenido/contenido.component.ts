import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html'
})
export class ContenidoComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }
  
  ngOnInit() {
  }

}
