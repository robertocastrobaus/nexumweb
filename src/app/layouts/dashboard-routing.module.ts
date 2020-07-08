import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from '../modulos/mantenimientos/usuarios/usuarios.component';
import { IndicadoresComponent } from '../modulos/mantenimientos/indicadores/indicadores.component';
import { EvaluacionComponent } from '../modulos/mantenimientos/evaluacion/evaluacion.component';
import { HomeComponent } from '../modulos/mantenimientos/home/home.component';
import { PeriodoComponent } from '../modulos/mantenimientos/periodo/periodo.component';


const routes: Routes = [
{path:'', component:HomeComponent},
{path:'home', component:HomeComponent},  
{path:'usuarios', component: UsuariosComponent},
{path:'indicadores', component: IndicadoresComponent},
{path:'evaluacion', component: EvaluacionComponent},
{path:'periodos', component: PeriodoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {  }
