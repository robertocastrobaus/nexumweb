import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {Md5} from "md5-typescript";
import { Param } from './param';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  hide: boolean = true;
  private param: Param =  new Param();
  
  constructor(private _authService: AuthService, private _route: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })

    console.log(Md5.init('DANNA05122017'));

   }
   values = '';
   onKey(event: any) { // without type info
    this.values=event.target.value.replace(" ","").replace("  ","");
  }

   onLogin(){
    //localStorage.setItem('user',this.loginForm.get('username').value) ;
      if(this.loginForm.valid){
        this.param.noCia = 'T1';
        this.param.usuario=this.loginForm.get('username').value;
        this.param.contrasenia = this.loginForm.get('password').value;
        this._authService.login(this.param).
        subscribe( (e: any) => {
          
          if(e.status == 200){
          //  localStorage.setItem('token',e.token)
            localStorage.setItem('user',e.usuario); 
            localStorage.setItem('nombre',e.nombre);
            localStorage.setItem('codigo',e.id);
            this._route.navigate(['/home']);
          }
        },(error)=>{

        })
      }
   }

  ngOnInit() {
  }

}
