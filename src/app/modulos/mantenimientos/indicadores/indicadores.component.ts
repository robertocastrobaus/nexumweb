import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IndicadoresService } from './indicadores.service';
import { Indicadores } from './indicadores';
import { IndicadoresJson } from './indicadoresJson';
import {Usuario} from '../usuarios/usuario'
import { UsuarioPeSelect } from '../usuarios/usuariopeselect';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataIndicadores } from './dataindicadores';

export interface IndiceData {
  id: number;
  usuarioPe:string;
  codigo: string;
  nombre: string;
  formula :string;
  medida :string;
  factor: number;
  tipo :string;
  estado: string;
  idUsuario: number;
  nbrTipo: String;
  
}




export interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ["./indicadores.component.css"]
})
export class IndicadoresComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "usuarioPe",
    "codigo",
    'nombre',
    "formula",
    "medida",
    "factor",
    "tipo",
    "nbrTipo", 
    "estado" ,
    "accion",
    "idUsuario"
  ];
  private ind: Indicadores = new Indicadores();
  ind1: IndicadoresJson = new IndicadoresJson();
  title='Ingresar';
  nombresT='';
  private rol = localStorage.getItem('rol');
  private usuario = localStorage.getItem('user');
  private id : number = parseInt(localStorage.getItem('codigo'));
  private idUsuario : number = null ;
  titulo_indicadores = 'Mantenimiento de Indicadores';
 // private visualiza='D';
 public bloquea: Boolean= false;
  dataSource: MatTableDataSource<IndiceData>;
  usuarselecPe: UsuarioPeSelect[];
  array: [number, string];
  dataUsuario : DataIndicadores[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private indicadores : IndicadoresService,private _route: Router ) { 
    this.idUsuario = this.id;
    if (this.rol == '1'){
      Swal.fire({
        icon: 'error',
        title: 'ACCESOS',
        text: 'Accesos denegados',
      });
     this._route.navigate(['/home']);
    }else{
      this.idUsuario = -1;
    }

    if (this.rol == '2' ){
      this.bloquea=true;
    }

    this.indicadores.getIndicador().subscribe(data => {
      this.llenarDatos(data);
      this.dataSource = new MatTableDataSource(this.dataUsuario);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  
    this.indicadores.getUsuario(this.idUsuario).subscribe(data => {
      this.usuarselecPe=data;
     
    });
  
  }

  public llenarDatos(data : Indicadores[]){
    var dataUsuario = [];
    for (let i = data.length - 1; i >= 0; i--) { 
      dataUsuario.push({
        id: data[i].id,
        usuarioPe:data[i].usuarioPe.nombres,
        codigo: data[i].codigo,
        nombre: data[i].nombre,
        formula: data[i].formula,
        medida :data[i].medida,
        factor: data[i].factor,
        tipo :data[i].tipo,
        estado: data[i].estado,
        idUsuario: data[i].idUsuario,
        nbrTipo:  data[i].nbrTipo
      });
      }
      this.dataUsuario=dataUsuario;
  };

  ngOnInit() {
  }
  applyFilter(filterValue: any) {
    
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actualizaModalTitle(){
    this.title='Ingresar Indicador';
    //this.visualiza='D';
    this.ind1.codigo=null;
    this.ind1.estado=null;
    this.ind1.factor=null;
    this.ind1.fechaCrea=null;
    this.ind1.formula=null;
    this.ind1.id=null;
    this.ind1.idUsuario=null;
    this.ind1.medida=null;
    this.ind1.nombre=null;
    this.ind1.tipo=null;
    this.nombresT=null;
    this.ind1.nbrTipo=null;
  }

  cars: Car[] = [
    {value: 'Estrategico', viewValue: 'Estratégico'},
    {value: 'Proyecto', viewValue: 'Proyecto'}
  ];

  actualizaModal(id,codigo,nombre,formula,medida,factor,tipo,idUsuario,nombresPe,nbrtipo){
    this.title='Actualiza Indicador';
   // this.visualiza='D';
    this.ind1.id=id;
    this.ind1.codigo=codigo;
    this.ind1.factor=factor;
    this.ind1.formula=formula;
   // this.ind1.idUsuario=idUsuario;
    this.ind1.medida=medida;
    this.ind1.nombre=nombre;
    this.ind1.tipo=tipo;
    this.ind1.idUsuario=idUsuario; 
    this.ind1.estado='A';
    this.nombresT=nombresPe;
    this.ind1.nbrTipo =nbrtipo;
    //alert(this.ind1.idUsuario);
  }

  visualizaModal(id,codigo,nombre,formula,medida,factor,tipo,idUsuario,nombresPe){
   // this.title='Actualiza Indicador';
   // this.visualiza='D';
    this.ind1.id=id;
    this.ind1.codigo=codigo;
    this.ind1.factor=factor;
    this.ind1.formula=formula;
   // this.ind1.idUsuario=idUsuario;
    this.ind1.medida=medida;
    this.ind1.nombre=nombre;
    this.ind1.tipo=tipo;
    this.ind1.idUsuario=idUsuario; 
    //this.ind1.estado='A';
    this.nombresT=nombresPe;
    //alert(this.ind1.idUsuario);
  }

  
  guardaIndicador() {
    //this.visualiza='D';
    this.ind1.estado = "A";
    this.ind1.noCia='T1';
    this.ind1.usuarioCrea = this.usuario;

    if(this.ind1.codigo == null || 
       this.ind1.factor == null || 
       this.ind1.formula == null ||
       this.ind1.medida== null ||
       this.ind1.nombre == null ||
       this.ind1.tipo == null ||
       this.ind1.usuarioCrea == null){
        Swal.fire({
          icon: 'error',
          title: 'Campos',
          text: 'Debe ingresar todos los datos del indicador',
          // footer: '<a href>Why do I have this issue?</a>'
        })

    }else{
      if(this.ind1.tipo == 'Proyecto' && this.ind1.nbrTipo == null ){
        Swal.fire({
          icon: 'error',
          title: 'Campos',
          text: 'Debe ingresar el nombre del proyecto',
          // footer: '<a href>Why do I have this issue?</a>'
        })

      }else{
        if (this.ind1.tipo != 'Proyecto'){
          this.ind1.nbrTipo = null;
        }
        this.indicadores.create(this.ind1).subscribe(
          Response => {
            if (Response == null) {
              this.indicadores.getIndicador().subscribe(data => {
                this.llenarDatos(data);
                this.dataSource = new MatTableDataSource(this.dataUsuario);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Registro Creado Correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })

              });
                        
            }else{
              alert('error');
              alert(Response);
            }
          } // 
        );
        this.actualizaModalTitle();
      }
    }
  }

  ActualizarIndicador() {
  //  this.visualiza='D';
    this.ind1.usuarioMod = this.usuario;
    if(this.ind1.codigo == null || 
      this.ind1.factor == null || 
      this.ind1.formula == null ||
      this.ind1.medida== null ||
      this.ind1.nombre == null ||
      this.ind1.tipo == null ||
      this.ind1.usuarioMod == null){
       Swal.fire({
         icon: 'error',
         title: 'Campos',
         text: 'Debe ingresar todos los datos del indicador',
         // footer: '<a href>Why do I have this issue?</a>'
       })

   }else{
    if(this.ind1.tipo == 'Proyecto' && this.ind1.nbrTipo == null ){
      Swal.fire({
        icon: 'error',
        title: 'Campos',
        text: 'Debe ingresar el nombre del proyecto',
        // footer: '<a href>Why do I have this issue?</a>'
      })

    }else{
      if (this.ind1.tipo != 'Proyecto'){
        this.ind1.nbrTipo = null;
      }
      this.indicadores.actualizarInd(this.ind1).subscribe(
        Response => {
            this.indicadores.getIndicador().subscribe(data => {
              this.llenarDatos(data);
              this.dataSource = new MatTableDataSource(this.dataUsuario);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Actualizado Correctamente',
                showConfirmButton: false,
                timer: 1500
              })

            });
                  
        } // 
      );
      }
   } 
  }

  ActualizaEstadoI(id, estado){
     // this.visualiza='D';
     let mensaje :String;
     
     if (estado =='A'){
      mensaje = 'inactivar'
     }else{
      mensaje = 'activar'
     }

     Swal.fire({
      title: "Estas Seguro de" +" "+mensaje+" "+ "el Indicador?",
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3c8dbc',
      cancelButtonColor: '#dd4b39',
      confirmButtonText: 'Si',
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.value) {
        this.indicadores.actualizaEstadoI(id,this.usuario).subscribe(
          Response=>{
              this.indicadores.getIndicador().subscribe(data => {
              this.llenarDatos(data);
              this.dataSource = new MatTableDataSource(this.dataUsuario);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
    
            }
              )
          }
        )
        Swal.fire(
          'Registro Actualizado Correctamente',
          "",
          'success'
        )
      }
    })
  }

}