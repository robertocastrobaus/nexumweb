import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario";
import { SelecusuarioService } from "./selecusuario.service";
import { Selecusuario } from "./selecusuario";
import { Router } from "@angular/router";
import { UsuarioPeSelect } from './usuariopeselect';
import Swal from 'sweetalert2';

export interface UserData {
  id: number;
  usuario: string;
  nombres: string;
  estado: string;
}

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "usuario",
    'nombres',/**/ "estado" /*,'fechaCrea','usuarioCrea','fechaMod','usuarioMod'*/,
    "accion"
  ];
  display='none';
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  usuarselec
  : Selecusuario[];
  usuarioPe: Usuario = new Usuario();
  titulo_usuario : String = 'Mantenimiento de Usuarios';
  private rol = localStorage.getItem('rol');
  private usuario  = localStorage.getItem('user');
  public bloquea: Boolean= false;
  public moduloUsr = localStorage.getItem('modulo');
  constructor(
   // private router: Router,
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private selecUsuarioService: SelecusuarioService,
    private _route: Router
   
    
  ) {

    // let usuarselec: Usuario[];
    // usuarselec=this.selecUsuarioService.getUsuario();
    //console.log(usuarselec);
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(usuarios);
    if (this.moduloUsr!='PES'){
      Swal.fire({
        icon: 'error',
        title: 'Accesos Denegados',
        text: 'La ruta no pertenece al módulo, favor verificar',
        // footer: '<a href>Why do I have this issue?</a>'
      });
      this._route.navigate(['/home']);
    }

    if (this.rol == '1' ){
      Swal.fire({
        icon: 'error',
        title: 'ACCESOS',
        text: 'Accesos denegados',
        // footer: '<a href>Why do I have this issue?</a>'
      });
      this._route.navigate(['/home']);
    }

    if (this.rol == '2' ){
      this.bloquea=true;
    }
    
    
    this.usuarioService.getUsuario().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });

  }

  ngOnInit() {
    //console.log('3');
    /*this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
   // const dialogRef = this.dialog.open(DialogContentExampleDialog);

   /* dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.selecUsuarioService.getUsuario().subscribe(data => {
        this.usuarselec = data;
      });
    });*/
  
  }

  openselec() {
    this.selecUsuarioService.getUsuario().subscribe(data => {
      this.usuarselec = data;
    });
  }

  guardaUsuario() {
    this.usuarioPe.estado = "A";
    this.usuarioPe.usuarioCrea = this.usuario;
    this.usuarioPe.noCia='T1';
    this.usuarioService.create(this.usuarioPe).subscribe(
      Response => {
        if (Response == null) {
          this.usuarioService.getUsuario().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          this.selecUsuarioService.getUsuario().subscribe(data => {
            this.usuarselec = null;
            this.usuarselec = data;
          });
          this.usuarioPe.usuario=null;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Registrado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          
        }
      } // 
    );
  }
  editar(id){
    this.usuarioService.actualizaEstado(id, this.usuario).subscribe(
      Response=>{
          this.usuarioService.getUsuario().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          this.selecUsuarioService.getUsuario().subscribe(data => {
            this.usuarselec = null;
            this.usuarselec = data;
          });
          this.usuarioPe.usuario=null;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario actualizdo con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }
    )
  }
}
/*
@Component({
  selector: "usuario.component.dialog",
  templateUrl: "usuario.component.dialog.html"
})
export class DialogContentExampleDialog {}*/
