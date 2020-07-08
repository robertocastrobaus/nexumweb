import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Periodos } from "./periodos";
import { PeriodosService } from "./periodos.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

export interface PeriodoData {
  id: number;
  noCia: string;
  mes: number;
  anio: number;
  estado: string;
}

interface mes {
  id: number;
  descrip: string;
}

interface anio {
  id: number;
  descrip: string;
}

@Component({
  selector: "app-periodo",
  templateUrl: "./periodo.component.html",
  styleUrls: ["./periodo.component.css"],
})
export class PeriodoComponent implements OnInit {
  displayedColumns: string[] = ["id", "mes", "anio", "estado", "accion"];
  dataSource: MatTableDataSource<PeriodoData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public bloquea: Boolean = false;
  public bloqueaG: Boolean = false;
  titulo_periodo = "Mantenimiento de Periodo";
  private rol = localStorage.getItem("rol");
  private usuario = localStorage.getItem("user");
  private id: number = parseInt(localStorage.getItem("codigo"));
  private abierto: Boolean = false;
  public mes1: number;
  public descMes: string;
  public miarray: mes[];
  public periodo: Periodos = new Periodos();

  constructor(
    private dialog: MatDialog,
    private periodosS: PeriodosService,
    private _route: Router
  ) {
    if (this.rol == "1") {
      Swal.fire({
        icon: "error",
        title: "ACCESOS",
        text: "Accesos denegados",
      });
      this._route.navigate(["/home"]);
    }

    this.periodosS.getPeriodos().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.abierto = false;
      this.mes1 = data.length + 1;
      if (this.mes1 == 13) {
        this.mes1 = 1;
      }
      this.descMes = this.mesDesc(this.mes1);
      this.miarray = [{ id: this.mes1, descrip: this.descMes }];
      this.bloqueaG = false;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].estado == "A") {
          this.bloqueaG = true;
          this.abierto = true;
        }
      }
    });
    if (this.rol == "2") {
      this.bloquea = true;
    }
  }

  ngOnInit() {}

  actualizaEstado(id, estado) {
    if (estado == "C") {
      if (this.abierto) {
        Swal.fire({
          icon: "error",
          title: "Periodos",
          text: "No pueden estar 2 periodos Abierto ",
        });
        return;
      }
    }

    // this.visualiza='D';
    let mensaje: String;

    if (estado == "A") {
      mensaje = "cerrar";
    } else {
      mensaje = "activar";
    }

    Swal.fire({
      title: "Estas Seguro de" + " " + mensaje + " " + "el periodo?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3c8dbc",
      cancelButtonColor: "#dd4b39",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.periodosS
          .actualizaEstado(id, this.usuario)
          .subscribe((Response) => {
            this.periodosS.getPeriodos().subscribe((data) => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.abierto = false;
              this.bloqueaG = false;
              for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].estado == "A") {
                  this.bloqueaG = true;
                  this.abierto = true;
                }
              }
            });
          });
        Swal.fire("Registro Actualizado Correctamente", "", "success");
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //meses: this.miarray[];

  anios: anio[] = [{ id: 2020, descrip: "2020" }];

  mesDesc(mes) {
    if (mes == 1) {
      return "Enero";
    }
    if (mes == 2) {
      return "Febrero";
    }
    if (mes == 3) {
      return "Marzo";
    }
    if (mes == 4) {
      return "Abril";
    }
    if (mes == 5) {
      return "Mayo";
    }
    if (mes == 6) {
      return "Junio";
    }
    if (mes == 7) {
      return "Julio";
    }
    if (mes == 8) {
      return "Agosto";
    }
    if (mes == 9) {
      return "Septiembre";
    }
    if (mes == 10) {
      return "Octubre";
    }
    if (mes == 11) {
      return "Noviembre";
    }
    if (mes == 12) {
      return "Diciembre";
    }
  }

  guardaPeriodo() {
    if (this.abierto) {
      Swal.fire({
        icon: "error",
        title: "Periodos",
        text: "No pueden estar 2 periodos Abierto ",
      });
    }
  }

  guardaReg() {
    this.periodo.noCia = "T1";
    this.periodo.usuarioCrea = this.usuario;
    this.periodo.estado = "A";

    if (this.periodo.anio == null || this.periodo.mes == null) {
      Swal.fire({
        icon: "error",
        title: "Campos",
        text: "Debe ingresar todos los datos del indicador",
        // footer: '<a href>Why do I have this issue?</a>'
      });
    } else {
      this.periodosS.guardaPeriodo(this.periodo).subscribe(
        (e: any) => {
          alert(e.status);
          if (e.status == "200") {
            this.periodosS.getPeriodos().subscribe((data) => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.abierto = false;
              this.bloqueaG = false;
              for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].estado == "A") {
                  this.bloqueaG = true;
                  this.abierto = true;
                }
              }

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registro Creado Correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
            });
          } else {
            alert("error");
            alert(Response);
          }
        } //
      );
    }
  }
}
