import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsuariosComponent } from '../modulos/mantenimientos/usuarios/usuarios.component';
import { IndicadoresComponent } from '../modulos/mantenimientos/indicadores/indicadores.component';
import { EvaluacionComponent } from '../modulos/mantenimientos/evaluacion/evaluacion.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../modulos/mantenimientos/home/home.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
import { PeriodoComponent} from '../modulos/mantenimientos/periodo/periodo.component';
//import { MenuComponent } from '../components/shared/menu/menu.component';

const components  = [
  UsuariosComponent,
  IndicadoresComponent,
  EvaluacionComponent,
  HomeComponent,
  PeriodoComponent ,
 // MenuComponent
]

@NgModule({
  exports:[...components],
  declarations: [...components],
  imports: [
    ChartsModule,
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
