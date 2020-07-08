import { Component, OnInit , ViewChild } from '@angular/core';
import { IndicadoresService } from '../indicadores/indicadores.service';
import { UsuarioPeSelect } from '../usuarios/usuariopeselect';
import {Indicadores} from '../indicadores/indicadores';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EvaluacionService } from './evaluacion.service';
import { Parametros } from './parametrosEvaluacion';
import { EvaluacionParam } from './evaluacionParam';
import Swal from 'sweetalert2';
import { TableUtil } from "./archivo";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import 'chart.js';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Evaluacion } from './evaluacion';
import { DataEvaluacion } from './dataevaluacion';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

export interface Meses {
  value: string;
  viewValue: string;
}

export interface indiceData{
  id : number;
  id_usuario : number;
  id_indicador : number;
  mes : number;
  anio : number;
  meta : number;
  real  : number;
  estado  : string;
  peso : number;
  cumplimiento: number;
  pesoReal: number;
  indicadorPe: string;
  factor: number;
}

export interface Anios {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ["./evaluacion.component.css"]
})



export class EvaluacionComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "indicadorPe",
  //  "factor",
  //  "mes",
  //  "anio",
    "meta",
    "peso",
    "real",
    "cumplimiento",
    "pesoReal",
    "accion",
    "id_usuario",
    "id_indicador"
  ];

  public nombresSelect : String = null;
  usuarselecPe: UsuarioPeSelect[];
  dataSource: MatTableDataSource<indiceData>;
  pIdUsuario: number;
  parametros : Parametros = new Parametros();
  evParam : EvaluacionParam = new EvaluacionParam();
  titulo ="";
  bloquea : boolean  = true;
  cumplimiento : number = 0;
  bandera : boolean = false;
  dataEvaluacion: DataEvaluacion[];
  titulo_evaluacion : String = "Evaluación de Colaboradores"
  rol = localStorage.getItem('rol');
  private id : number = parseInt(localStorage.getItem('codigo'));
  private user = localStorage.getItem('user');
  private idUsuario : number = null ;
  public miarray: number[] = [1,2,3,4,5,6,7,8,9];
  public evaluacionForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private indicadores : IndicadoresService, private evaluaciones: EvaluacionService
    ,private _route: Router) {
      this.evaluacionForm = new FormGroup({
        nombresSelect1: new FormControl(),
      })
    if (this.rol == null){
      Swal.fire({
        icon: 'error',
        title: 'ACCESOS',
        text: 'Accesos denegados',
      });
     this._route.navigate(['/home']);
    }
    this.idUsuario = -1;
    if (this.rol == '1'){
      this.idUsuario = this.id;
      this.bloquea=true;
    }else{
      this.bloquea=false;
    }

    this.indicadores.getUsuario(this.idUsuario).subscribe(data => {
      this.usuarselecPe=data;
    });
   }
   
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   mes: Meses[] = [
    {value: '1', viewValue: 'Enero'},
    {value: '2', viewValue: 'Febrero'},
    {value: '3', viewValue: 'Marzo'},
    {value: '4', viewValue: 'Abril'},
    {value: '5', viewValue: 'Mayo'},
    {value: '6', viewValue: 'Junio'},
    {value: '7', viewValue: 'Julio'},
    {value: '8', viewValue: 'Agosto'},
    {value: '9', viewValue: 'Septiembre'},
    {value: '10', viewValue: 'Octubre'},
    {value: '11', viewValue: 'Noviembre'},
    {value: '22', viewValue: 'Diciembre'}
  ];

  anio: Anios[] = [
    //{value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'}/*,
    {value: '2021', viewValue: '2021'},
    {value: '2022', viewValue: '2022'},
    {value: '2023', viewValue: '2023'},
    {value: '2024', viewValue: '2024'},
    {value: '2025', viewValue: '2025'},
    {value: '2026', viewValue: '2026'},
    {value: '2027', viewValue: '2027'},
    {value: '2028', viewValue: '2028'},
    {value: '2029', viewValue: '2029'},
    {value: '2030', viewValue: '2030'}*/
  ];

  ngOnInit() {
   // this.nombresSelect=
  }

  public llenarDatos(data : Evaluacion[]){
    var dataEvaluacion = [];
    for (let i = data.length - 1; i >= 0; i--) { 
      dataEvaluacion.push({
        id : data[i].id,
        id_usuario : data[i].id_usuario,
        id_indicador :data[i].id_indicador,
        mes : data[i].mes,
        anio : data[i].anio,
        meta : data[i].meta,
        real  :data[i].real,
        estado  : data[i].estado,
        peso : data[i].peso,
        cumplimiento: data[i].cumplimiento,
        pesoReal:data[i].pesoReal,
        indicadorPe: data[i].indicadorPe.nombre,
        factor : data[i].indicadorPe.factor
      });
      }
      this.dataEvaluacion=dataEvaluacion;
  };
  
  getEvaluacion(){
   
    this.evParam.noCia = 'T1'
    if (this.evParam.idUsuario == null || this.evParam.mes == null || this.evParam.anio == null ){
      Swal.fire({
        icon: 'error',
        title: 'Parametros',
        text: 'Favor ingresar los parámetros.',
        // footer: '<a href>Why do I have this issue?</a>'
      });
    } else{
      this.evParam.rol = this.rol;
      this.evParam.usuario = this.user;
      this.evaluaciones.getEvaluacionService(this.evParam).subscribe(data=>{
      
      if (data != null){
        this.llenarDatos(data);
        this.dataSource = new MatTableDataSource(this.dataEvaluacion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

       // console.log(data);
        this.cumplimiento=0;
        for (let i = data.length - 1; i >= 0; i--) { //
         // console.log('LO QUE CONTIENE EL FOR '+ i +' ->' + data[i].peso +' ' +data[i].pesoReal);
          this.cumplimiento = this.cumplimiento + data[i].pesoReal;
        }
        this.cumplimiento =parseFloat(this.cumplimiento.toFixed(2));

        if (this.rol == '2' ){
          this.bandera = false;
        }else{
          this.evaluaciones.getCountPeriodo(this.evParam.noCia,this.evParam.mes, this.evParam.anio ).subscribe(count=>{
            this.bandera = false;
              if (count == 1){
                this.bandera = true;
              }          
            });
        }
        
        

        
      }
    
    })

    }

    
  }

  actualizaModal(id, meta, peso,real, indicador,id_usuario){
    this.evParam.id= id;
    this.evParam.meta=meta;
    this.evParam.peso=peso;
    this.evParam.real=real;
    this.titulo = indicador;
    this.pIdUsuario = id_usuario;
  }
  
  colorPeriodo(){
    if (!this.bandera){
      return '#ff0000';
    }else{
      return '#000103';
    }
  }
  colorfondo(cumplimiento){

    if (cumplimiento < 79.99){
      return '#ff0000';
    }
    if (cumplimiento >= 80 && cumplimiento <= 99.99 ){
      return '#F3FF33';
    } 
    
    if (cumplimiento == 100 ){
      return '#67FB52';
    } 

    if (cumplimiento > 100.01 ){
      return '#061986';
    } 

  }

  colortexto(cumplimiento){

    
    if (cumplimiento >= 80 && cumplimiento <= 99.99 ){
      return '#000103';
    } 
    return '#FFFFFF';

  }

  exportTable(){
    let nombre: string= "roberto";
    this.evaluaciones.obtUsr(this.evParam.idUsuario).subscribe(response =>{
      nombre = String(response.nombres);
      console.log(nombre)
      TableUtil.exportToExcel("ExampleTable",nombre);
    });
   
    
  }

  ActualizarEv() {
    //  this.visualiza='D';
    
    if(this.pIdUsuario != this.evParam.idUsuario){
      Swal.fire({
        icon: 'error',
        title: 'Parametros',
        text: 'El registro no pertenece al usuario consultado, favor realizar nuevamente la consulta del usuario.',
        // footer: '<a href>Why do I have this issue?</a>'
      });
      return;
    }
   
      this.evParam.usuario= this.user;
      this.evaluaciones.actualizarEv(this.evParam).subscribe(
        Response => {
        
          this.evaluaciones.getEvaluacionService(this.evParam).subscribe(data=>{
            this.llenarDatos(data);
            this.dataSource = new MatTableDataSource(this.dataEvaluacion);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cumplimiento=0;
            for (let i = data.length - 1; i >= 0; i--) { //
              // console.log('LO QUE CONTIENE EL FOR '+ i +' ->' + data[i].peso +' ' +data[i].pesoReal);
               this.cumplimiento = this.cumplimiento + data[i].pesoReal;
             }
             this.cumplimiento =parseFloat(this.cumplimiento.toFixed(2));
             console.log(this.cumplimiento.toFixed(2));
            

          })
                  
        } // 
      );
    }

    // graficos
    public barChartOptions: ChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{ticks: {
        min: 0,
        max: 120,
        stepSize: 10
      },
    }] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
        
      }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public llenaInfoData(ind, titulo){
      let colores : Label[]=[];
      let contador : number =0;
      this.evParam.idIndicador=ind;
      this.titulo = titulo;
      for (let i = 0; i < this.miarray.length; i++) {
        this.miarray[i]=null;
      }

      contador = this.barChartLabels.length;
      for (let j = 0; j < contador; j++) {
        this.barChartLabels.shift();
      }


      this.evaluaciones.grafico(this.evParam).subscribe(data=>{

        if (data != null){
          
          for (let i = data.length - 1; i >= 0; i--) { //
           // console.log('LO QUE CONTIENE EL FOR '+ i +' ->' + data[i].peso +' ' +data[i].pesoReal);
           
           colores[i] = this.colorfondo(data[i].cumplimiento);
           
           this.miarray[i]=data[i].cumplimiento; 
           
           if (data[i].mes==1){
            this.barChartLabels[i]='Enero';
           };
           if (data[i].mes==2){
            this.barChartLabels[i]='Febrero';
           };
           if (data[i].mes==3){
            this.barChartLabels[i]='Marzo';
           };
           if (data[i].mes==4){
            this.barChartLabels[i]='Abril';
           };
           if (data[i].mes==5){
            this.barChartLabels[i]='Mayo';
           };
           if (data[i].mes==6){
            this.barChartLabels[i]='Junio';
           };
           if (data[i].mes==7){
            this.barChartLabels[i]='Julio';
           };
           if (data[i].mes==8){
            this.barChartLabels[i]='Agosto';
           };
           if (data[i].mes==9){
            this.barChartLabels[i]='Sept.';
           };
           if (data[i].mes==10){
            this.barChartLabels[i]='Oct.';
           };
           if (data[i].mes==11){
            this.barChartLabels[i]='Nov.';
           };
           if (data[i].mes==12){
            this.barChartLabels[i]='Dic.';
           };

          }
          
          this.barChartData = [{data: this.miarray,hoverBackgroundColor:'#BBF5C8' , backgroundColor: colores, label: 'Evaluaciones' }]; 
        }
      
      })
     
    }

    public barChartData: ChartDataSets[] = [
      { data: this.miarray, label: 'Evaluaciones' },
     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'sssss' }
    ];

    // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  /*public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }*/


}
